import { ThesisReceipt, Thesis } from "@/interface/thesis.interface";

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
    start_date?: string;
    pass_date?: string;
    standing?: string;
    program?: string;
    department?: string;
    position?: string;
    adviser?: Adviser;
    student?: Student;
    audit_log: AuditLog;
    is_archived?: boolean;
    notifications_received: Notification[];
    notifications_sent: Notification[];
    created_at: Date;
    updated_at: Date;
}

export interface Student {
    id: number;
    user: User;
    user_id: number;
    thesis: Thesis[];
    thesis_receipts: ThesisReceipt[];
}

export interface Adviser {
    id: number;
    user: User;
    user_id: number;
    advised_theses: Thesis[];
    panelists: Thesis[];
    secretary: Thesis[];
}

export interface Notification {
    id: number;
    type: string;
    read: boolean;
    recipient_id: number;
    recipient: User;
    sender_id?: number;
    sender?: User;
    title: string;
    message?: string;
    link?: string;
    created_at: Date;
    updated_at: Date;
}

export interface AuditLog {
    id: number;
    operation: string;
    message: string;
    table_name?: string;
    record_id?: number;
    old_data?: JSON;
    new_data?: JSON;
    changed_by?: User;
    user_id?: number
    device_type?: string;
    device_id?: string;
    ip_address?: string;
    timestamp: Date;
}

export interface UserData {
    id: number;
    role: string;
    email: string;
}
export interface UserContextType {
    user: UserData | null;
    isLoading: boolean;
}
