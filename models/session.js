const mongoose = require('mongoose')
const schema = mongoose.Schema()

const sessionSchema = schema({
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
        type: Date
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.mode('Session', sessionSchema)
