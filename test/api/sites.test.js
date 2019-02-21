import supertest from 'supertest'
import expect from 'expect'

import {
  before as commonBefore,
  after as commonAfter,
  beforeEach as commonBeforeEach
} from './common'

describe('Sites', () => {
  before(async () => {
    await commonBefore()
  })
  after(async () => {
    await commonAfter()
  })

  beforeEach(async () => {
    await commonBeforeEach()
  })

  const request = supertest.agent(`http://localhost:${process.env.PORT}`)

  it('can be empty', async () => {
    await request
      .get('/api/sites')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, [])
  })

  it('can be created', async () => {
    const [id1, name1] = await request
      .post('/api/sites')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201)
      .then(res => [res.body.id, res.body.name])
    await request
      .get('/api/sites')
      .expect(200)
      .expect(res => expect(res.body.length).toEqual(1))
    const [id2, name2] = await request
      .post('/api/sites')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201)
      .then(res => [res.body.id, res.body.name])
    // Fetched in creation order
    await request
      .get('/api/sites')
      .expect(200)
      .expect(res => {
        expect(res.body.length).toEqual(2)
        expect(res.body[0].name).toEqual(name1)
        expect(res.body[0].id).toEqual(id1)
        expect(res.body[1].name).toEqual(name2)
        expect(res.body[1].id).toEqual(id2)
      })
    await request
      .get(`/api/site/${id1}`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect(res => expect(res.body).toMatchObject({
        name: name1,
        id: id1
      }))
  })

  it('can be patched', async () => {
    const [id, name] = await request
      .post('/api/sites')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201)
      .then(res => [res.body.id, res.body.name])
    const newName = `${name} 2`
    await request
      .patch(`/api/site/${id}`)
      .send({ name: newName })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect(res => expect(res.body).toMatchObject({
        id, name: newName
      }))
  })

  it('can be deleted', async () => {
    await request
      .post('/api/site/0')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404)
    const id = await request
      .post('/api/sites')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201)
      .then(res => res.body.id)
    await request
      .delete(`/api/site/${id}`)
      .expect(200, '"deleted"')
    await request
      .get(`/api/site/${id}`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404)
    await request
      .delete(`/api/site/${id}`)
      .expect(404, '"not found"')
  })
})
