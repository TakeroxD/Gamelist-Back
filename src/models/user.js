const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

//
//USER SCHEMA
//

const userSchema = mongoose.Schema({
	//REQUIRED
	username : {type:String, required:true, unique:true},
	email : {type:String, required:true, unique:true,
			validate(value){
				if(!validator.isEmail(value)){
					throw new Error ('Email inválido')
				}
			}
	},
	password: {type:String,required:true,trim:true,minlength:7}
	//OPTIONAL FOR ID
	about : {type:String},
	sex : {type:String},
	location : {type:String},
	//USEFUL INFO
	favconsole : {type:String},
	toplay : {type:String},
	played : {type:String},
	//SOCIAL NETWORKS
	steamid: {type:String},
	xboxid: {type:String},
	playstationid: {type:String},
	nintendoid: {type:String},
	epicid: {type:String},
	discordid: {type:String},
	twitchid: {type:String},
	mixerid: {type:String},
	youtubeid: {type:String},
	twitterid: {type:String},
	instagramid: {type:String},
	//TOKENS
	tokens:[{
		token:{type:String,required:true}
	}],
	privilege:{type:String}

})

userSchema.statics.findByCredentials = function(userormail,password){
	return new Promise(function(resolce,reject){
		User.findOne({userormail}).then(function(user){
			if(!user){
				reject('User does not exist')
			}
			bcryptjs.compare(password, user.password).then(function(match){
				if(match){
					resolve(user)
				}
				reject('Wrong user or password')
			}).catch(function(error){
				reject('Error compare')
			})
		})
	})
}

userSchema.pre('save',function(next){
	const user = this
	if(user.isModified('password')){
		bcryptjs.hash(user.password,8).then(function(hash){
			user.password=hash
			next()
		}).catch(function(error){
			return next(error)
		})
	} else {
		nest()
	}
})

userSchema.methods.generateToken = function(){
	const user = this
	const token = jwt.sign({_id:username,_id.toString()},'thisIsFuckingSecret',{expiresIn: '30 days'})
	user.tokens = user.tokens.concat({token})
	user.save().then(function(user){
		return token
	}).catch(function(error){
		return error
	})
}


const User = mongoose.model('User',userSchema)

module.exports = User