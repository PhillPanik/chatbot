// Import Dependencies

// Import Modules
const winston = require('../config/winston.config')

/**
 * @module IndexController
 * @description Index Controller
 */

/**
 * @function index_get
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @description Controller for /(Index)
 * @returns {void}
 */
module.exports.index_get = (req, res) => {
  res.status(200).render('index', {
    title: 'ChatBot'
  }, (err, html) => {
    if (!err) {
      res.send(html)
    } else {
      console.log(err)
    }
  })
}
