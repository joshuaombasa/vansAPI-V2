const vansRouter = require('express').Router()
const Van = require('../models/van')
const User = require('./users')

vansRouter.get('/', async (request,response, next) => {
    try {
        const vans = await Van.find({}).populate('user', {username: '1', name:'1'})
        response.json(vans)
    } catch (exception) {
        next(exception)
    }
})

vansRouter.get('/:id', async (request,response, next) => {
    try {
        const van = await Van.findById(request.params.id).populate('user', {username: '1', name:'1'})
        if(van) {
            response.json(van)
        } else {
            res.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

vansRouter.post('/', async (request,response, next) => {
    const body = request.body

    const user = await user.findById(body.userId)

    const van = new Van({
        name: body.name,
        type: body.type,
        price: body.price,
        user:  user.id
    })

    try {
        const savedVan = await van.save()
        user.vans = user.vans.concat(savedVan._id)
        await user.save()
        response.status(201).end()
    } catch (exception) {
        next(exception)
    }
})

vansRouter.put('/:id', async (request,response, next) => {
    const body = request.body

    const user = await User.findById(request.params.id)

    const van = {
        name: body.name,
        type: body.type,
        price: body.price,
        user:  user.id
    }
    try {
        const updatedVan = await Van.findByIdAndUpdate(request.params.id, van, {new:true})
        response.json(updatedVan)
    } catch (exception) {
        next(exception)
    }
})

vansRouter.delete('/', async (request,response, next) => {
   
    try {
        await Van.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

module.exports = vansRouter