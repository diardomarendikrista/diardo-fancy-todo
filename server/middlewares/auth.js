const { verifyToken } = require('../helpers/jwt');
const { User, Todo } = require('../models');

const authenticate = (req, res, next) => {
  try {
    const decoded = verifyToken(req.headers.token);
    User.findOne({ where: { email: decoded.email } })
      .then(data => {
        req.decoded = {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name
        }
        next();
      })
      .catch(next)
  }
  catch (err) {
    next(err)
  }
}

const authorize = (req, res, next) => {
  const { id } = req.params;

  Todo.findOne({ where: { id } })
    .then(data => {
      if (data) {
        if (data.user_id == req.decoded.id) next();
        else {
          next({
            code: 401,
            message: 'Unauthorize access'
          })
        }
      } else {
        next({
          code: 404,
          message: 'Not Found'
        })
      }
    })
    .catch(next)
}

module.exports = {
  authenticate,
  authorize
}