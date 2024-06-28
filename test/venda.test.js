import dotenv from 'dotenv'
import supertest from 'supertest'

const request = supertest('http://localhost:3000')

dotenv.config()

describe.skip('/sale', () => {
  test('POST - Cadastrar uma nova sale', async () => {
    const payloadRequest1 = {
      name: 'book Teste 1',
      value: 100.49,
      authorId: 5,
      stock: 1
    }
    const res = await request.post('/book')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const payloadRequest2 = {
      bookId: res.body.bookId,
      clientId: 5
    }

    const res2 = await request.post('/sale')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest2)
    expect(res2.status).toBe(201)
    expect(res2.clientId).toBe(payloadRequest1.clientId)
    expect(res2.bookId).toBe(payloadRequest1.bookId)
    expect(res2.body.saleId).toBeDefined()
  }
  )

  test('POST - Cadastrar uma nova sale para book sem stock ', async () => {
    const payloadRequest1 = {
      name: 'book Teste 1',
      value: 100.49,
      authorId: 5,
      stock: 0
    }

    const res = await request.post('/book')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const payloadRequest2 = {
      bookId: res.body.bookId,
      clientId: 5
    }
    const res2 = await request.post('/sale')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest2)
    expect(res2.status).toBe(400)
  }
  )
})
