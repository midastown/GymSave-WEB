const express = require('express')
const router = express.Router()
const Session = require('../models/session')

Date.prototype.addDays = function(days){
    return new Date(this.valueOf() + (days * 60 * 60 * 24 * 1000))
}


////// ROUTES ///////////

// Index page
router.get('/', (req, res) => {
    res.render('sessions/index')
})

// Search page
router.get('/search-sessions', (req, res) => {
    res.render('sessions/search-sessions')
})

// Search by date
router.get('/search-by-date', async (req, res) => {

    let range = parseInt(req.query.range)
    let datePicked = req.query.date_picked.split('-').map(Number)
    // months start at 0... Date(yyyy,mm,dd)
    let start = new Date(datePicked[0], datePicked[1] - 1 , datePicked[2])
    let end = start.addDays(range == 0 ? 1 : range) 

    try {
        const sessions = await Session.find({
            date: { 
                $gte: start, 
                $lt: end 
            }
        })
        if (sessions.toString() == "") {
            res.render('sessions/no-sessions-found')
        } else {
            res.render('sessions/sessions-by-date', {data: {sessionsData: sessions, startDate: start, endDate: end}})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

// Get all sessions
router.get('/all-sessions', async (req, res) => {
    try{
        const sessions = await Session.find()
        res.render('sessions/all-sessions', {data: {sessionsData: sessions}})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})


// Post a session 
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
        const newSession = await session.save()
        res.render('sessions/success-add')
    } catch (e) {
        res.status(500).json({message: e.message})
    }

})


module.exports = router
