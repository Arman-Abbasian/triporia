import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const sendActivationEmail = async (
  to: string,
  activationLink: string
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: `"Triporia" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject: 'Activate your Triporia account',
    html: `
      <p>Hi 👋</p>
      <p>Click the link below to activate your account:</p>
      <a href="${activationLink}">${activationLink}</a>
      <p>This link will expire in 1 hour.</p>
    `,
  })
}
