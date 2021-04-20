const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=35b67c8c0a8cbe390fcb130d9f2b83a8&query=' + latitude + ',' + longitude


    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to services!', undefined)
        } else if (body.error) {
            callback('Unable to get Data!', undefined)
        } else {
            const degree = body.current.temperature
            const feelsLike = body.current.feelslike
            callback(undefined, `${body.current.weather_descriptions[0]} .Currently out there is ${degree}. But it feels like ${feelsLike}`)
        }
    })
}


module.exports = forecast