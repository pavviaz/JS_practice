const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model');
const { asyncHandler } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.get('/', asyncHandler(getToDos));
    router.get('/:id', asyncHandler(getToDoById));
    router.post('/', asyncHandler(createToDo));
    router.delete('/', asyncHandler(deleteToDos));
    router.delete('/:id', asyncHandler(deleteToDoById));
    router.patch('/:id', asyncHandler(updateToDoById))
}

async function getToDos(req, res, next) {
    const todos = await ToDo.findAll();

    res.status(200).json({ todos });
}

async function getToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id);

    if (!todo) {
        throw new ErrorResponse("ToDo is not found by id", 404);
    }

    res.status(200).json(todo);
}

async function createToDo(req, res, next){
    const todo = await ToDo.create(req.body);

    res.status(200).json(todo);
}

async function deleteToDoById(req, res, next){
    const todo = await ToDo.findByPk(req.params.id);

    if (!todo){
        throw new ErrorResponse('Delete failed', 404);
    }
    
    await todo.destroy();

    res.status(200).json(todo);
}

async function deleteToDos(req, res, next){
    await ToDo.destroy({
        truncate: true
    });

    res.status(200);
}

async function updateToDoById(req, res, next){
    const todo = await ToDo.findByPk(req.params.id)

    if (!todo){
        throw new ErrorResponse('Cant find todo by id', 404);
    }

    await todo.update(req.body)
    // await ToDo.update(req.body, {where: {id: req.params.id}})

    res.status(200).json(todo);
}

initRoutes();

module.exports = router;