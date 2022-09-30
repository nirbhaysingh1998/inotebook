const connecToMongo = require('./db');
var cors = require('cors')



const express = require('express')
connecToMongo();

var app = express()
const port = 5000
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app http://localhost/ ${port}`)
})