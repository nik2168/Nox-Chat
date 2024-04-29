
const isAuthenticate = async (req, res, next) => {
console.log(req.cookie);
next()
}

module.exports = {isAuthenticate}