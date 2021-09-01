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
  Users.findById(id)
    .then(possibleUser => {
      if (possibleUser) {
        req.user = possibleUser
        next()
      } else {
        next({ message: 'user not found', status: 404 })
      }
    })
    .catch(next)
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}