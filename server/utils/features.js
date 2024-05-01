const jwt = require('jsonwebtoken')

const cookieObj = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: 'none',
    httpOnly: true,
    secure: true,
}


const sendToken = (res, user, code, message) => {
 
const token = jwt.sign({userid: user.userid}, process.env.secret, {expiresIn: 15 * 24 * 60 * 60 * 1000})

res.status(code).cookie('nox_token', token, cookieObj).send({success: true, message, user})

}

const emitEvent = (req, event, users, data) => {
    console.log('Event emitting', event)
    return ;
}

module.exports = {sendToken, emitEvent}