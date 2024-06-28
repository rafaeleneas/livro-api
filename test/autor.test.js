import dotenv from 'dotenv'
import supertest from 'supertest'

dotenv.config()
const request = supertest('http://localhost:3000')

describe.skip('/cliente', () => {
  test('POST - Criar um novo author', async () => {
    const payloadRequest1 = {
      name: 'author Teste 1',
      email: 'teste@gmail.com',
      phone: '99-99999-9999'
    }
    const res = await request.post('/author')
      .auth('admin','desafio-igti-nodejs')
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(payloadRequest1.name)
    expect(res.body.email).toBe(payloadRequest1.email)
    expect(res.body.phone).toBe(payloadRequest1.phone)
  })

  test('PUT - Atualizar um cliente', async () => {
    const payloadRequest1 = {
      name: 'author Teste 1',
      email: 'teste@gmail.com',
      phone: '99-99999-9999'
    }
    const res = await request.post('/author')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    payloadRequest1.authorId = res.body.authorId
    payloadRequest1.name = 'author 1 PUT'
    payloadRequest1.email = 'teste2@gmail.com'
    payloadRequest1.phone = '99-99999-9992'

    const res2 = await request.put('/author')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)

    expect(res2.status).toBe(200)
    expect(res2.body.name).toBe(payloadRequest1.name)
    expect(res2.body.email).toBe(payloadRequest1.email)
    expect(res2.body.phone).toBe(payloadRequest1.phone)
  })

  test('DELETE - Apagar um author', async () => {
    const payloadRequest1 = {
      name: 'author Teste 1',
      email: 'teste@gmail.com',
      phone: '99-99999-9999'
    }
    const res = await request.post('/author')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const id = res.body.authorId
    const res2 = await request.delete(`/author/${id}`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)

    expect(res2.status).toBe(200)
  })

  test('GET - Listar Autores', async () => {
    const res = await request.get('/author')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)

    expect(res.status).toBe(200)
    const autores = res.body
    autores.forEach(author => {
    //  expect(client.senha).toBe(undefined)
    })
  })
})
