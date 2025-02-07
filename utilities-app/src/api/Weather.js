import React, { useEffect } from "react";
import { useState } from "react";

function WeatherWidget() {

    const params = {

        "hourly": ["temperature_2m", "apparent_temperature", "precipitation_probability", "rain", "snowfall", "cloud_cover", "wind_speed_10m", "wind_direction_10m", "relative_humidity_2m"],

    };

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m&minutely_15=temperature_2m,rain,wind_speed_10m,wind_speed_80m&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m,relative_humidity_2m&daily=temperature_2m_max,apparent_temperature_max,precipitation_probability_max,daylight_duration,wind_speed_10m_max`;

    // get forcast for the locaton of the user
    app.get('/api/qotd', async (req, res) => {
        try {
            const response = await fetch(weatherUrl);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch quote' });
        }
    });

}

export default WeatherWidget;