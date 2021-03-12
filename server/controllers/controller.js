class Controller {
  static getRootHandler(req, res, next) {
    res.status(200).json({ message: "Welcome to Diardo's Todo" })
  }
}

module.exports = Controller;