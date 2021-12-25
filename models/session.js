const mongoose = require('mongoose')

const sessionSchema = mongoose.Schema({
    exercise: {
        type: String,
        required: true
    },

    repetitions: {
        type: String,
        required: true
    },

    series: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.model('Session', sessionSchema)
