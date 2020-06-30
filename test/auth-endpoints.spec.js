const knex = require('knex')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const helpers = require('./brews.fixtures')
const config = require('../src/config')

describe('Auth Endpoints', function() {
    let db

    const { testUsers } = helpers.makeBrewFixtures()
    const testUser = testUsers[0]

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL, 
        })
        app.set('db',db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('chicagobrew_users').truncate())

    afterEach('cleanup', () => db('chicagobrew_users').truncate())

    describe(`POST /api/login`, () => {
        beforeEach('insert user', () => {
          return db 
          .into('chicagobrew_users')
          .insert(testUser)
        })
    
          const requiredFields = ['email', 'password']
          
          requiredFields.forEach(field => {
              const loginAttemptBody = {
                  email: testUser.email, 
                  password: testUser.password,
              }
    
              it(`responds with 400 required error when '${field}' is missing`, () => {
                  delete loginAttemptBody[field]
    
                  return supertest(app)
                    .post('/api/login')
                    .send(loginAttemptBody)
                    .expect(400, {
                        error: `Missing '${field}' in request body`,
                    })
              })
            })
    
              it(`responds 400 'invalid email or password' when bad email`, () => {
                  const userInvalid = {
                      email: 'user-not',
                      password: 'existy'
                  }
                  return supertest(app)
                    .post('/api/login')
                    .send(userInvalid)
                    .expect(400, {
                        error: `Incorrect email or password`
                    })
              })
    
              it(`responds 400 'invalid email or password' when bad password`, () => {
                  const userInvalidPass = {
                      email: testUser.email, 
                      password: 'incorrect'
                  }
                  return supertest(app)
                    .post('/api/login')
                    .send(userInvalidPass)
                    .expect(400, {
                        error: `Incorrect email or password`
                    })
              })
    
              it(`responds 200 and JWT auth token using secret when credentials valid`, () => {
                const userValidCreds = {
                  email: testUser.email, 
                  password: 'password', 
                }
                const expectedToken = jwt.sign(
                  { email: testUser.email}, //payload
                  config.JWT_SECRET,
                  {
                    subject: testUser.email, 
                    algorithm: 'HS256',
                    noTimestamp: true
                  }
                )
                return supertest(app)
                  .post('/api/login')
                  .send(userValidCreds)
                  .expect(200, {
                    authToken: expectedToken,
                  }) 
              })
      })
})