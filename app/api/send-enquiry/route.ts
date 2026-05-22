import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, serviceType, message } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !serviceType) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.FROM_EMAIL) {
      console.error('[v0] Missing SMTP configuration');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // For port 587, use TLS (startTLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });

    // Business email - send to the BUSINESS_EMAIL (with fallback to FROM_EMAIL)
    const businessMailOptions = {
      from: process.env.FROM_EMAIL,
      to: process.env.BUSINESS_EMAIL || process.env.FROM_EMAIL,
      subject: `New Enquiry from ${name} - ${serviceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1a8a80;">New Enquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service Type:</strong> ${serviceType}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message || 'No message provided'}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is an automated message from your website contact form.</p>
        </div>
      `,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Thank you for your enquiry - InDawn Space',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1a8a80;">Thank You, ${name}!</h2>
          <p>We have received your enquiry about <strong>${serviceType}</strong>.</p>
          <p>Our team will review your request and get back to you as soon as possible.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <h3 style="color: #1a8a80;">Your Enquiry Details:</h3>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service Type:</strong> ${serviceType}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666;">InDawn Space - Where Living Meets Luxury</p>
          <p style="color: #666; font-size: 12px;">© ${new Date().getFullYear()} InDawn Space. All rights reserved.</p>
        </div>
      `,
    };

    // Test the connection first
    try {
      await transporter.verify();
      console.log('[v0] SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('[v0] SMTP verification failed:', verifyError);
      throw new Error('Failed to verify SMTP connection');
    }

    // Send both emails
    try {
      await transporter.sendMail(businessMailOptions);
      console.log('[v0] Business email sent successfully');
    } catch (businessEmailError) {
      console.error('[v0] Failed to send business email:', businessEmailError);
      throw businessEmailError;
    }

    try {
      await transporter.sendMail(userMailOptions);
      console.log('[v0] User confirmation email sent successfully');
    } catch (userEmailError) {
      console.error('[v0] Failed to send user email:', userEmailError);
      throw userEmailError;
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry sent successfully! We will contact you soon.',
    });
  } catch (error) {
    console.error('[v0] Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
