const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const vansRouter = require('./controllers/vans')
app.use(cors())

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
        .then(() => {
            console.log('connected to mongodb')
        })
        .catch(error => {
            logger.error('error connection to MongoDB:',error.message)
        })

app.use(middleware.requestLogger)

app.use('/api/vans', vansRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app