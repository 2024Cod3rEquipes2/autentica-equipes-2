import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Email, EmailService } from 'src/core/notificaiton';

@Injectable()
export class NodeMailEmailService implements EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'testsdevelop9@gmail.com',
        pass: 'fkcz qhgs uyoi ltqh',
      },
    });
  }
  async sendEmail(params: Email): Promise<void> {
    const mailOptions = {
      from: 'testsdevelop9@gmail.com',
      to: params.to,
      subject: params.subject,
      text: params.text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email: ', error);
      throw error;
    }
  }
}
