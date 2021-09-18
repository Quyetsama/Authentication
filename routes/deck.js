const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()
const deckController = require('../controllers/DeckController')
const { validateParam, validateBody, schemas } = require('../helper/routerHelpers')

router.get('/', deckController.index)
router.post('/' ,validateBody(schemas.newDeckSchema), deckController.newDeck)

router.get('/:deckID', validateParam(schemas.idSchema, 'deckID'), deckController.getDeck)
router.put('/:deckID', validateParam(schemas.idSchema, 'deckID'), validateBody(schemas.newDeckSchema), deckController.replaceDeck)
router.patch('/:deckID', validateParam(schemas.idSchema, 'deckID'), validateBody(schemas.deckOptionalSchema), deckController.updateDeck)
router.delete('/:deckID', validateParam(schemas.idSchema, 'deckID'), deckController.deleteDeck)


module.exports = router