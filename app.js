// Import Dependencies
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const csrf = require('csurf')
const express = require('express')
const favicon = require('express-favicon')
const session = require('express-session')
const helmet = require('helmet')
const http = require('http')
const morgan = require('morgan')
const path = require('path')

// Import Modules
const {
  ports
} = require('./config/activeConfig')
const winston = require('./config/winston.config')

// Import Routes
const apiRoute = require('./controllers/routes/api')
const indexRoute = require('./controllers/routes/index')

// StartServer Function
let startServer = async () => {
  return new Promise((resolve, reject) => {
    // Start Express App
    const app = express()

    // Configure Helmet
    app.use(helmet())

    // Configure Morgan Data Loger
    app.use(morgan(':remote-addr - ":method :url" :status - :res[content-length] ":referrer" ":user-agent"', {
      stream: winston.stream
    }))

    // Configure Static Paths
    app.use(express.static(path.join(__dirname, 'public')))

    // Configure Favicon
    app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.png')))

    // Configure View Engine ()
    app.set('view engine', 'pug')
    app.set('views', path.join(__dirname, 'views'))

    // Configure BodyParser
    app.use(bodyParser.urlencoded({
      extended: false
    }))
    app.use(bodyParser.json())

    // Configure CookieParser
    app.use(cookieParser())

    // Configure Sessions
    app.use(session({
      secret: "SeCrEtPaSsW0rD", //process.env.SessionSecret,
      name: 'sessionID',
      saveUninitialized: true,
      resave: false,
      cookie: {
        //expires: 300000, // 5 minutes test
        expires: 86400000, // 24 hours
      }
    }));

    // Routes
    app.use('/', indexRoute)
    app.use('/api', apiRoute)

    // Configure CSRF
    app.use(csrf({
      cookie: {
        httpOnly: true
      }
    }))

    // Routes (With CSRF Protection)

    // Error Handler
    app.use((req, res, next) => {
      next(createError(404))
    })
    app.use((err, req, res, next) => {
      // Log Error to File
      winston.error(`${req.ip} - "${req.method} ${req.originalUrl}" ${err.status || 500} - ${err.message}`)

      // Render Error to Browser
      res.status(err.status || 500)
      res.render('error', {
        title: err.status,
        error: err.status,
        message: err.message
      }, (err, html) => {
        if (!err) {
          res.send(html)
        } else {
          winston.error(`app.js/app.use():res.render('error'): ${err}`)
          res.json({
            error: err.status,
            message: err.message
          })
        }
      })
      next()
    })
    resolve(app)
  })
}

// Start the Server
startServer()
  .then((app) => {
    if (app) {
      winston.info(`[Express Loaded..!`)
      http.createServer(app).listen(ports.http, () => {
        winston.info(`[HTTPS Server Running..! (Port: ${ports.http})`)
      })
    }
  })
  .catch((err) => {
    winston.error(`app.js/startServer(): ${err}`)
  })