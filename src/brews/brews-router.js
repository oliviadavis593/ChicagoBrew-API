const path = require('path')
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
    .post(jsonParser, (req, res, next) => {
      const { name, address, phone_number, details, website } = req.body
      const newBrew = { name, address, phone_number, details, website }
      BrewService.insertBrews(
          req.app.get('db'),
          newBrew
      )
        .then(brew => {
            res 
                .status(201)
                .location(path.posix.join(req.originalUrl + `/${brew.id}`))
                .json(serializeBrew(brew))
        })
        .catch(next)
    })

brewRouter
    .route('/:brew_id')
    .all((req, res, next) => {
        BrewService.getById(
            req.app.get('db'),
            req.params.brew_id
        )
            .then(brew => {
                if (!brew) {
                    return res.status(404).json({
                        error: { message: `Brew doesn't exist` }
                    })
                }
                res.brew = brew //save the brew for the next middleware 
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeBrew(res.brew))
    })
    .delete((req, res, next) => {
        BrewService.deleteBrew(
            req.app.get('db'),
            req.params.brew_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { name, address, phone_number, details, website } = req.body
        const brewToUpdate = { name, address, phone_number, details, website }

        BrewService.updateBrew(
            req.app.get('db'),
            req.params.brew_id, 
            brewToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = brewRouter