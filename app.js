const express = require('express')
const bodyParser = require('body-parser')
const hellobot = require('./hellobot')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))

app.post('/hello', hellobot)

// Error handler
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(400).send(err.message)
})

app.listen(port, () => {

})
