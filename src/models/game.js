const mongoose = require('mongoose')

//
//GAME SCHEMA
//

const gameSchema = mongoose.Schema({
	name : {type:String},
	image : {type:String},
	releasedate : {type:String},
	rating : {type:String},
	plot : {type:String},
	reviews : [{review:{type:String}}]
})

const Game = mongoose.model('Game',gameSchema)

module.exports = Game