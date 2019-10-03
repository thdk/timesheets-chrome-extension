import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import config from './config';
import { ITimesheetLine, IProjectData, ITaskData, IUserData, IRegistrationData, IRegistration } from './interfaces';
import { Collection, Doc } from "firestorable";
import { convertRegistration } from './core/registrations/serialization';
import { getIssueAsync } from './jira/api';

firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
});

const firestore = firebase.firestore();

const projectsCollection = new Collection<IProjectData>(firestore, () => firestore.collection("projects"), { realtime: true });
const tasksCollection = new Collection<ITaskData>(firestore, () => firestore.collection("tasks"));
const usersCollection = new Collection<IUserData>(firestore, () => firestore.collection("users"));
const registrationsCollection = new Collection<IRegistration, IRegistrationData>(
    firestore,
    () => firestore.collection("registrations"),
    {
        serialize: convertRegistration
    }
);

let userDoc: Doc<IUserData> | undefined;

firebase.auth().onAuthStateChanged(user => {
    sendMessage(user ? "User logged in" : "User logged out");

    if (user) {
        projectsCollection.getDocs();
        tasksCollection.getDocs();

        // Setting the query of a collection will also trigger getDocs() on that collection
        usersCollection.getAsync(user.uid, false).then(u => userDoc = u);
    }
});

function getProjectByName(name: string) {
    const project = Array.from(projectsCollection.docs.values()).find(doc => !!doc.data && doc.data.name === name);

    return project ? project.id : undefined
}

function getTaskByName(name: string) {
    const task = Array.from(tasksCollection.docs.values()).find(doc => !!doc.data && doc.data.name === name);

    return task ? task.id : undefined;
}

function saveTimesheetLine(line: ITimesheetLine) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const { description, time, date } = line;

            const project = getProjectByName(line.project);
            if (!project) {
                sendMessage(`No project found in firestore with name: ${line.project}`);
                return;
            }
        
            const task = line.task ? getTaskByName(line.task) : userDoc!.data!.defaultTask;
            if (!task && line.task) {
                sendMessage(`No task found in firestore with name: ${line.task}`);
                return;
            }
        
            const client = userDoc!.data!.defaultClient;
        
            const userId = userDoc!.id;
        
            sendMessage({ project, task, time, description, client, date });
        
            registrationsCollection.addAsync({
                project,
                task,
                time,
                description,
                client,
                date: new Date(date),
                userId,
            });
        } else {
          // User not logged in or has just logged out.
        }
      });

    
}

chrome.runtime.onMessage && chrome.runtime.onMessage.addListener(function (message) {
    sendMessage("Background received message: " + message);
    sendMessage({ message });
    if (message.type === 'newRegistration') {
        const newLine = message.line as ITimesheetLine;
        saveTimesheetLine(newLine);
    } else if (message.type === "request-fetch-jira-issue") {
        fetchJiraIssue(message.issueId);
    }
});

function fetchJiraIssue(id: string) {
    getIssueAsync(id).then(issue => {
        sendMessage({
            type: "fetch-jira-issue-success",
            issue,
        });
    });
}

function sendMessage(message: any) {
    console.log(JSON.stringify(message, undefined, "  "));
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    });
}