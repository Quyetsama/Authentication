const userRouter = require('./user')
const deckRouter = require('./deck')
const uploadRouter = require('./upload')



function route(app){
    app.use('/user', userRouter)
    app.use('/deck', deckRouter)
    app.use('/upload', uploadRouter)



    
    app.get('/', (req, res, next) => {
        return res.status(200).json({
            message: 'Server is Ok!'
        })
    })
}

module.exports = route