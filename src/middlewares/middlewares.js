const ErrorResponse = require("../classes/error-response");
const ToDo = require('../dataBase/models/ToDo.model');
const Token = require('../dataBase/models/Token.model');

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
    try {
        fn(req, res, next);
    } catch (error) {
        next(error);
    }
};

const requireToken = (fn) => async (req, res, next) => {
    // if token is in request body
    const token = req.body.token
    if (!token)
    {
        res.status(400).json({
            message: "Token is not found in req body"
        }); 
    }

    // if DB contains such token 
    const fToken = await Token.findOne({
        where:
        {
            value: req.body.token
        }
    })
    if(!fToken) {
        res.status(404).json({
            message: "Token is not found in DB"
        });
    }
    // check if token is valid (time)
    if (parseInt(new Date(new Date().toLocaleString("en-US")) - new Date(String(fToken.createdAt))) > 60000)
    {
        await fToken.destroy();
        res.status(401).json({
            message: "Token is expired" 
        });
    }

    // const a = new Date()
    // console.log("LOL1 = " + a)
    // console.log(new Date().toLocaleString())

    // const b = 
    // console.log("LOL2 = " + b)
    // console.log(String(fToken.createdAt))

    // console.log(a-b)

    req.fToken = fToken
    fn(req, res, next)
};

const notFound = (req, _res, next) => {
    next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, _req, res, _next) => {
    console.log('Ошибка', {
        message: err.message,
        stack: err.stack,
    });
    res.status(err.code || 500).json({
        message: err.message
    });
};

module.exports = {
    asyncHandler,
    syncHandler,
    notFound,
    errorHandler,
    requireToken,
};