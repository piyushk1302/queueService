import transporter from "../config/mail.js";

class MailService {

    async sendMail(
        to: string,
        subject: string,
        html: string
    ) {

        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to,
            subject,
            html,
        });

    }

}

export default new MailService();