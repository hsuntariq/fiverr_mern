import nodemailer from 'nodemailer'
export const sendOTP = (email, otp) => {
    // send otp to user



    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hsuntariq@gmail.com',
            pass: 'rskelgjtxtqkanqq'
        }
    })


    let mailOptions = {
        from: 'hsuntariq@gmail.com',
        to: email,
        subject: 'OTP Verification',
        html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        /* Reset default styles for email clients */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
            line-height: 1.6;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #2c3e50;
            padding: 20px;
            text-align: center;
        }

        .header h1 {
            color: #ffffff;
            font-size: 24px;
            margin: 0;
        }

        .content {
            padding: 30px;
            text-align: center;
        }

        .otp-box {
            display: inline-block;
            background-color: #e8f0fe;
            padding: 15px 30px;
            border-radius: 6px;
            margin: 20px 0;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #1a73e8;
        }

        .content p {
            margin-bottom: 15px;
            font-size: 16px;
            color: #555555;
        }

        .warning {
            font-size: 14px;
            color: #888888;
            margin-top: 20px;
        }

        .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #888888;
        }

        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #1a73e8;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
            margin: 15px 0;
        }

        .button:hover {
            background-color: #1557b0;
        }

        @media only screen and (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 4px;
            }

            .content {
                padding: 20px;
            }

            .otp-box {
                font-size: 24px;
                padding: 10px 20px;
            }

            .header h1 {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Verify Your Email</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Please use the following One-Time Password (OTP) to verify your email address:</p>
            <div class="otp-box">${otp}</div>
            <p>This OTP is valid for the next 10 minutes. Please do not share this code with anyone.</p>
            <a href="#" class="button">Verify Now</a>
            <p class="warning">If you didn't request this verification, please ignore this email or contact our support team.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Your Company Name. All rights reserved.</p>
            <p>123 Business Street, Suite 100, City, Country</p>
            <p><a href="#">Contact Support</a> | <a href="#">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>
        `
    }



    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('mail sent successfully@')
        }
    })
}
