// Import Dependencies
const router = require('express').Router()

// Import Controllers
const v1api = require('../../v1ApiController.js')

// Routing for /Api/v1
router.route('/')
  .get(v1api.index_get)

router.route('/chatbot/:text')
  .get(v1api.chatbot)

router.route('/reset')
  .get(v1api.reset)

module.exports = router