const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Path:', request.path)
    logger.info('Method:', request.method)
    logger.info('Body:', request.body)
    logger.info(`___`)

    next()
}

const unknownEndpoint = (request, response) => {
    response.status(400).send({ error: 'unknown endpoint' })
}


const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        response.status(400).json({ error: 'malformatted request' })
    } else if (error.name === 'ValidationError') {
        response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    next(error)
}

module.exports = { requestLogger, errorHandler, unknownEndpoint }