import { AxiosResponse } from 'axios';
import http from '@/lib/http';

export default class BuckAPIRequest {
  public static async submitAction(body: unknown): Promise<AxiosResponse> {
    return http.post('/api/common/submitAction', body);
  }
}
