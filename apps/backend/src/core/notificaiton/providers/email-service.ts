import { Email } from '../models/email';

export interface EmailService {
  sendEmail(params: Email): Promise<void>;
}
