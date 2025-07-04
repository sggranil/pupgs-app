import { EnrolledSubject, Thesis } from "./thesis.interface";

export interface User {
    id: number;
    email: string;
    password: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    ext_name?: string;
    prefix?: string;
    role: string;
    tel_number?: string;
    standing?: string;
    start_date?: string;
    pass_date?: string;
    position?: string;
    program?: string;
    department?: string;
    thesis: Thesis[];
    adviser?: Adviser;
    student?: Student;
    is_deleted?: boolean;
}

export interface Student {
    id: number;
    user: User;
    user_id: number;
    thesis: Thesis[];
    enrolled_subject: EnrolledSubject[];
}

export interface Adviser {
    id: number;
    user: User;
    user_id: number;
    thesis: Thesis[];
    panelists: Thesis[];
    secretary: Thesis;
}