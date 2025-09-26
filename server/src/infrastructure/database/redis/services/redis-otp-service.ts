import { injectable } from 'inversify';
import { OtpService } from '../../../../application/interfaces';
import { redisClient } from '../connection/redis';

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

@injectable()
export class RedisOtpService implements OtpService {
  async generateOtp(email: string): Promise<string> {
    return this.generateAndStoreOtp(email);
  }

  async generateAndStoreOtp(
    identifier: string,
    ttlSeconds = 300,
  ): Promise<string> {

    const existingKey = `otp:${identifier}`;
    const existingOtp = await redisClient.get(existingKey);
    
    if (existingOtp) {

      const lastSentKey = `otp_last_sent:${identifier}`;
      const lastSent = await redisClient.get(lastSentKey);
      
      if (lastSent) {
        const timeDiff = Date.now() - parseInt(lastSent);
        if (timeDiff < 30000) { // 30 seconds cooldown
          throw new Error('Please wait before requesting another OTP');
        }
      }
    }

    const code = generateCode();
    const key = `otp:${identifier}`;
    const lastSentKey = `otp_last_sent:${identifier}`;
    
    await Promise.all([
      redisClient.set(key, code, { EX: ttlSeconds }),
      redisClient.set(lastSentKey, Date.now().toString(), { EX: 60 }),
    ]);
    
    return code;
  }

  async verifyOtp(identifier: string, code: string): Promise<boolean> {
    const key = `otp:${identifier}`;
    const stored = await redisClient.get(key);
    if (!stored) return false;
    const ok = stored === code;
    if (ok) {
      await redisClient.del(key);
    }
    return ok;
  }
}
