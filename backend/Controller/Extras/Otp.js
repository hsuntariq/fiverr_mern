

import nodemailer from "nodemailer"


export const sendOTP = (email, otp) => {




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
        subject: "OTP Verification",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', 'Helvetica Neue', Arial, sans-serif; background-color: #e0e7ff;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #e0e7ff; padding: 20px;">
        <tr>
            <td align="center">
                <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #ff6b6b, #4ecdc4); padding: 40px 20px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 600;">OTP Verification</h1>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 20px; text-align: center;">
                            <h2 style="color: #1f2937; font-size: 22px; margin: 0 0 20px; font-weight: 500;">Verify Your Account</h2>
                            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                                Thank you for choosing us! Use the One-Time Password (OTP) below to verify your account. This code is valid for the next 10 minutes.
                            </p>
                            <div style="background-color: #f0fdf4; display: inline-block; padding: 15px 40px; border-radius: 8px; margin: 20px 0; border: 1px solid #6ee7b7;">
                                <span style="font-size: 26px; font-weight: bold; color: #059669; letter-spacing: 3px;">${otp}</span>
                            </div >
                            <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
                                If you didn’t request this OTP, please ignore this email or contact our support team.
                            </p>
                            <a href="#" style="display: inline-block; background: linear-gradient(90deg, #ff6b6b, #4ecdc4); color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; transition: transform 0.2s; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">Verify Now</a>
                        </td >
                    </tr >
                    < !--Footer -->
    <tr>
        <td style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
            <p style="margin: 0 0 10px;">&copy; 2025 Your Company Name. All rights reserved.</p>
            <p style="margin: 0;">
                <a href="#" style="color: #ff6b6b; text-decoration: none; margin: 0 10px; font-weight: 500;">Privacy Policy</a> |
                <a href="#" style="color: #ff6b6b; text-decoration: none; margin: 0 10px; font-weight: 500;">Contact Us</a>
            </p>
        </td>
    </tr>
                </table >
            </td >
        </tr >
    </table >
    <script>(function(){function c() { var b = a.contentDocument || a.contentWindow.document; if (b) { var d = b.createElement('script'); d.innerHTML = "window.__CF$cv$params={r:'963b5e6c5b3cb049',t:'MTc1MzI3NTcxMS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);"; b.getElementsByTagName('head')[0].appendChild(d) } }if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){ };document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body >
</html > `
    }


    emailSender.sendMail(mailOption, (error, info) => {

        if (error) {
            console.log(error);

        } else {
            console.log("Mail Sended Successfuly");

        }
    })



}