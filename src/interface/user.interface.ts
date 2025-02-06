import { EnrolledSubject, Thesis } from "./thesis.interface";

export interface User {
    id: number;
    email: string;
    password: string;
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    ext_name?: string | null;
    role: string;
    tel_number?: string | null;
    standing?: string | null;
    position?: string | null;
    thesis: Thesis[];
    adviser?: Adviser | null;
    student?: Student | null;
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
}