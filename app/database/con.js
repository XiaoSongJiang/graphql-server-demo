const mongoose = require('mongoose')
const config = require('../config/db')
require('../model/cat')
require('../model/food')
module.exports = () => {
    mongoose.set('debug', true)

    mongoose.connect(config.url, config.options)

    mongoose.connection.on('disconnected', () => {
        mongoose.connect(config.url, config.options)
    })
    mongoose.connection.on('error', err => {
        console.error(err)
    })

    mongoose.connection.on('open', async () => {
        console.log('Connected to MongoDB ', config.url)
    })
    return mongoose;
}
