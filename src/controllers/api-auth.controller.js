const { Router } = require('express');
const { Op } = require('sequelize');
const ErrorResponse = require('../classes/error-response');
const User = require('../dataBase/models/User.model');
const Token = require('../dataBase/models/Token.model');
const { asyncHandler } = require('../middlewares/middlewares');

const router = Router();
const { nanoid } = require('nanoid')

function initRoutes() {
    router.post('/login', asyncHandler(loginUser));
    router.post('/registration', asyncHandler(regUser));
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


async function loginUser(req, res, next) {
    const fUser = await User.findOne({
        where:
        {
            login: req.body.login,
            password: req.body.password
        }
    })
    if (!fUser) {
        throw new ErrorResponse("User is not found", 404)
    }

    const fTokens = await Token.findAll({
        where:
        {
            userId: fUser.id
        }
    })
    if (fTokens.length != 0)
    {
        dlt = await Token.destroy({
            where: 
            {
                userId: fUser.id
            },
        });
    }
    const token = await Token.create({ userId: fUser.id, value: nanoid(128)})
    res.status(200).json({accessToken: token.value});
    
}

async function regUser(req, res, next) {
    const fUser = await User.findOne({
        where:
        {
            [Op.or]: [
                { email: req.body.email },
                { login: req.body.login }
            ]
        }
    })


    if (fUser || !validateEmail(req.body.email)) {
        throw new ErrorResponse("User is alreay exists or mail is broken", 400)
    }

    const usr = await User.create(req.body)
    res.status(200).json(usr);

}

initRoutes();
module.exports = router;