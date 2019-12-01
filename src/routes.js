const express = require('express')
const control = require('./controllers/controls.js')

const router = express.Router()

router.post('/signup',control.createUser)
router.post('/login',control.login)

router.get('/users',control.getUsers)
router.get('/user/:id',control.getUser)
router.patch('/user/:id',control.updateUser)
router.delete('/user/:id',control.deleteUser)

router.post('/addGame',control.createGame)

router.get('/games',control.getGames)
router.get('/game/:id',control.getGame)
router.patch('/game/:id',control.updateGame)
router.delete('/game/:id',control.deletegame)

module.exports = router

