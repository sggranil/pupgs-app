import { User, Adviser, Student } from "./user.interface";

export interface Thesis {
  id: number;
  thesis_title: string;
  student?: Student;
  student_id?: number;
  adviser?: Adviser;
  adviser_id?: number;
  defense_phase?: string;
  status: string | null;
  message?: string;
  user?: User;
  user_id?: number;
  attachments: Attachment[];
  panelists: Adviser[];
  secretary?: Adviser;
  secretary_id?: number;
  defense_date?: string;
  defense_time?: string;
  enrolled_subjects?: EnrolledSubject[];
  room?: Room;
  room_id?: number;
  created_at: string;
}

export interface Attachment {
  id: number;
  thesis: Thesis;
  thesis_id: number;
  file_type: string;
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
  status: string | null;
  message: string | null;
  thesis_id: number | null;
  thesis?: Thesis[];
  enrolled_at: Date;
}
