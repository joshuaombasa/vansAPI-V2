const mongoose = require('mongoose')

const vanSchema = new mongoose.Schema({
    name: { type: String, minLength: 5, required: true },
    type: {type: String, minLength: 4, required: true},
    price: { type: String, required: true },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

vanSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Van', vanSchema)