const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <style>
                    body{ 
                    text-align: center; margin-top: 50px; 
                    }
                    input, button{ 
                    padding: 10px; margin: 5px; 
                    }
                    button{ 
                    background-color: #a41616; color: white; border: none;
                    }
                </style>
            </head>
            <body>
                <h1>BMI Calculator</h1>
                <form action="/calculate-bmi" method="POST">
                    <input type="number" name="weight" placeholder="Weight (kg)"><br>
                    <input type="number" name="height" placeholder="Height (m)"><br>
                    <button type="submit">Calculate</button>
                </form>
            </body>
        </html>
    `);
});

app.post('/calculate-bmi', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0){
        return res.send('<h1>Please enter positive numbers for weight and height</h1>');
    }

    const bmi = (weight / (height * height)).toFixed(2);
    let category;

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    res.send(`
        <html>
            <body style="font-family: Arial; text-align: center; margin-top: 50px;">
                <h1>Your BMI is ${bmi}</h1>
                <h2>You are ${category}</h2>
                <a href="/" style="color: blue;">Go back</a>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is at the http://localhost:${PORT}`);
});
