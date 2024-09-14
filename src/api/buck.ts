import { AxiosResponse } from 'axios';
import http from '@/lib/http';
import { ConfigKeyType } from '@/components/profile';

export default class BuckAPIRequest {
  public static async submitAction(body: Record<ConfigKeyType, string>): Promise<AxiosResponse> {
    return http.post('/api/devices/submitAction', body);
  }
}
