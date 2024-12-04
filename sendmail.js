import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;
    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // Use true for 465, false for other ports
      auth: { 
        user: "admin@thejadenx.com",
        pass: "Manpreethill@123",
      },
    });

    // Define the email options
    const mailOptions = {
      from: "admin@thejadenx.com", // Sender address (can be changed to a fixed email)
      to: "yogeshsolankim76@gmail.com", // Your email to receive the form data
      subject: `${name} Send Inquiry From JadenX Website`,
      text: `
      Name : ${name}
      Email : ${email}
      Message : ${message}`
      , 
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send email." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
