const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://admin:admin@clustertaco-socc1.mongodb.net/mygamelistwa?retryWrites=true&w=majority'

mongoose.connect(connectionURL,{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedtopology: true
}).then(function(data){
	console.log(data)
}).catch(function(error){
	console.log(error)
})