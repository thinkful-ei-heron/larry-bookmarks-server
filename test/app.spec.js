const app = require('../src/app')

describe('App', () => {
  it('POST / responds with 200 containing "POST request received."', () => {
    return supertest(app)
      .post('/')
      .expect(200, 'POST request received.')
  })
})
