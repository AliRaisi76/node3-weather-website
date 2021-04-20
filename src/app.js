const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()


// These give us the absoulte path OR Define path for express  config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)




// Routing to the home template 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ali Raisi'
    })
})

// Routing to the about tempalte
app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Ali Raisi',
        title: 'Aboute Me'
    })
})

// Routing to the help template
app.get('/help', (req, res) => {
    res.render('help', {
        helpMSG: 'Hi this is a message from help group!',
        title: 'Help',
        name: 'Ali Raisi'
    })
})


// weather page route
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })
    })




})

app.get('/products', () => {
    if (!req.query.search) {
        return res.send('No search term provided!')
    }
    res.send({
        products: []
    })
})

// Routing to 404 page of help subsidiaries
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        name: 'Ali Raisi',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ali Raisi',
        errorMessage: 'Page not found.'
    })
})

// Server handler
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})