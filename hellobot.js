const request = require('request')

function sayHello () {
  var formData = {
    text: 'hello'
  }
  formData = JSON.stringify(formData)
  request.post({url: process.env.WEBHOOK, form: formData}, (err, httpResponse, body) => {
    if (err) console.log(err)
    })
  }
  sayHello()
