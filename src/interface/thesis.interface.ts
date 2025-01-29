import { User, Adviser, Student } from "./user.interface";

export interface Thesis {
    id: number;
    thesis_title: string;
    student: Student;
    student_id: number;
    adviser: Adviser;
    adviser_id: number;
    is_confirmed: boolean;
    user: User;
    user_id: number;
}