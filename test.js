const JWT = require('jsonwebtoken')

const token = JWT.sign({
        iss: 'quyetsama',
        sub: '6145c4658982bf6c8ec9b138',
        iat: new Date().getTime(),
        exp: new Date().getDate(new Date().getDate() + 3)
    }, 'gfdodfvnbdfhjvbjchdcnbvhdjskmcvjvbskdvjcbvksbvjkbcxnvbjbfvjcxbvnxcbvn')

console.log(token)