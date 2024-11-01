import { AxiosResponse } from 'axios';
import http from '@/lib/http';

export default class BuckAPIRequest {
  public static async submitAction(body: Record<string, string[]>): Promise<AxiosResponse> {
    return http.post('/api/devices/submitAction', body);
  }

  public static async submitReset(): Promise<AxiosResponse> {
    return http.post('/api/devices/submitReset');
  }
}
