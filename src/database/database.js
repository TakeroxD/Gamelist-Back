const mongoose = require('mongoose')

var connectionURL = process.env.DATABASE_URL || require('../config.js').connectionUrl

mongoose.connect(connectionURL,{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedtopology: true
}).then(function(){
	console.log("Connected to DB successful")
}).catch(function(error){
	console.log(error)
})