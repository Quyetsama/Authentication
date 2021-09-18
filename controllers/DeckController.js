const User = require('../models/User')
const Deck = require('../models/Decks')



class DeckController{

    // [GET] /deck/
    async index(req, res, next){
        const decks = await Deck.find({})

        return res.status(200).json({decks})
    }

    // [POST] /deck/
    async newDeck(req, res, next){
        // Find owner
        const owner = await User.findById(req.value.body.owner)
        // Create a new deck
        const newDeck = new Deck(req.value.body)
        await newDeck.save()

        // Add newly created deck to the actual decks
        owner.decks.push(newDeck._id)
        await owner.save()

        return res.status(201).json({deck: newDeck})
    }

    // [GET] /deck/:deckID
    async getDeck(req, res, next){
        const deck = await Deck.findById(req.value.params.deckID)

        return res.status(200).json({deck})
    }

    // [PUT] /deck/:deckID
    async replaceDeck(req, res, next){

        const { deckID } = req.value.params
        const newDeck = req.value.body
        
        let save1, save2, save3
        if(newDeck.owner){
            const process1 = User.findById(newDeck.owner)
            const process2 = Deck.findById(deckID)
            // const process3 = User.findById(oldDeck.owner)

            const newOwner = await process1
            const oldDeck = await process2
            const oldOwner = await User.findById(oldDeck.owner)

            newOwner.decks.push(deckID)
            oldOwner.decks.pull(deckID)
            save1 = newOwner.save()
            save2 = oldOwner.save()
            
        }

        save3 = Deck.findByIdAndUpdate(deckID, newDeck)

        const result1 = await save1
        const result2 = await save2
        const result3 = await save3
        // Check if put user, remove deck in user's momdel and push deck to user putted
        
        

        return res.status(200).json({success: true})
    }

    // [PATCH] /deck/:deckID
    async updateDeck(req, res, next){
        const { deckID } = req.value.params
        const newDeck = req.value.body

        let save1, save2, save3
        if(newDeck.owner){
            const process1 = User.findById(newDeck.owner)
            const process2 = Deck.findById(deckID)
            // const process3 = User.findById(oldDeck.owner)

            const newOwner = await process1
            const oldDeck = await process2
            const oldOwner = await User.findById(oldDeck.owner)

            newOwner.decks.push(deckID)
            oldOwner.decks.pull(deckID)
            save1 = newOwner.save()
            save2 = oldOwner.save()
            
        }

        save3 = Deck.findByIdAndUpdate(deckID, newDeck)

        const result1 = await save1
        const result2 = await save2
        const result3 = await save3
        // Check if put user, remove deck in user's momdel and push deck to user putted
        return res.status(200).json({success: true})
    }

    // [DELETE] /deck/:deckID
    async deleteDeck(req, res, next){
        const { deckID } = req.value.params

        // Get a deck
        const deck = await Deck.findById(deckID)
        const ownerID = deck.owner

        // Get a owner
        const owner = await User.findById(ownerID)

        // Remove the deck
        await deck.remove()

        // Remove deck from owner's deck list
        owner.decks.pull(deck)
        await owner.save()

        return res.status(200).json({success: true})
    }
}

module.exports = new DeckController