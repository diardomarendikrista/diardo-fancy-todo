const router = require('express').Router();
const Controller = require('../controllers/controller')
const TodoController = require('../controllers/todoController');
const UserController = require('../controllers/userController');
const AxiosController = require('../controllers/axiosController');

const { authorize, authenticate } = require('../middlewares/auth');

//Root
router.get('/', Controller.getRootHandler);

//User
router.post('/register', UserController.register);
router.post('/login', UserController.login);
//google login
router.post('/loginGoogle', UserController.loginGoogle);

//Todos
router.use(authenticate);
router.post('/todos', TodoController.createTodo);
router.get('/todos', TodoController.listTodo);

//3rd party
router.get('/quotes', AxiosController.quotes);

//require authorize
router.use('/todos/:id', authorize)
router.get('/todos/:id', TodoController.getTodoId);
router.put('/todos/:id', TodoController.editTodo);
router.patch('/todos/:id', TodoController.updateStatus);
router.delete('/todos/:id', TodoController.deleteTodo);

module.exports = router;