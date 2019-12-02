const express = require('express')
const control = require('./controllers/controls.js')
const auth = require('./middleware/auth.js')

const router = express.Router()

router.post('/signup',control.createUser)
router.post('/login',control.login)
router.post('/logout',auth,control.logout)

router.get('/users',auth,control.getUsers)
router.get('/user/:id',auth,control.getUser)
router.patch('/user/:id',auth,control.updateUser)
router.post('/user/toplay/:id',auth,control.updateUserToPlayGames)
router.post('/user/played/:id',auth,control.updateUserPlayedGames)
router.delete('/user/:id',auth,control.deleteUser)

router.post('/adminGame',control.createGame)
router.post('/adminGames',control.createGames)
router.patch('/adminGame/:id',control.updateGame)
router.delete('/adminGame/:id',control.deleteGame)

router.get('/games',control.getGames)
router.get('/game/:id',control.getGame)

router.get('*', function(req,res){
	res.send({
		error:'Invalid route'
	})
})


module.exports = router

