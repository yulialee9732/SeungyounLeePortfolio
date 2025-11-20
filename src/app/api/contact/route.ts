import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (resets on server restart)
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 3; // max submissions per email
const TIME_WINDOW = 3600000; // 1 hour in milliseconds

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Rate limiting check
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

    // Verify environment variable exists
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'leeyulia150@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 400 }
      );
    }

    // Update rate limiting
    recentSubmissions.push(now);
    submissions.set(email, recentSubmissions);

    // Save to CSV file
    const timestamp = new Date().toISOString();
    const csvLine = `"${timestamp}","${name.replace(/"/g, '""')}","${email.replace(/"/g, '""')}","${message.replace(/"/g, '""').replace(/\n/g, ' ')}"\n`;
    const filePath = path.join(process.cwd(), 'contact-submissions.csv');

    // Create file with headers if it doesn't exist
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, 'Timestamp,Name,Email,Message\n');
    }

    // Append the new submission
    fs.appendFileSync(filePath, csvLine);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
