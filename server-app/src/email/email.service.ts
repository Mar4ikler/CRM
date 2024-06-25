/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailOptions, SentMessageInfo } from 'nodemailer';
import { EmailNotificationParams } from '../common/interfaces/emailNotificationParams';

@Injectable()
export class EmailNotificationService {
    private transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_LOGIN,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    sendEmailNotification = (emailParams: EmailNotificationParams): void => {
        const mailOptions: SendMailOptions = {
            from: process.env.GMAIL_LOGIN,
            to: emailParams.userEmail,
            subject: emailParams.subject,
            text: emailParams.message,
        };

        this.transporter.sendMail(
            mailOptions,
            (error: Error | null, info: SentMessageInfo): void => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            }
        );
    };
}
