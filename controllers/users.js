const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('vans', {name:'1', type:'1', price:'1'})
        response.json(users)
    } catch (exception) {
        next(exception)
    }
})

usersRouter.get('/:id', async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id).populate('vans', {name:'1', type:'1', price:'1'})
        if (user) {
            response.json(user)
        } else {
            res.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

usersRouter.post('/', async (request, response, next) => {
    const { name, username, password } = request.body

    const saltrounds = 10
    const passwordHash = await bcrypt.hash(password, saltrounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }

})

usersRouter.put('/:id', async (request, response, next) => {
    const { name, username, password } = request.body
    const passwordHash = await bcrypt.hash(password, saltrounds)
    const user = {
        username,
        name,
        passwordHash
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
        response.json(updatedUser)
    } catch (exception) {
        next(exception)
    }
})

usersRouter.delete('/:id', async (request,response,next) => {
    try {
        await User.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(exception)
    }
})

module.exports = usersRouter