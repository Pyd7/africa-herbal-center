import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, subject, message } = req.body;

    try {
      // Create a Nodemailer transporter using your email service credentials
      let transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com', // Zoho's SMTP server
        port: 465, // Port for secure connections (SSL)
        secure: true, // Use SSL
        auth: {
          user: process.env.SUPERADMIN_USER, // your email address
          pass: process.env.SUPERADMIN_PASS, // your email password 
        },
      });

      // Define email options
      let mailOptions = {
        from: 'superadmin@africa-herbal.com', // Sender email
        to: process.env.SUPPORT_USER, // Receiver email
        subject: `${subject} - Nouveau Message de ${name} - ${phone}`, // Email subject
        text: `Message: ${message}\nPhone: ${phone}\nEmail: ${email}`, // Email content
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Respond with success
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}