// Import Dependencies
const router = require('express').Router()

// Import Routes
const v1ApiController = require('./api/v1')

// Routing for /Api
router.use('/v1', v1ApiController)
// router.use('/v2', v2ApiController);

module.exports = router
