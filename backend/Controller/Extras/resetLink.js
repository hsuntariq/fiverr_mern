

import nodemailer from "nodemailer"


export const sendResetMail = (email, link) => {




    let emailSender = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })


    let mailOption = {
        from: "hsuntariq@gmail.com",
        to: email,
        subject: "Password Reset",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(90deg, #6e8efb, #a777e3);
      color: white;
      text-align: center;
      padding: 20px;
    }
    .header i {
      font-size: 24px;
      margin-bottom: 10px;
    }
    .content {
      padding: 30px;
      text-align: center;
    }
    .content p {
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .reset-button {
      display: inline-block;
      padding: 12px 25px;
      background: linear-gradient(90deg, #6e8efb, #a777e3);
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
    }
    .reset-button:hover {
      opacity: 0.9;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 12px;
    }
    @media (max-width: 600px) {
      .container {
        margin: 20px;
      }
      .content {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <i class="fas fa-lock"></i>
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Salam</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      <a href="${link}" class="reset-button">Reset Password</a>
      <p>This link will expire in 24 hours. If you did not request this, please contact us at support@x.ai.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 xAI. All rights reserved.</p>
      <p>Sent at 07:42 PM PKT on Saturday, August 02, 2025</p>
    </div>
  </div>
</body>
</html>`
    }


    emailSender.sendMail(mailOption, (error, info) => {

        if (error) {
            console.log(error);

        } else {
            console.log("Mail Sended Successfuly");

        }
    })



}