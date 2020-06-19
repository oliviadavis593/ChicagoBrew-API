const express = require('express')
const BrewService = require('./brews-service')

const brewRouter = express.Router();
const jsonParser = express.json();

const serializeBrew = brew => ({
    id: brew.id, 
    name: brew.name, 
    address: brew.address, 
    phone_number: brew.phone_number, 
    details: brew.details, 
    website: brew.website
})

brewRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        BrewService.getAllBrews(knexInstance)
            .then(brews => {
                res.json(brews.map(serializeBrew))
            })
            .catch(next)
    })

brewRouter
    .route('/:brew_id')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        BrewService.getById(knexInstance, req.params.brew_id)
            .then(brew => {
                if (!brew) {
                    return res.status(404).json({
                        error: { message: `Brew doesn't exist` }
                    })
                }
                res.json(brew)
            })
            .catch(next)
    })

module.exports = brewRouter