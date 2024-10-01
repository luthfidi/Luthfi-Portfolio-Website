// Pastikan Anda telah menginstal dependencies dengan menjalankan:
// npm install express body-parser nodemailer cors

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000; // Atau port lain yang Anda inginkan

app.use(cors()); // Mengizinkan CORS untuk semua origins
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Konfigurasi transporter email
const transporter = nodemailer.createTransport({
  service: 'gmail', // Ganti dengan layanan email Anda
  auth: {
    user: 'luthfihadi543@gmail.com', // Ganti dengan email Anda
    pass: 'jpfm csva umsp jrwz' // Ganti dengan password Anda atau app password
  }
});

app.post('/api/send-message', (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: 'luthfihadi543@gmail.com', // Sender address
    to: 'luthfi.hadi@binus.ac.id', // List of recipients
    subject: 'New Contact Form Submission', // Subject line
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    ` // Plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error: Could not send email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Message sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});