import firebase from 'firebase/app';
import 'firebase/auth';

import config from './config';
import { ITimesheetLine, IProjectData } from './interfaces';
import { Collection } from "firestorable";

firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
});

let projects:  Collection<IProjectData>;


const firestore = firebase.firestore();
firebase.auth().onAuthStateChanged(user => {
    console.log({ backgroundUser: user });

    if (user) {
        

        firestore.collection("projects").get().then(docs => {
            docs.docs.forEach(d => {
                console.log(d.id);
            });
        });
    }
});



//projects.getDocs();

function getProjectByName(name: string) {    

    return Array.from(projects.docs.values()).find(doc => !!doc.data && doc.data.name === name);
}

function saveTimesheetLine(line: ITimesheetLine) {
    const project = getProjectByName(line.project);
    if (!project) throw new Error(`No project found in firestore with name: ${line.project}`);

    console.log(project.id);
}

chrome.runtime.onMessage && chrome.runtime.onMessage.addListener(function (message) {
    console.log("Background received message: " + message);
    console.log({ message });
    if (message && message.type == 'newRegistration') {
        const newLine = message.line as ITimesheetLine;
        saveTimesheetLine(newLine);
    }

});