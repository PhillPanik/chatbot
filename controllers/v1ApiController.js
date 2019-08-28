// Import Dependencies
let fetch = require('node-fetch');

// Import Modules
let chatbot = require('./functions/chatbot')
let winston = require('../config/winston.config')

/**
 * @module ApiController
 * @description Api Controller
 */

/**
 * @function index_get
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @description Controller for /Api/v1
 * @returns {void}
 */
module.exports.index_get = (req, res) => {
  res.status(200).json({
    message: 'Hi, I am the API'
  })
}

/**
 * @function chatbot
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @description Controller for /Api/v1/chatbot
 * @returns {void}
 */
module.exports.chatbot = (req, res) => {
  console.log(req.session)

  chatbot(req.params.text)
    .then((result) => {
      if (result === "#JOKE") {
        // Check if joke limit reached
        if (req.session.jokes && req.session.jokes >= 10) {
          chatbot("nojoke")
            .then((result) => {
              res.status(200).json({
                result
              })
            })
        } else {
          fetch('http://api.icndb.com/jokes/random?exclude=[explicit]')
            .then(res => {
              if (res.ok) {
                // Add 1 to joke count
                if (req.session.jokes) {
                  req.session.jokes++
                } else {
                  req.session.jokes = 1
                }
                return res;
              } else {
                console.error(res)
                res.value.joke = "???"
                return res;
              }
            })
            .then(res => res.json())
            .then(json => {
              res.status(200).json({
                result: json.value.joke
              })
            })
            .catch(err => console.error(err))
        }
      } else {
        res.status(200).json({
          result
        })
      }
    })
    .catch((err) => {
      winston.error(`api.js/get('/chatbot'):chatbot(): ${err}`)
      res.status(500).json({
        err
      })
    })
}

/**
 * @function reset
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @description Controller for /Api/v1/reset
 * @returns {void}
 */
module.exports.reset = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(200).json({
        result: "Sorry, I can not do that..!"
      })
    } else {
      res.status(200).json({
        result: "Ok, I did it..!"
      })
    }
  })
}