const express = require("express");
const QRCode = require("qrcode");
const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
    const url = "https://www.npmjs.com/";

    QRCode.toDataURL(url, (err, qrCode) => {
        if (err) {
            res.send("Error with QR Code" + err);
            return;
        }

        res.send(`
            <html>
            <head>
                <title>QR Code</title>
                <style>
                    body {
                        text-align: center;
                        font-family: Arial, sans-serif;
                        margin-top: 50px;
                    }
                </style>
            </head>
            <body>
                <h1>QR to the npmjs.com</h1>
                <img src="${qrCode}" alt="QR Code" />
            </body>
            </html>
        `);
    });
});

app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
});








