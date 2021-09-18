const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()
const userController = require('../controllers/UserController')
const { validateParam, validateBody, schemas } = require('../helper/routerHelpers')

router.get('/', userController.index)
router.post('/', validateBody(schemas.userSchema), userController.newUser)


router.post('/signup', validateBody(schemas.authSignUpSchema), userController.signUp)
router.post('/signin', validateBody(schemas.authSignInSchema), userController.signIn)
router.get('/secret', userController.secret)


router.get('/:userID', validateParam(schemas.idSchema, 'userID'), userController.getUser)
router.put('/:userID', validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userSchema), userController.replaceUser)
router.patch('/:userID', validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userOptionalSchema), userController.updateUser)

router.get('/:userID/decks', validateParam(schemas.idSchema, 'userID'), userController.getUserDecks)
router.post('/:userID/decks', validateParam(schemas.idSchema, 'userID'), validateBody(schemas.deckSchema), userController.newUserDecks)



module.exports = router