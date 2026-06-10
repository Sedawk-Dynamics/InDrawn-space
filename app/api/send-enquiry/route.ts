import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, phone, email, location, propertyType, whatsappOptIn } = await request.json();

    // Validate required fields
    if (!name || !phone) {
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
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1a8a80;">New Enquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Mobile Number:</strong> ${phone}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
          ${location ? `<p><strong>Location / Property Address:</strong> ${location}</p>` : ''}
          ${propertyType ? `<p><strong>Property Type:</strong> ${propertyType}</p>` : ''}
          ${whatsappOptIn !== undefined ? `<p><strong>WhatsApp updates:</strong> ${whatsappOptIn ? 'Yes' : 'No'}</p>` : ''}
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is an automated message from your website contact form.</p>
        </div>
      `,
      ...(email ? { replyTo: email } : {}),
    };

    // Test the connection first
    try {
      await transporter.verify();
      console.log('[v0] SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('[v0] SMTP verification failed:', verifyError);
      throw new Error('Failed to verify SMTP connection');
    }

    // Send enquiry email to the business
    try {
      await transporter.sendMail(businessMailOptions);
      console.log('[v0] Business email sent successfully');
    } catch (businessEmailError) {
      console.error('[v0] Failed to send business email:', businessEmailError);
      throw businessEmailError;
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
