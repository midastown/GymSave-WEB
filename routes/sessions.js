const express = require('express')
const router = express.Router()
const Session = require('../models/session')

router.get('/', (req, res) => {
    res.render('sessions/index')
})

// Post a session onto the session database in mongoDB
router.post('/create-session', async (req, res) => {

    let reqExercises = []
    let reqRepetitions = []
    let reqSeries = []

    for (var i = 0; i < req.body.exerciseIndex; i++) {
        reqExercises.push(req.body.exercise[i])
        reqRepetitions.push(req.body.repetitions[i])
        reqSeries.push(req.body.series[i])
    }

    const session = new Session({
        exercise: reqExercises,
        repetitions: reqRepetitions,
        series: reqSeries
    })
    
    try {
        // mongoose call to store item in database
        const newSession = await session.save()
        res.render('sessions/success-create')
    } catch (e) {
        res.status(500).json({message: e.message})
    }

})

module.exports = router
