import nodemailer from 'nodemailer';
import { injectable } from 'inversify';
import { MailerService } from '../../application/interfaces';
import { env } from '../config/env';

@injectable()
export class NodemailerService implements MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
  });

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: env.EMAIL_USER,
      to,
      subject,
      html, 
    });
  }
}
