import nodemailer from 'nodemailer';
const sendEmail = async (userEmail, subject, message) => {
  console.log(userEmail, subject, message);
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    console.log(transporter);

    const mailOptions = {
      from: {
        name: 'harapan-bunda-hospital',
        address: process.env.GMAIL_USER,
      },
      to: userEmail,
      subject: subject,
      html: message,
    };

    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info);

    // Preview URL for testing
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log(err);
    return (
      {
        message: 'something wrong',
      },
      {
        status: 500,
      }
    );
  }
};

export default sendEmail;
