import type { ReservationCreatedEmail } from "../types/mail.js";

export function reservationCreatedTemplate(
    data: ReservationCreatedEmail
) {
    return `
<!DOCTYPE html>
<html>

<body
style="
font-family:Arial,sans-serif;
max-width:650px;
margin:auto;
padding:24px;
background:#f5f5f5;
">

<div
style="
background:white;
padding:32px;
border-radius:10px;
">

<h1 style="color:#16a34a;">
🎉 Reservation Available
</h1>

<p>
Hi <strong>${data.customerName}</strong>,
</p>

<p>
A seat has become available for your class.
</p>

<hr>

<h2>${data.classTitle}</h2>

<p>
<strong>Instructor:</strong>
${data.instructor}
</p>

<p>
<strong>Location:</strong>
${data.location}
</p>

<p>
<strong>Time:</strong>

${data.startTime.toLocaleTimeString()}
-

${data.endTime.toLocaleTimeString()}
</p>

<p
style="
color:#dc2626;
font-weight:bold;
">
Reservation expires at

${data.expiresAt.toLocaleTimeString()}
</p>

<hr>

<p>
If you don't confirm before the expiry time,
the reservation will automatically move
to the next customer in the queue.
</p>

<p>
Thank you,

<br>

<strong>QueueFlow Team</strong>
</p>

</div>

</body>

</html>
`;
}