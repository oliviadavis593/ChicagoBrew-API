const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeBrewsArray } = require('./brews.fixtures')

describe('Brews Endpoints', function() {
    let db 

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL, 
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('chicagobrew').truncate())

    afterEach('cleanup', () => db('chicagobrew').truncate())

    describe('GET /api/brews', () => {
        context('Given there are brews in the database', () => {
            const testBrews = makeBrewsArray()

            beforeEach('insert brews', () => {
                return db 
                    .into('chicagobrew')
                    .insert(testBrews)
            })

            it('responds with 200 and all of the brews', () => {
                return supertest(app)
                    .get('/api/brews')
                    .expect(200, testBrews)
            })
        })

        context(`Given no brews`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/brews')
                    .expect(200, [])
            })
        })
    })

    describe('GET /api/brews/:brew_id', () => {
        context('Given there are brews in the database', () => {
            const testBrews = makeBrewsArray()

            beforeEach('insert brews', () => {
                return db 
                    .into('chicagobrew')
                    .insert(testBrews)
            })

            it('responds with 200 and specified brew', () => {
                const brewId = 2
                const expectedBrew = testBrews[brewId - 1]
                return supertest(app)
                    .get(`/api/brews/${brewId}`)
                    .expect(200, expectedBrew)
            })
        })

        context(`Given no brews`, () => {
            it(`responds with 404`, () => {
                const brewId = 123456
                return supertest(app)
                    .get(`/api/brews/${brewId}`)
                    .expect(404, {
                        error: { message: `Brew doesn't exist` }
                    })
            })
        })
    })

    describe(`POST /api/brews`, () => {
        it(`creates a brew, responding with 201 and the new brew`, () => {
            const newBrew = {
                name: 'fff',
                address: 'dddd',
                phone_number: 'ppppp',
                details: 'dddd',
                website: 'wwwww'
            }
            return supertest(app)
                .post('/api/brews')
                .send(newBrew)
                .expect(201)
                .expect(res => {
                    expect(res.body.name).to.eql(newBrew.name)
                    expect(res.body.address).to.eql(newBrew.address)
                    expect(res.body.phone_number).to.eql(newBrew.phone_number)
                    expect(res.body.details).to.eql(newBrew.details)
                    expect(res.body.website).to.eql(newBrew.website)
                    expect(res.body).to.have.property('id')
                })
        })
    })

    describe(`DELETE /api/brews/:brew_id`, () => {
        context('Given there are brews in the database', () => {
            const testBrews = makeBrewsArray()

            beforeEach('insert brews', () => {
                return db 
                    .into('chicagobrew')
                    .insert(testBrews)
            })

            it('responds with 204 and removes the brew', () => {
                const idToRemove = 2
                const expectedBrews = testBrews.filter(brew => brew.id !== idToRemove)
                return supertest(app)
                    .delete(`/api/brews/${idToRemove}`)
                    .expect(204)
                    .then(res => 
                        supertest(app)
                            .get(`/api/brews`)
                            .expect(expectedBrews)    
                    )
            })
        })

        context(`Given no brews`, () => {
            it(`responds with 404`, () => {
                const brewId = 123456
                return supertest(app)
                    .delete(`/api/brews/${brewId}`)
                    .expect(404, {
                        error: { message: `Brew doesn't exist` }
                    })
            })
        })
    })
})