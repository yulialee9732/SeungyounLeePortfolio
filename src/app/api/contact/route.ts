import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (resets on server restart)
const submissions = new Map();
const RATE_LIMIT = 3;
const TIME_WINDOW = 3600000;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const now = Date.now();
    const userSubmissions = submissions.get(email) || [];
    const recentSubmissions = userSubmissions.filter(
      (time: number) => now - time < TIME_WINDOW
    );

    if (recentSubmissions.length >= RATE_LIMIT) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'leeyulia150@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    recentSubmissions.push(now);
    submissions.set(email, recentSubmissions);

    const timestamp = new Date().toISOString();
    const csvLine = `"${timestamp}","${name.replace(/"/g, '""')}","${email.replace(/"/g, '""')}","${message.replace(/"/g, '""').replace(/\n/g, ' ')}"\n`;
    const filePath = path.join(process.cwd(), 'contact-submissions.csv');

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, 'Timestamp,Name,Email,Message\n');
    }

    fs.appendFileSync(filePath, csvLine);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
