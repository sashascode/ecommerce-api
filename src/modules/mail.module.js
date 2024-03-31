import nodemailer from 'nodemailer'
import { logger } from '../utils/logger.js';
import config from '../config/config.js'

export default class Mail {

    constructor() {
        this.transport = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.gmailUser,
                pass: config.gmailPass
            }
        })
    }

    send = async(user, subject, html) => {
        const opt = {
            from: config.gmailUser,
            to: user.email,
            subject,
            html
        }

        const result = await this.transport.sendMail(opt);

        logger.debug("[MAIL MODULE] Mail sent");
        return result;
    }

    async sendNewUserMail(user) {
        const html = 
        `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${config.baseUrl}/assets/ghiblistore-logo.png" alt="Ghibli Store Logo" style="width: 150px;">
            </div>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                <h1 style="color: #333;">Welcome to Ghibli Store!</h1>
                <p>
                    Hi ${user.first_name},
                </p>
                <p>
                    Welcome to Ghibli Store! We're thrilled to have you on board.
                </p>
                <p>
                    Here are your account details:
                    <ul style="list-style: none; padding: 0;">
                        <li>Email: ${user.email}</li>
                        <li>Full Name: ${user.first_name} ${user.last_name}</li>
                    </ul>
                </p>
                <p>
                    Feel free to explore our store and discover amazing products.
                </p>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <p>
                    Thanks for joining us!<br>
                    The Ghibli Store Team
                </p>
            </div>
        </div>
        `;
    
        const subject = 'Welcome to Ghibli Store';
    
        await this.send(user, subject, html);
    }
    

    async sendResetPasswordMail(user, link) {
        const html = 
        `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${config.baseUrl}/assets/ghiblistore-logo.png" alt="Ghibli Store Logo" style="width: 150px;">
            </div>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                <h1 style="color: #333;">Reset your Ghibli Store password</h1>
                <p>
                    Hi ${user.first_name},
                </p>
                <p>
                    We heard that you lost your Ghibli Store password. Sorry about that!<br>
                    But don’t worry! You can use the following link to reset your password:
                </p>
                <a href="${link}" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 20px;">Reset Password</a>
                <p style="margin-top: 20px;">
                    If you don’t use this link within 1 hour, it will expire.
                </p>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <p>
                    Thanks,<br>
                    The Ghibli Store Team
                </p>
            </div>
        </div>
        `;
    
        const subject = '[Ghibli Store] Please reset your password';
    
        await this.send(user, subject, html);
    }    

    async sendOrderConfirmationMail(user, order) {
        const html = 
        `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${config.baseUrl}/assets/ghiblistore-logo.png" alt="Ghibli Store Logo" style="width: 150px;">
            </div>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                <h1 style="color: #333;">Order Confirmation</h1>
                <p>
                    Hi,
                </p>
                <p>
                    We have received your order. Here are the details:
                </p>
                <p>
                    Order ID: ${order._id}<br>
                    Total Amount: $${order.amount}<br>
                </p>
            </div>
        </div>
        `

        const subject = '[Ghibli Store] Order confirmation';
    
        await this.send(user, subject, html);
    }

    async sendInactiveUserDeletedMail(user) {
        const html = 
        `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${config.baseUrl}/assets/ghiblistore-logo.png" alt="Ghibli Store Logo" style="width: 150px;">
            </div>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                <h1 style="color: #333;">Account Deletion</h1>
                <p>
                    Hi ${user.first_name},
                </p>
                <p>
                    We are sorry to inform you that your account has been deleted due to inactivity.
                </p>
            </div>
        </div>
        `;

        const subject = '[Ghibli Store] Account deletion due to inactivity';
    
        await this.send(user, subject, html);
    }
}