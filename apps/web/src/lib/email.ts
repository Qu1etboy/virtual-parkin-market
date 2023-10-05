import nodemailer from "nodemailer";

type Payload = {
  to: string;
  subject: string;
  html: string;
};

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string),
};

export const sendEmail = async (data: Payload) => {
  const transporter = nodemailer.createTransport({
    ...smtpConfig,
  });

  return await transporter.sendMail({
    from: `"Virtual Park In" <${process.env.SMTP_FROM}>`,
    ...data,
  });
};
