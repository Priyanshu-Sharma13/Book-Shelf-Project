const customError = require(`../errors`);
const User = require(`../models/User`);
const {StatusCodes} = require(`http-status-codes`);
const {attachCookiesToResponse, createTokenUser} = require(`../utils`);

const register = async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        throw new customError.BadRequestError(`Please provide all the credentials`);
    }
    const user = await User.create({name, email, password});
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({res, user: tokenUser});
    res.status(StatusCodes.CREATED).json({user: tokenUser});
}

const login = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        throw new customError.BadRequestError(`Please provide all the credentials`);
    }
    const user = await User.findOne({email});
    if(!user) {
        throw new customError.UnauthenticatedError(`No user regestered with email: ${email}`);
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new customError.UnauthenticatedError(`Wrong password`);
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({res,user : tokenUser});

    res.status(StatusCodes.OK).json({user: tokenUser});
}

const logout = async(req, res) => {
    res.cookie(`token`, 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({msg: 'user logged out'});
}

module.exports = {
    register,
    login,
    logout,
};