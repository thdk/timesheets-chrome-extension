import firebase from 'firebase/app';
import { IRegistration, IRegistrationData } from "../../interfaces";

export const convertRegistration = (reg: Partial<IRegistration> | "delete"): Partial<IRegistrationData> =>{
    if (reg === "delete") throw new Error("Deleting of registrations in not supported");

    const {date, ...rest} = reg;

    const stripTimeUTC = (date: Date) => {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    };

    const dateToInsert = date ? date : new Date();
    const now = new Date();
    const regData = {
        created: firebase.firestore.Timestamp.fromDate(now),
        modified: firebase.firestore.Timestamp.fromDate(now),
        date: firebase.firestore.Timestamp.fromDate(stripTimeUTC(dateToInsert)),
        ...rest
    };

    if (typeof regData.project === "undefined") delete regData.project;
    if (typeof regData.task === "undefined") delete regData.task;
    if (typeof regData.client === "undefined") delete regData.client;

    return regData;
}