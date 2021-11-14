const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()
const userController = require('../controllers/UserController')
const { validateParam, validateBody, schemas } = require('../helper/routerHelpers')
const passport = require('passport')
const passportConfig = require('../middlewares/passport')


router.get('/', userController.index)
router.post('/', validateBody(schemas.userSchema), userController.newUser)
router.get('/login', (req, res, next) => {
    res.render('signin')
})

router.post('/signup', validateBody(schemas.authSignUpSchema), userController.signUp)
router.post('/signin', validateBody(schemas.authSignInSchema), passport.authenticate('local', { session: false }), userController.signIn)
router.get('/secret', passport.authenticate('jwt', { session: false }), userController.secret)

router.post('/auth/google', passport.authenticate('google-token', { session: false }), userController.authGoogle)
// router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))
// router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
// function(req, res) {
//   res.redirect('/user')
// })
router.post('/auth/facebook', passport.authenticate('facebook-token', { session: false }), userController.authFacebook)

router.get('/:userID', validateParam(schemas.idSchema, 'userID'), userController.getUser)
router.put('/:userID', validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userSchema), userController.replaceUser)
router.patch('/:userID', validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userOptionalSchema), userController.updateUser)

router.get('/:userID/decks', validateParam(schemas.idSchema, 'userID'), userController.getUserDecks)
router.post('/:userID/decks', validateParam(schemas.idSchema, 'userID'), validateBody(schemas.deckSchema), userController.newUserDecks)



module.exports = router