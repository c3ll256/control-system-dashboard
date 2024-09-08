import { AxiosResponse } from 'axios';
import http from '@/lib/http';

export interface Project {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export default class ProjectAPIRequest {
  public static async list(): Promise<AxiosResponse> {
    return http.get('/api/projects');
  }

  public static async get(id: string): Promise<AxiosResponse> {
    return http.get(`/api/projects/${id}`);
  }

  public static async create(body: Project): Promise<AxiosResponse> {
    return http.post('/api/projects', body);
  }

  public static async update(id: string, body: Project): Promise<AxiosResponse> {
    return http.put(`/api/projects/${id}`, body);
  }

  public static async delete(id: string): Promise<AxiosResponse> {
    return http.delete(`/api/projects/${id}`);
  }
}
