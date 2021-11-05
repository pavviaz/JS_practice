const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model');
const Token = require('../dataBase/models/Token.model');
const User = require('../dataBase/models/User.model');
const { asyncHandler, requireToken } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.get('/', asyncHandler(getToDos));
    router.get('/:id', asyncHandler(getToDoById));
    router.post('/', asyncHandler(requireToken(createToDo)));
    router.delete('/', asyncHandler(requireToken(deleteToDos)));
    router.delete('/:id', asyncHandler(deleteToDoById));
    router.patch('/:id', asyncHandler(updateToDoById))
}
async function findUserByToken(token) {
    const fUser = await User.findOne({
        where:
        {
            id: token.userId
        }
    })
    if (!fUser)
    {
        throw new ErrorResponse('User not found by Id', 404);
    }
    return fUser
}

async function getToDos(req, res, next) {
    // const user = req.fUser

    const todos = await ToDo.findAll({
        where:
        {
            userId: user.id
        }
    });

    res.status(200).json({ todos });
}

async function getToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id);

    if (!todo) {
        throw new ErrorResponse("ToDo is not found by id", 404);
    }

    res.status(200).json(todo);
}

async function createToDo(req, res, next) {
    const user = await findUserByToken(req.fToken)
    
    req.body.userId = user.id
    const todo = await ToDo.create(req.body);

    res.status(200).json(todo);
}

async function deleteToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id);

    if (!todo) {
        throw new ErrorResponse('Delete failed', 404);
    }

    await todo.destroy();

    res.status(200).json(todo);
}

async function deleteToDos(req, res, next) {
    const user = await findUserByToken(req.fToken)

    dlt = await ToDo.destroy({
        where: 
        {
            userId: user.id
        },
        truncate: true
    });

    res.status(200).json({message: dlt + " ToDos for user [" + user.name + "] have been sucessfully deleted"});
}

async function updateToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id)

    if (!todo) {
        throw new ErrorResponse('Cant find todo by id', 404);
    }

    await todo.update(req.body)
    // await ToDo.update(req.body, {where: {id: req.params.id}})

    res.status(200).json(todo);
}

initRoutes();

module.exports = router;