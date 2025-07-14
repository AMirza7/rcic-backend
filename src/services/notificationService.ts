// src/services/notificationService.ts
import nodemailer from 'nodemailer';
import Twilio from 'twilio';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export class NotificationService {
  private transporter: nodemailer.Transporter;
  private twilioClient?: Twilio.Twilio;
  private fromSmsNumber?: string;

  constructor() {
    // Email setup
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +(process.env.SMTP_PORT || 587),
      secure: !!process.env.SMTP_SECURE, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // SMS setup (Twilio), optional
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER) {
      this.twilioClient = Twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      this.fromSmsNumber = process.env.TWILIO_FROM_NUMBER;
    }
  }

  /** Send an email */
  async sendEmail(opts: EmailOptions) {
    const info = await this.transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    return info;
  }

  /** Send an SMS (if Twilio configured) */
  async sendSMS(to: string, body: string) {
    if (!this.twilioClient || !this.fromSmsNumber) {
      throw new Error('SMS provider not configured');
    }
    const msg = await this.twilioClient.messages.create({
      body,
      from: this.fromSmsNumber,
      to,
    });
    return msg;
  }
}
