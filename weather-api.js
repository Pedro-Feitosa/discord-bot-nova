const request = require('request')
require('dotenv').config()
const API_KEY = process.env.API_KEY



const get_weather = (cidade, cb) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${API_KEY}`
    request.get({url, json: true}, (err, res) => {
        cb({
            'temp': Math.round(res.body.main.temp),
            'feels_like': Math.round(res.body.main.feels_like),
            'humidity': res.body.main.humidity,
            'wind_speed': res.body.wind.speed,
            'location': `${res.body.name}, ${res.body.sys.country}`
        })
    })
  }

module.exports = get_weather