const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const User = mongoose.model('User', {
    username: String,
    email: String,
    password: String,
});

app.get('/', (req, res) => res.sendFile(__dirname + '/register.html'));
app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({ username: req.body.username, email: req.body.email, password: hashedPassword });
    res.redirect('/login');
});

app.get('/login', (req, res) => res.sendFile(__dirname + '/login.html'));
app.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.send(`<h1>Welcome, ${user.username}!</h1>`);
    } else {
        res.send('<h1>Invalid email or password</h1>');
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
