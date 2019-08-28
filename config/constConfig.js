'use strict'
// Defaults

const defKeys = {
  privateKey: 'keys/localhost.key',
  certificate: 'keys/localhost.crt'
}
const defPorts = {
  http: 80,
  https: 443,
  secure: false // true = https, flase = http
}
const defTokens = {
  csurf: '_csurf',
  jwt: '_jwt',
  expiresIn: 3600 // (s) JWT expires in 60min
}
const defTypeScript = {
  target: 'esnext',
  module: 'commonjs',
  removeComments: false,
  noImplicitAny: true
}
const defWinston = {
  label: 'iChatBot'
}

module.exports = {
  defKeys,
  defPorts,
  defTokens,
  defTypeScript,
  defWinston
}
