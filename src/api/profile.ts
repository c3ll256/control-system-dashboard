import { AxiosResponse } from 'axios';
import http from '@/lib/http';

export interface Profile {
  id?: string;
  name: string;
  projectId: string;
  buckVersion: string;
  createdAt?: string;
  updatedAt?: string;
}

export default class ProfileAPIRequest {
  public static async list(): Promise<AxiosResponse> {
    return http.get('/api/profiles');
  }

  public static async listByProjectId(projectId: string): Promise<AxiosResponse> {
    return http.get(`/api/profiles?projectId=${projectId}`);
  }

  public static async get(id: string): Promise<AxiosResponse> {
    return http.get(`/api/profiles/${id}`);
  }

  public static async create(body: Profile): Promise<AxiosResponse> {
    return http.post('/api/profiles', body);
  }

  public static async update(id: string, body: Profile): Promise<AxiosResponse> {
    return http.put(`/api/profiles/${id}`, body);
  }

  public static async delete(id: string): Promise<AxiosResponse> {
    return http.delete(`/api/profiles/${id}`);
  }
}
