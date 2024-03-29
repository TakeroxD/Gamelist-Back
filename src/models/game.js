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
	reviews : [{review:{type:String}}],
	consoles : [{console:{type:String}}]
})

gameSchema.methods.addReview = function(data) {
  console.log(data)
  const game = this
  game.reviews = game.reviews.concat({"review":data})
  return new Promise(function( resolve, reject) {
    game.save().then(function(user){
      return resolve(game)
    }).catch(function(error) {
      return reject(error)
    })
  })
}

const Game = mongoose.model('Game',gameSchema)

module.exports = Game