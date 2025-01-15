const express = require("express");
const axios = require("axios");
const app = express();

require("dotenv").config();
const PORT = 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/weather", async (req, res) => {
    const city = req.query.city;

    if (!city){
        return res.status(400).send("City is required");
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = response.data;

        res.json({
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_speed: data.wind.speed,
            coordinates: {
                lat: data.coord.lat,
                lon: data.coord.lon,
            },
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        });
    } catch (error) {
        res.status(500).send("Error fetching weather data");
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
