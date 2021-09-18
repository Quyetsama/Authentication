const User = require('../models/User')
const Deck = require('../models/Decks')
const Joi = require('joi')
const JWT = require('jsonwebtoken')

// const idSchema = Joi.object().keys({
//     userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
// })


const encodedToken = (userID) => {
    return JWT.sign({
        iss: 'quyetsama',
        sub: userID,
        iat: new Date().getTime(),
        exp: new Date().getDate(new Date().getDate() + 3)
    }, process.env.JWT_SECRET)
}


class UserController{
    // checkIDSchema(req, res, next){
    //     res.locals.idSchema = Joi.object().keys({
    //         userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    //     })
    // const idSchema = res.locals.idSchema
    // const validatorResult = idSchema.validate(req.params)
    // console.log('validator result', validatorResult)
    //     next()
    // }

    // [GET] /user/
    async index(req, res, next){
        const users = await User.find({})
        return res.status(200).json({users})
    }

    // [POST] /user/newuser
    async newUser(req, res, next){
        const newUser = new User(req.value.body)
        await newUser.save()
        return res.status(201).json({user: newUser})    
    }

    // [GET] /user/:userID
    async getUser(req, res, next){
        const { userID } = req.value.params
        const user = await User.findById(userID)
        return res.status(200).json({user})
    }

    // [PUT] /user/:userID
    async replaceUser(req, res, next){
        // enforce new user to old user
        const { userID } = req.value.params
        const newUser = req.value.body
        const result = await User.findByIdAndUpdate(userID, newUser)
        return res.status(200).json({success: true})
    }

    // [PATCH] /user/:userID
    async updateUser(req, res, next){
        // number of fields
        const { userID } = req.value.params
        const newUser = req.value.body
        const result = await User.findByIdAndUpdate(userID, newUser)
        return res.status(200).json({success: true})
    }



    // /user/:userID/decks


    // [GET] /user/:userID/decks
    async getUserDecks(req, res, next){
        const { userID } = req.value.params
        const user = await User.findById(userID).populate('decks')
        return res.status(200).json({decks: user.decks})
    }

    // [POST] /user/:userID/decks
    async newUserDecks(req, res, next){
        const { userID } = req.value.params
        const newDeck = new Deck(req.value.body)
        const user = await User.findById(userID)
        newDeck.owner = user
        await newDeck.save()
        user.decks.push(newDeck._id)
        await user.save()
        return res.status(201).json({deck: newDeck})
    }



    // [POST] /user/sigup
    async signUp(req, res, next){
        console.log('signUp')
        const { firstName, lastName, email, password } = req.value.body

        // Check email same
        const foundUser = await User.findOne({ email })
        if(foundUser) return res.status(403).json({ error: { message: 'Email is already in use' } })

        // New user
        const newUser = new User({ firstName, lastName, email, password })

        console.log(newUser)
        await newUser.save()

        const token = encodedToken(newUser._id)
        res.setHeader('Authorization', token)

        return res.status(201).json({ success: true })
    }

    // [POST] /user/sigupsignin
    async signIn(req, res, next){
        console.log('signIn')
    }

    // [GET] /user/secret
    async secret(req, res, next){
        console.log('Secret')
    }
}

module.exports = new UserController