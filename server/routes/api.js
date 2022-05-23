const express = require('express')
const router = express.Router()
const axios = require('axios')
const City = require('../models/City')
const Consts = require('../models/Consts')


router.get('/city/:cityName', async function (req, res) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&appid=${Consts.apiKey}&units=metric`)
        const cityWeather = new City({
            name: response.data.name.toLowerCase(),
            temperature: response.data.main.temp,
            condition: response.data.weather[0].description,
            conditionPic: response.data.weather[0].icon
        })
        res.send(cityWeather)
    } catch (err) {
        res.status(parseInt(err.response.data.cod)).send("bad requset")
    }
})

router.get('/cities', async function (req, res) {
    const cities = await City.find({})
    res.status(200).send(cities)
})

router.post('/city', function (req, res) {
    const city = new City({
        name: req.body.name.toLowerCase(),
        temperature: req.body.temperature,
        condition: req.body.condition,
        conditionPic: req.body.conditionPic
    })
    city.save()
    res.status(201).send("new city added")
})

router.delete('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName.toLowerCase()
    City.deleteOne({ name: cityName }).exec((err, city) => {
        if (err) {
            throw (err)
        }
    })
    res.status(204).send("deleted")
})

module.exports = router


// {
//     "temperature": 287.71,
//     "name": "akko",
//     "condition": "Clouds"
//     "conditionPic": "02d"
// }
