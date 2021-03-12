const { Todo } = require('../models/index');
const { verifyToken } = require('../helpers/jwt');

class TodoController {
  static createTodo(req, res, next) {
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: false,
      due_date: req.body.due_date,
      user_id: req.decoded.id
    }

    Todo.create(newTodo)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(next);
  }

  static listTodo(req, res, next) {
    Todo.findAll({
      where: { user_id: req.decoded.id },
      order: [
        ['due_date', 'ASC'],
        ['title', 'ASC']
      ]
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next)
  }

  static getTodoId(req, res, next) {
    const { id } = req.params;

    Todo.findOne({ where: { id } })
      .then(data => {
        if (data) res.status(200).json(data);
        else {
          next({
            code: 404,
            message: 'Not Found'
          })
        }
      })
      .catch(next)
  }

  static editTodo(req, res, next) {
    const { id } = req.params;
    const editTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.update(editTodo, { where: { id } })
      .then(data => {
        return Todo.findOne({ where: { id } });
      })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next)
  }

  static updateStatus(req, res, next) {
    const { id } = req.params;
    const newStatus = {
      status: req.body.status
    }

    Todo.update(newStatus, { where: { id } })
      .then(data => {
        return Todo.findOne({ where: { id } });
      })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next)
  }

  static deleteTodo(req, res, next) {
    const { id } = req.params;

    Todo.destroy({ where: { id } })
      .then(data => {
        res.status(200).json({ message: 'todo success to delete' })
      })
      .catch(next)
  }
}

module.exports = TodoController;