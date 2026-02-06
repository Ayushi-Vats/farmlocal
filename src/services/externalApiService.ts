import axios from 'axios';
import axiosRetry from 'axios-retry';
import CircuitBreaker from 'opossum';

const circuitBreaker = new CircuitBreaker(async (url: string) => axios.get(url), {
  timeout: 3000,
  errorThresholdPercentage: 50
});

export class ExternalApiService {
  static async fetchSyncData(): Promise<any> {
    axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
    return circuitBreaker.fire('https://jsonplaceholder.typicode.com/posts/1');
  }

  static async registerWebhook(): Promise<void> {
    await axios.post('https://mock-api.com/register', { callbackUrl: '/webhooks/callback' });
  }
}