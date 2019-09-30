export interface ITimesheetLine {
    date: Date;
    time: number;
    description: string;
    task: string;
    project: string;
}

export interface IProjectData {
    name: string;
    isArchived: boolean;
}