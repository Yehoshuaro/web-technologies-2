const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
require("dotenv").config();
const PORT = 3000;
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const TIMEZONE_API_KEY = "A55FEPE61SJU";

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
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
        res.status(500).json({ error: "Error fetching weather data" });
    }
});


app.get("/timezone", async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }
    try {
        const geoResponse = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER_API_KEY}`
        );
        if (!geoResponse.data.length) {
            return res.status(404).json({ error: "City not found" });
        }
        const { lat, lon } = geoResponse.data[0];
        const timezoneResponse = await axios.get(
            `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`
        );
        const timezoneData = timezoneResponse.data;
        if (timezoneData.status === "FAILED") {
            return res.status(400).json({ error: timezoneData.message });
        }
        res.json({
            city: city,
            time_zone: timezoneData.zoneName,
            current_time: timezoneData.formatted,
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching timezone data" });
    }
});

app.get("/air-quality", async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }
    try {
        const geoResponse = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER_API_KEY}`
        );
        if (!geoResponse.data.length) {
            return res.status(404).json({ error: "City not found" });
        }
        const { lat, lon } = geoResponse.data[0];
        const airQualityResponse = await axios.get(
            `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
        );
        const airQualityData = airQualityResponse.data.list[0];
        res.json({
            city: city,
            air_quality: {
                pm2_5: airQualityData.components.pm2_5,
                pm10: airQualityData.components.pm10,
                no2: airQualityData.components.no2,
                o3: airQualityData.components.o3,
                co: airQualityData.components.co,
                aqi: airQualityData.main.aqi,
            },
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching air quality data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});