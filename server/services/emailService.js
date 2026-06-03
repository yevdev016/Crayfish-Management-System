import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: `"Crayfish Management" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your OTP Code for Registration',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #1e293b; margin-bottom: 16px;">Email Verification</h2>
        <p style="color: #475569; font-size: 15px; line-height: 1.6;">Use the OTP below to complete your registration. This code expires in <strong>10 minutes</strong>.</p>
        <div style="text-align: center; margin: 24px 0;">
          <span style="display: inline-block; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #2563eb; background: #eff6ff; padding: 12px 24px; border-radius: 8px;">${otp}</span>
        </div>
        <p style="color: #94a3b8; font-size: 13px;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  }
  await transporter.sendMail(mailOptions)
}
