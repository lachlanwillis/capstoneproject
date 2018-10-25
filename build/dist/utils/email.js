"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = require("nodemailer");
var FROM_EMAIL = 'noreplyrubbishapp@gmail.com';
var transport = nodemailer_1.createTransport({
    service: "Gmail",
    auth: {
        user: FROM_EMAIL,
        pass: 'Secret?PASSword!'
    },
    tls: {
        rejectUnauthorized: false
    }
});
function sendPasswordResetEmail(to, token) {
    var options = {
        to: to,
        from: FROM_EMAIL,
        subject: 'Rubbish App: Please verify your email address.',
        html: "\n            Please follow the link below to reset your password.<br />\n            <a href=\"http://localhost:4200/reset/" + token + "\">Reset your password</a> <br />\n            "
    };
    transport.sendMail(options, function (error) {
        if (error)
            return console.error(error);
    });
}
exports.sendPasswordResetEmail = sendPasswordResetEmail;
function sendVerificationEmail(to, token) {
    var options = {
        to: to,
        from: FROM_EMAIL,
        subject: 'Rubbish App: Please verify your email address.',
        html: "\n            Please verify your email address by clicking the link below: <br />\n            <a href=\"http://localhost:4200/api/verify/" + token + "\">" + token + "</a> <br />\n            <br />\n            If you didn't sign up for this website, please <a href=\"http://localhost:4200/api/verify/decline/" + token + "\">click here</a>.\n            "
    };
    transport.sendMail(options, function (error) {
        if (error)
            return console.error(error);
    });
}
exports.sendVerificationEmail = sendVerificationEmail;
