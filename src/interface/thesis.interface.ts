import { User, Adviser, Student } from "./user.interface";

export interface Thesis {
  id: number;
  thesis_title: string;
  student?: Student;
  student_id?: number;
  adviser?: Adviser;
  adviser_id?: number;
  defense_phase?: string;
  is_confirmed?: boolean;
  message?: string;
  user?: User;
  user_id?: number;
  proposals: Proposal[];
  panelists: Adviser[];
  secretary?: Adviser;
  secretary_id?: number;
  defense_date?: string;
  defense_time?: string;
  room?: Room;
  room_id?: number;
  created_at: string;
}

export interface Proposal {
  id: number;
  thesis: Thesis;
  thesis_id: number;
  file_url: string;
  uploaded_at: string;
}

export interface Room {
  id: number;
  name: string;
  location?: string;
  capacity?: number;
  thesis?: Thesis[];
}

export interface EnrolledSubject {
  id: number;
  student: Student;
  student_id: number;
  subject_name: string;
  or_number: string;
  attachment: string;
  is_confirmed?: boolean | null;
  message?: string;
  enrolled_at: string;
}
