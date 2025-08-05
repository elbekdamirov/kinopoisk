import { Injectable } from "@nestjs/common";
import { link } from "fs";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  async sendActivationEmail(email: string, link: string) {
    const activateUrl = `${process.env.API_URL}/api/auth/verify/${link}`;

    await this.transporter.sendMail({
      from: `"KinoPoisk" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Email verification",
      html: `<p>Click the link below to activate your account:</p>
             <a href="${activateUrl}">ACTIVATE</a>`,
    });
  }

  async sendActivationEmailToAdmin(email: string, link: string) {
    const activateUrl = `${process.env.API_URL}/api/admin/auth/verify/${link}`;

    await this.transporter.sendMail({
      from: `"KinoPoisk" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Email verification",
      html: `<p>Click the link below to activate your admin account:</p>
             <a href="${activateUrl}">ACTIVATE</a>`,
    });
  }

  async sendApprovalLinkToSuperadmin(
    payload: {
      id: number;
      email: string;
      full_name: string;
      role: string;
    },
    approvalLink: string
  ) {
    const link = `${process.env.API_URL}/api/admin/auth/approve/${approvalLink}`;

    await this.transporter.sendMail({
      to: process.env.SUPERADMIN_EMAIL,
      subject: "Yangi adminni tasdiqlash",
      html: `
      <h2>Yangi admin ro'yxatdan o'tdi</h2>
      <p><strong>Ismi:</strong> ${payload.full_name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Role:</strong> ${payload.role}</p>
      <p>Uni tasdiqlash uchun quyidagi linkni bosing:</p>
      <a href="${link}">Tasdiqlash</a>
    `,
    });
  }
}
