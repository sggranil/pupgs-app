import { User, Adviser, Student } from "./user.interface";

export interface Thesis {
    id: number;
    thesis_title: string;
    student: Student;
    student_id: number;
    adviser?: Adviser;
    adviser_id?: number;
    is_confirmed?: boolean;
    user: User;
    user_id: number;
    proposals: Proposal[];
    panelists: Adviser[];
    defense_date?: string;
    defense_time?: string
  }
  
  export interface Proposal {
    id: number;
    thesis: Thesis;
    thesis_id: number;
    file_url: string;
    uploaded_at: string;
  }
  
  export interface EnrolledSubject {
    id: number;
    student: Student;
    student_id: number;
    subject_name: string;
    or_number: string;
    attachment: string;
    is_confirmed?: boolean | null;
    enrolled_at: string;
  }
  