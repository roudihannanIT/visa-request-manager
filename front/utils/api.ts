import axios from 'axios';
import { Application, Document, ApiResponse } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// add interceptor to requests 
api.interceptors.request.use(
  (config) => {
    console.log(`📡 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// add interceptor to responses
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Backend server is not running! Make sure to start the backend on port 5000');
    } else if (error.response) {
      console.error('❌ API Error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// ==================== Applications API ====================

export const getApplications = async (page = 1, limit = 10) => {
  const response = await api.get<ApiResponse<Application[]>>(`/applications?page=${page}&limit=${limit}`);
  return response.data;
};

export const getApplication = async (id: string) => {
  const response = await api.get<ApiResponse<Application>>(`/applications/${id}`);
  return response.data;
};

export const createApplication = async (data: Partial<Application>) => {
  const response = await api.post<ApiResponse<Application>>('/applications', data);
  return response.data;
};

export const updateApplication = async (id: string, data: Partial<Application>) => {
  const response = await api.put<ApiResponse<Application>>(`/applications/${id}, data`);
  return response.data;
};

export const deleteApplication = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/applications/${id}`);
  return response.data;
};

// ==================== Documents API ====================

export const getDocuments = async (applicationId: string) => {
  const response = await api.get<ApiResponse<Document[]>>(`/applications/${applicationId}/documents`);
  return response.data;
};

export const addDocument = async (applicationId: string, data: Partial<Document>) => {
  const response = await api.post<ApiResponse<Document>>(`/applications/${applicationId}/documents`, data);
  return response.data;
};

export const updateDocument = async (id: string, data: Partial<Document>) => {
  const response = await api.put<ApiResponse<Document>>(`/documents/${id}`, data);
  return response.data;
};

export const deleteDocument = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/documents/${id}`);
  return response.data;
};

export const toggleDocumentStatus = async (id: string) => {
  const response = await api.patch<ApiResponse<Document>>(`/documents/${id}/toggle`);
  return response.data;
};

export default api;