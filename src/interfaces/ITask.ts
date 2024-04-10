export interface ITask {
    id: string;
    status: boolean;
    important: boolean;
    category: string;
    text: string;
    tags: string[];
    date: string;
}