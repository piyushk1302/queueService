import transporter from "../config/mail.js";

import type {
    ReservationCreatedEmail
} from "../types/mail.js";

import {
reservationCreatedTemplate
} from "../templates/reservationCreated.js";

class MailService {

    async sendMail(
        to:string,
        subject:string,
        html:string
    ){

        await transporter.sendMail({
            from:process.env.MAIL_FROM,
            to,
            subject,
            html
        });

    }

    async sendReservationCreated(
        to:string,
        data:ReservationCreatedEmail
    ){

        await this.sendMail(
            to,
            "🎉 Your reservation is ready!",
            reservationCreatedTemplate(data)
        );

    }

}

export default new MailService();