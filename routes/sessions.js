const express = require('express')
const router = express.Router()
const Session = require('../models/session')

// Index page
router.get('/', (req, res) => {
    res.render('sessions/index')
})

// Search page
router.get('/search-sessions', (req, res) => {
    res.render('sessions/search-sessions')
})

// temp
const getMethods = (obj) => {
  let properties = new Set()
  let currentObj = obj
  do {
    Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
  } while ((currentObj = Object.getPrototypeOf(currentObj)))
  return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}

// Search by date
router.get('/search-by-date', async (req, res) => {
    let range = 1
    let datePicked = req.query.date_picked.split('-')


    try {
        const sessions = await Session.find({
            date: { // months start at 0
                $gte: new Date(datePicked[0], datePicked[1] - 1 , datePicked[2]),
                $lt: new Date(datePicked[0], datePicked[1] - 1, datePicked[2] + range)
            }
        })
        if (sessions.toString() == "") {
            res.json({message: "no sessions were found for the coresponding date"})
        } else {
            res.json(sessions)
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }

    

})

// get all sessions
router.get('/all-sessions', async (req, res) => {
    try{
        const sessions = await Session.find()
        res.render('sessions/all-sessions', {sessionsData: sessions})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
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
