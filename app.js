const express = require('express')
const logger = require('morgan')
const route= require('./routes')
const bodyParser = require('body-parser')
const secureApp = require("helmet")
require('dotenv').config()


const db = require("./db");


const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(secureApp())


db.connect()

route(app)

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500
    console.log(err)
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})


const port = app.get('port') || 3000
app.listen(port, () => console.log(`Server is listening on port ${port}`))