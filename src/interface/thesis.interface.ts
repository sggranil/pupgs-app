import { User, Adviser, Student } from "./user.interface";

export interface Thesis {
    id: number;
    thesis_title: string;
    student: Student;
    student_id: number;
    adviser?: Adviser | null;
    adviser_id?: number | null;
    is_confirmed?: boolean | null;
    user: User;
    user_id: number;
    proposals: Proposal[];
    panelists: Adviser[];
    defense_date?: string | null;
    defense_time?: string | null;
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
  