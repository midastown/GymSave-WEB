const express = require('express')
const router = express.Router()
const Session = require('../models/session')

// Post a session onto the session database in mongoDB
router.post('/create-session', async (req, res) => {

    const session = new Session({
        exercise: req.body.exercise,
        repetitions: req.body.repetitions,
        series: req.body.series
    })
    
    try {
        // mongoose call to store item in database
        const newSession = await session.save()
        res.render('sessions/session-success')
    } catch (e) {
        res.status(500).json({message: e.message})
    }

})
