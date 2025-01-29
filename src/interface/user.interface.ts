import { Thesis } from "./thesis.interface";

export interface User {
    id: number;
    email: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    ext_name: string;
    role: string;
    tel_number: string;
    standing: string
    position: string;
    thesis: Thesis[]
    adviser: Adviser
    student: Student
}

export interface Student {
    id: number;
    user: User;
    user_id: number;
    thesis: Thesis[];
}

export interface Adviser {
    id: number;
    user: User;
    user_id: number;
    thesis: Thesis[];
}
