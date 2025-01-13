const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <html>
            <body>
                <form action="/calculate-bmi" method="POST">
                    <input type="number" name="weight" placeholder="Weight (kg)" step="0.1"><br>
                    <input type="number" name="height" placeholder="Height (m)" step="0.01"><br>
                    <button type="submit">Calculate</button>
                </form>
            </body>
        </html> 
    `);
});
app.post('/calculate-bmi', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

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
    res.send("You are " + category);
});

app.listen(PORT, () => {
    console.log(`Server is at the http://localhost:${PORT}`);
});