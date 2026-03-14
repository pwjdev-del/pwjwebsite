import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fullName = formData.get('fullName') as string;
    const workEmail = formData.get('workEmail') as string;
    const companyName = formData.get('companyName') as string;
    const websiteUrl = formData.get('websiteUrl') as string;
    const companySize = formData.get('companySize') as string;
    const timeline = formData.get('timeline') as string;
    const serviceType = formData.get('serviceType') as string;
    const crmSystem = formData.get('crmSystem') as string;
    const projectDescription = formData.get('projectDescription') as string;
    
    // The file is a File object in FormData
    const documentFile = formData.get('document') as File | null;

    // Email content
    const htmlContent = `
      <h2>New Lead Submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${workEmail}</p>
      <p><strong>Company:</strong> ${companyName}</p>
      <p><strong>Website:</strong> <a href="${websiteUrl}">${websiteUrl}</a></p>
      <p><strong>Size:</strong> ${companySize}</p>
      <p><strong>Timeline:</strong> ${timeline}</p>
      <p><strong>Service Needed:</strong> ${serviceType}</p>
      <p><strong>Current Systems:</strong> ${crmSystem}</p>
      <br>
      <p><strong>Project Description:</strong><br>${projectDescription?.replace(/\n/g, '<br>') || 'None provided'}</p>
    `;

    // Only set up transporter if env variables exist
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials not set. Please add SMTP_HOST, SMTP_USER, and SMTP_PASS to your .env file.");
      // In development, we might not have SMTP. Returning true so the UI works, but it won't actually email.
      return NextResponse.json({ success: true, message: "Email simulated (no SMTP config)" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const attachments = [];
    if (documentFile && documentFile.size > 0) {
      const buffer = Buffer.from(await documentFile.arrayBuffer());
      attachments.push({
        filename: documentFile.name,
        content: buffer,
      });
    }

    // Send email to the specified address
    await transporter.sendMail({
      from: `"Lead Capture" <${process.env.SMTP_USER}>`,
      to: "pwjdev@gmail.com", 
      replyTo: workEmail, // So when you click 'Reply', it goes to the user who filled the form
      subject: `New Lead: ${fullName} from ${companyName}`,
      html: htmlContent,
      attachments: attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
