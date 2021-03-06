import { createTransport, SendMailOptions } from 'nodemailer';

const FROM_EMAIL = process.env.EMAIL || 'noreplyrubbishapp@gmail.com';


const transport = createTransport({
    service: process.env.EMAIL_SERVICE || "Gmail",
    auth: {
        user: FROM_EMAIL,
        pass: process.env.EMAIL_PASSWORD || 'Secret?PASSword!'
    },
    tls: {
        rejectUnauthorized: false
    } 
});

export function sendPasswordResetEmail(to: string, token: string) {
    const options: SendMailOptions = {
        to,
        from: FROM_EMAIL,
        subject: 'Rubbish App: Please verify your email address.',
        html: `
            Please follow the link below to reset your password.<br />
            <a href="http://${ process.env.DOMAIN || 'localhost:4200' }/reset/${token}">Reset your password</a> <br />
            `
    };

    transport.sendMail(options, error => {
        if (error) return console.error(error);
    });
}

export function sendVerificationEmail(to: string, token: string) {
    const options: SendMailOptions = {
        to,
        from: FROM_EMAIL,
        subject: 'Rubbish App: Please verify your email address.',
        html: `
            Please verify your email address by clicking the link below: <br />
            <a href="https://${ process.env.DOMAIN || 'localhost:4200' }/api/verify/${token}">${token}</a> <br />
            <br />
            If you didn't sign up for this website, please <a href="https://${ process.env.DOMAIN || 'localhost:4200' }/api/verify/decline/${token}">click here</a>.
            `
    };

    transport.sendMail(options, error => {
        if (error) return console.error(error);
    });
}