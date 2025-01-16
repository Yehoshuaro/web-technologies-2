const express = require("express");
const axios = require("axios");
const app = express();

require("dotenv").config();
const API_KEY = process.env.OPENWEATHER_API_KEY;

app.get("/", (req, res) =>
    res.sendFile(__dirname + "/preparing.html"));

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).send("City is required");

    try {
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        res.json({
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            description: data.weather[0].description,
        });
    }
    catch {
        res.status(500).send("Error fetching weather data");
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));