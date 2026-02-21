
export type VisaType = 'Blue Card' | 'Family Reunion' | 'Student Visa' | 'Job Seeker' | 'Tourist' | 'Other';

export type ApplicationStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export interface Application {
  _id: string;
  title: string;
  visaType: VisaType;
  status: ApplicationStatus;
  appointmentDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  _id: string;
  applicationId: string;
  name: string;
  isReady: boolean;
  notes?: string;
  deadline?: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  total?: number;
  page?: number;
  totalPages?: number;
}