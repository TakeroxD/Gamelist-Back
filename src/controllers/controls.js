const User = require('../models/user.js')
const Game = require('../models/game.js')

//USERS

const login = function(req, res) {
  User.findByCredentials(req.body.username, req.body.password).then(function(user){
    user.generateToken().then(function(token){
      return res.send({user, token})
    }).catch(function(error){
      return res.status(401).send({ error: error })
    })
  }).catch(function(error) {
    return res.status(401).send({ error: error })
  })
}

const logout = function(req, res) {
  req.user.tokens = req.user.tokens.filter(function(token) {
    return token.token !== req.token
  })
  req.user.save().then(function() {
    return res.send()
  }).catch(function(error) {
    return res.status(500).send({ error: error } )
  })
}

const getUsers = function(req,res){
	User.find({}).then(function(user){
		return res.send(user)
	}).catch(function(error){
		return res.status(402).send(error)
	})
}

const getUser = function(req,res){
	_id = req.params.id
	User.findById(_id).then(function(user){
		return res.send(user)
	}).catch(function(error){
		return res.status(403).send(error)
	})
}

const createUser = function(req,res){
	const user = new User(req.body)
	user.save().then(function(){
		return res.send(user)
	}).catch(function(error){
		return res.status(405).send(error)
	})
}

const updateUser = function(req,res){
	const _id = req.params.id
	const updates = Object.keys(req.body)
	const allowedUpdates =  [
								'username',
								'email',
								'password',
								'about',
								'sex',
								'location',
								'favconsole',
								'toplay',
								'played',
								'steamid',
								'xboxid',
								'playstationid',
								'nintendoid',
								'epicid',
								'discordid',
								'twitchid',
								'mixerid',
								'youtubeid',
								'twitterid',
								'instagramid',
								'facebookid'
							]
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
	if(!isValidUpdate){
		return res.send({
			error: 'Invalid update, only allowed to update: ' + allowedUpdates
		})
	}
	User.findByIdAndUpdate(_id,req.body).then(function(user){
		if(!user){
			return res.status(406).send({error:'Unknown update error'})
		}
		return res.send(user)
	}).catch(function(error){
		return res.status(406).send(error)
	})
}

const deleteUser = function(req,res){
	const _id = req.params.id
	User.findByIdAndDelete(_id).then(function(user){
		if(!user){
			return res.status(406).send({error:'Unknown delete error'})
		}
		return res.send(user)
	}).catch(function(error){
		return res.status(406).send(error)
	})
}


//GAMES


const getGames = function(req,res){
	Game.find({}).then(function(games){
		return res.send(games)
	}).catch(function(error){
		return res.status(402).send(error)
	})
}

const getGame = function(req,res){
	_id = req.params.id
	Game.findById(_id).then(function(game){
		return res.send(game)
	}).catch(function(error){
		return res.status(403).send(error)
	})
}

const createGame = function(req,res){
	const game = new Game(req.body)
	game.save().then(function(){
		return res.send('Juego creado' + game)
	}).catch(function(error){
		return res.status(405).send(error)
	})
}

const updateGame = function(req,res){
	const _id = req.params.id
	const updates = Object.keys(req.body)
	const allowedUpdates =  [
								'image',
								'rating',
								'reviews'
							]
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
	if(!isValidUpdate){
		return res.send({
			error: 'Invalid update, only allowed to update reviews'
		})
	}
	Game.findByIdAndUpdate(_id).then(function(game){
		if(!game){
			return res.status(406).send({error:'Unknown update error'})
		}
		return res.send(game)
	}).catch(function(error){
		return res.status(406).send(error)
	})
}

const deleteGame = function(req,res){
	const _id = req.params.id
	Game.findByIdAndDelete(_id).then(function(game){
		if(!game){
			return res.status(406).send({error:'Unknown delete error'})
		}
		return res.send(game)
	}).catch(function(error){
		return res.status(406).send(error)
	})
}



//EXPORT

module.exports={
	login,
	logout,
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
	getGames,
	getGame,
	createGame,
	updateGame,
	deleteGame
}                                               