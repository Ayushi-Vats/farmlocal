import axios from 'axios';
import redis from '../utils/redis';

const TOKEN_KEY = 'oauth_token';

export class AuthService {
  static async getToken(): Promise<string> {
    const cached = await redis.get(TOKEN_KEY);

    if (cached) {
      return cached;
    }

    const response = await axios.post('https://mock-oauth.com/token', {
      grant_type: 'client_credentials',
      client_id: 'farm_id',
      client_secret: 'secret'
    });

    const token: string = response.data.access_token;

    await redis.setex(TOKEN_KEY, 3600, token);

    return token;
  }

  static async validateToken(token: string): Promise<boolean> {
    const serverToken = await this.getToken();
    return token === serverToken;
  }
}
