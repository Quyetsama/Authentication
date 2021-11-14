const userRouter = require('./user')
const deckRouter = require('./deck')
const uploadRouter = require('./upload')
const categoryRouter = require('./category')
const productRouter = require('./product')



function route(app){
    app.use('/user', userRouter)
    app.use('/deck', deckRouter)
    app.use('/upload', uploadRouter)
    app.use('/category', categoryRouter)
    app.use('/product', productRouter)


    
    app.get('/', (req, res, next) => {
        return res.status(200).json({
            message: 'Server is Ok!'
        })
    })
}

module.exports = route