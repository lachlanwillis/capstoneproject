import { createTransport, SendMailOptions } from 'nodemailer';

const FROM_EMAIL = 'noreplyrubbishapp@gmail.com';


const transport = createTransport({
    service: "Gmail",
    auth: {
        user: FROM_EMAIL,
        pass: 'Secret?PASSword!'
    },
    tls: {
        rejectUnauthorized: false
    } 
});


export function sendVerificationEmail(to: string, token: string) {
    const options: SendMailOptions = {
        to,
        from: FROM_EMAIL,
        subject: 'Rubbish App: Please verify your email address.',
        html: `
            Please verify your email address by clicking the link below: <br />
            <a href="http://localhost:4200/api/verify/${token}">${token}</a> <br />
            <br />
            If you didn't sign up for this website, please <a href="http://localhost:4200/api/verify/decline/${token}">click here</a>.
            `
    };

    transport.sendMail(options, error => {
        if (error) return console.error(error);
    });

}