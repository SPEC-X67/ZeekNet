import { OAuth2Client } from 'google-auth-library';
import { IGoogleTokenVerifier, IGoogleProfile } from '../../domain/interfaces/services';
import { env } from '../config/env';

export class GoogleAuthTokenVerifier implements IGoogleTokenVerifier {
  private client = new OAuth2Client(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
  );

  async verifyIdToken(idToken: string): Promise<IGoogleProfile> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new Error('Invalid Google token');
    }
    return {
      email: payload.email,
      emailVerified: Boolean(payload.email_verified),
      name: payload.name || '',
      picture: payload.picture || '',
    };
  }
}
