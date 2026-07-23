export interface ReservationCreatedEmail {
    customerName: string;
    classTitle: string;
    instructor: string;
    location: string;
    startTime: Date;
    endTime: Date;
    expiresAt: Date;
}

export interface ReservationExpiredEmail {
    customerName: string;
    classTitle: string;
}

export interface BookingConfirmedEmail {
    customerName: string;
    classTitle: string;
    instructor: string;
    location: string;
    startTime: Date;
    endTime: Date;
}