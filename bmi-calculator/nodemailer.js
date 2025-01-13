const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yerkhan2708@gmail.com',
        pass: 'here is 16 letters 4*4 or it will be the error',
    },
});
const mailOptions = {
    from: 'yerkhan2708@gmail.com',
    to: 'aikhan0506@gmail.com',
    subject: 'Test if Email is working',
    text: 'This is a test',
};
transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log('Error:', err);
    }
    else {
        console.log('Email sent:', info.response);
    }
});