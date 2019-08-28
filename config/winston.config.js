// Import Dependencies
const path = require('path')
const winston = require('winston')
const {
  combine,
  timestamp,
  label,
  json
} = winston.format

// Import Modules
const {
  winston: winsConf
} = require('./activeConfig')

/*
 *   Options: Define the custom settings for each transport (file, console)
 *   0: error, 1: warn, 2: info, 3: verbose, 4: debug, 5: silly
 *   combine() - The combine Format allows to combine multiple formats
 *   json() - The json format uses 'fast-safe-stringify' to finalize the message
 */
const options = {
  error: {
    level: 'error',
    filename: path.join('docs', 'logs', 'error.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 3,
    colorize: true
  },
  warn: {
    level: 'warn',
    filename: path.join('docs', 'logs', 'warn.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 3,
    colorize: true
  },
  info: {
    level: 'info',
    filename: path.join('docs', 'logs', 'info.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 7,
    colorize: true
  },
  debug: {
    level: 'debug',
    timestamp: true,
    filename: path.join('docs', 'logs', 'debug.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 3,
    colorize: true
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.simple(), // disable json format
    json: false,
    colorize: true
  }
}

/*
 * Instantiate a new Winston Logger
 * @format - [Sun, 07 Apr 2019 05:25:41 GMT]
 */
const logger = winston.createLogger({
  format: combine(
    label({
      label: winsConf.label
    }),
    timestamp({
      format: 'DD MMM YYYY HH:mm:ss'
    }),
    json()
  ),
  transports: [
    new winston.transports.File(options.error),
    new winston.transports.File(options.warn),
    new winston.transports.File(options.info),
    new winston.transports.File(options.debug),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
})

/*
 * Create a stream object with a 'write' function that will be used by 'morgan'
 */
logger.stream = {
  write: (message) => {
    logger.info(message) // use the 'info' log level so the output will be picked up by both transports (file and console)
  }
}

module.exports = logger
