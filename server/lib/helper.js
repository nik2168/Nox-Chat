const { userSocketIds } = require("../app")


const getSockets = (users) => {
    console.log(users)
    const sockets = users.map((user) => userSocketIds.get(user._id.toString()))
    return sockets
}

module.exports = {getSockets}