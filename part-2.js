const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yerkhan2708@gmail.com',
        pass: 'svib lzkt ddji dnak',
    },
});

const mailOptions = {
    from: 'yerkhan2708@gmail.com',
    to: 'aikhan0506@gmail.com',
    subject: 'Test if Email is working',
    text: 'This is a test',
    attachments: [
        {
            filename: 'test.txt',
            content: 'Hello world',
        },
    ],
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log('Error:', err);
    }
    else {
        console.log('Email sent:', info.response);
    }
});
