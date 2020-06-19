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
})