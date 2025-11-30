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
  attachments: Attachment[];
  panelists: Adviser[];
  secretary?: Adviser;
  secretary_id?: number;
  defense_schedule?: Date;
  room?: Room;
  room_id?: number;
  thesis_receipts?: ThesisReceipt[];
  created_at: string;
  updated_at: Date;
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

export interface ThesisReceipt {
  id: number;
  student: Student;
  student_id: number;
  thesis_id: number | null;
  thesis?: Thesis[];
  receipt_name: string;
  or_number: string;
  attachment: string;
  status: string | null;
  message: string | null;
  created_at: Date;
  updated_at: Date;
}