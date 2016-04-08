require('dotenv').load()
const Promise = require('bluebird')
const request = require('request')

/**
 * Gets the last article in the entries specified in env vars
 * @return {Promise}
 * @return.text {String}
 */
function fetchContent () {
  var _fetchUrl = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE}` +
    `/entries?access_token=${process.env.ACCESS_TOKEN}&limit=1&order=-sys.createdAt`
  return new Promise((resolve, reject) => {
    request(_fetchUrl, (err, response, body) => {
      if (err) reject(err)
      body = JSON.parse(body)

      // Check if latest post is < 11 hours old
      if (new Date() - new Date(body.items[0].sys.createdAt) > 40000000) {
        reject(new Error('no recent summary found.'))
      }

      resolve({
        text: body.items[0].fields.text
      })
    })
  })
}

/**
 * Takes a payload hash and posts to slack
 * @params {Object} data
 * @params.text {String}
 * @return {Promise}
 */
function postToSlack (data) {
  var _params = {
    url: process.env.WEBHOOK,
    form: JSON.stringify(data),
    mrkdwn: true
  }
  return new Promise((resolve, reject) => {
    request.post(_params, (err, httpResponse, body) => {
      console.log(body)
      if (err) { reject(err) } else { resolve(data) }
    })
  })
}

fetchContent()
  .then((dat) => {
    if (dat) { return postToSlack(dat) }
  })
  .catch((err) => {
    console.log(err)
  })
