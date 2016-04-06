const webhook = require('dotenv').config().WEBHOOK
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))

// Error handler
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(400).send(err.message)
})

/**
 * Wrapper for posting a reply as the bot
 * e.g. `curl -X POST -d 'text=example text' "{HOST}/reply"`
 */
app.post('/reply', (req, res) => {
  var formData = {
    text: req.body.text
  }
  formData = JSON.stringify(formData)
  request.post({url: webhook, form: formData}, (err, httpResponse, body) => {
    if (err) console.log(err)
    res.send(httpResponse)
  })
})

app.listen(port)
