export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export interface ResponsePayloadResult {
  status: number;
  data?: any;
  message?: string | null;
}