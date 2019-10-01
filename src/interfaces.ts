import firebase from 'firebase/app';

export interface ITimesheetLine {
    date: Date;
    time: number;
    description: string;
    task?: string;
    project: string;
}

export interface IProjectData {
    name: string;
    isArchived: boolean;
}

export interface ITaskData {
    name: string;
}

export interface IUserData {
    defaultTask?: string;
    defaultClient?: string;
}

export interface IRegistration {
    date: Date;
    description: string;
    project?: string;
    task?: string;
    client?: string;
    time?: number;
    userId: string;
}

export interface IRegistrationData {
    date: firebase.firestore.Timestamp;
    created: firebase.firestore.Timestamp;
    modified: firebase.firestore.Timestamp;
    description: string;
    project?: string;
    task?: string;
    client?: string;
    time?: number;
    userId: string;
}