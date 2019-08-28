// Import Dependencies
const router = require('express').Router()

// Import Controllers
const index = require('../indexController.js')

// Routing for /(Index)
router.route('/')
  .get(index.index_get)

module.exports = router
