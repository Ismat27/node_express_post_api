const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError, APIError} = require('../errors')

const register = async (req, res) => {
    const {username, email, password} = req.body
    if (!email || !password || !username) {
        throw new BadRequestError('provide password and email')
    }
    const user = await User.findOne({email})
    if (user) {
       throw new APIError('email has been used', StatusCodes.CONFLICT)
    }
    const newUser = await User.create({email, password, username})
    res.status(StatusCodes.CREATED).json({token: newUser.createJWT()})
}

const login = async (req, res) => {
    const {
        email, password
    } = req.body

    if (!email || !password) {
        throw new BadRequestError('provide password and email')
    }

    const user = await User.findOne({email})

    if (!user) {
       throw new NotFoundError('user does not exist')
    }
    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) {
       throw new BadRequestError('incorrect password or email')
    }
    const token = user.createJWT()

    res.status(200).json({token})
}


module.exports = {
    register,
    login,
}