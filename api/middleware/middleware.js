const Users = require('../users/users-model')
const Posts = require('../posts/posts-model')

function logger(req, res, next) {
  console.log(`Request Method: ${req.method}`)
  console.log(`Request URL: ${req.url}`)
  console.log(`Timestamp: ${Date.now()}`)
  next()
}

function validateUserId(req, res, next) {
  const { id } = req.params
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        next({
          status: 404,
          message: 'user not found' 
        })
      }
    })
    .catch(next)
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
  // DO YOUR MAGIC
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}