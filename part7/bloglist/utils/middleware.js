const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, config.SECRET)
    req.user = await User.findById(decodedToken.id)
  }
  next()
}

module.exports = { tokenExtractor, userExtractor }