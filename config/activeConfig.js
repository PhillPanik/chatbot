'use strict'
// Import Modules
const {
  defKeys,
  defPorts,
  defTokens,
  defTypeScript,
  defWinston
} = require('./constConfig')
// const winston = require('./winston.config')

let activeConfig = (() => {
  const _defKeys = {
    ...defKeys
  }
  const _defPorts = {
    ...defPorts
  }
  const _defTokens = {
    ...defTokens
  }
  const _defTypeScript = {
    ...defTypeScript
  }
  const _defWinston = {
    ...defWinston
  }
  let _myKeys = {
    ..._defKeys
  }
  let _myPorts = {
    ..._defPorts
  }
  let _myTokens = {
    ..._defTokens
  }
  let _myTypeScript = {
    ..._defTypeScript
  }
  let _myWinston = {
    ..._defWinston
  }

  let _log = (input) => {
    // winston.info(`activeConfig.js/_log(): ${input}`)
  }

  let _resetConfig = () => {
    _myKeys = {
      ..._defKeys
    }
    _myPorts = {
      ..._defPorts
    }
    _myTokens = {
      ..._defTokens
    }
    _myTypeScript = {
      ..._defTypeScript
    }
    _myWinston = {
      ..._defWinston
    }
    return activeConfig
  }

  // TODO: turn these all into a single function..!
  let _setKeys = (value) => {
    if (value) {
      Object.keys(value).forEach((key) => {
        if (typeof _myKeys[key] !== 'undefined') {
          _myKeys[key] = value[key]
        } else {
          _log('No such key: ' + key)
        }
      })
    } else {
      _log('No value')
    }
    return activeConfig
  }

  let _setPorts = (value) => {
    if (value) {
      Object.keys(value).forEach((key) => {
        if (typeof _myPorts[key] !== 'undefined') {
          _myPorts[key] = value[key]
        } else {
          _log('No such key: ' + key)
        }
      })
    } else {
      _log('No value')
    }
    return activeConfig
  }

  let _setTokens = (value) => {
    if (value) {
      Object.keys(value).forEach((key) => {
        if (typeof _myTokens[key] !== 'undefined') {
          _myTokens[key] = value[key]
        } else {
          _log('No such key: ' + key)
        }
      })
    } else {
      _log('No value')
    }
    return activeConfig
  }

  let _setWinston = (value) => {
    if (value) {
      Object.keys(value).forEach((key) => {
        if (typeof _myWinston[key] !== 'undefined') {
          _myWinston[key] = value[key]
        } else {
          _log('No such key: ' + key)
        }
      })
    } else {
      _log('No value')
    }
    return activeConfig
  }

  let _updateConfig = () => {
    _log('CONF: updateConfig()')
    // Use this function to download config information from an external source.
    return activeConfig
  }

  return {
    resetConfig: _resetConfig,
    setKeys: _setKeys,
    setPorts: _setPorts,
    setTokens: _setTokens,
    setWinston: _setWinston,
    updateConfig: _updateConfig,
    get config() {
      return {
        keys: _myKeys,
        ports: _myPorts,
        tokens: _myTokens,
        typeScript: _myTypeScript,
        winston: _myWinston
      }
    },
    get instance() {
      return activeConfig
    },
    get keys() {
      return _myKeys
    },
    get ports() {
      return _myPorts
    },
    get tokens() {
      return _myTokens
    },
    get winston() {
      return _myWinston
    },
    get typeScript() {
      return _myTypeScript
    },
    set keys(value) {
      return _setKeys(value)
    },
    set ports(value) {
      return _setPorts(value)
    },
    set tokens(value) {
      return _setTokens(value)
    },
    set winston(value) {
      return _setWinston(value)
    }
  }
})()
module.exports = activeConfig
