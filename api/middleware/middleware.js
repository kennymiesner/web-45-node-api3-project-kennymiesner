const Users = require('../users/users-model')

function logger(req, res, next) {
  console.log(`Request Method: ${req.method}`)
  console.log(`Request URL: ${req.url}`)
  console.log(`Timestamp: ${Date.now()}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id)
    if (!user) {
      res.status(404).json({
        message: 'user not found'
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: 'problem finding user'
    })
  }
}

function validateUser(req, res, next) {
  if (
    !req.body.name ||
    typeof req.body.name !== 'string' ||
    !req.body.name.trim() ||
    req.body.name.length < 3
  ) {
    next({
      status: 400,
      message: 'missing required name field'
    })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if (
    !req.body.text ||
    typeof req.body.text !== 'string' ||
    req.body.text.length < 0
  ) {
    next({
      status: 400,
      message: 'missing required text field'
    })
  } else {
    next()
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}