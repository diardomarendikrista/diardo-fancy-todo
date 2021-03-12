
function errorHandler(err, req, res, next) {
  if (err.name === 'SequelizeValidationError') {
    res.status(400).json({
      code: 400,
      message: err.message.split('\n').join(' ').split("Validation error: ")
    });
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    if (err.errors[0].message == 'email must be unique') {
      res.status(400).json({
        code: 400,
        message: 'Email already registered'
      });
    } else {
      res.status(400).json({
        code: 400,
        message: err.errors[0].message
      });
    }
  } else if (err.name == "JsonWebTokenError") {
    res.status(401).json({
        code: 401,
        message: 'Invalid token.'
    })
  } else if (err.code == 400) {
    res.status(err.code).json({
      code: err.code,
      message: err.message
    });
  } else if (err.code == 401) {
    res.status(err.code).json({
      code: err.code,
      message: err.message
    });
  } else if (err.code == 404) {
    res.status(err.code).json({
      code: err.code,
      message: err.message
    });
  } else if (err.code == 500) {
    res.status(err.code).json({
      code: err.code,
      message: err.message
    });
  } else {
    res.status(500).json({
      code: 500,
      message: err.message,
      isHandled: false,
      detail: err
    });
  }
}

module.exports = errorHandler;