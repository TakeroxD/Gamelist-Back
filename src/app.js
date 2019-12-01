require('./database/database.js')
const express = require('express')
const app = express()
const router = require('./routes.js')
var cors = require('cors')

const port=process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(port,function(){
	console.log('Server UP UP UP baby! ... on port ',port)
})