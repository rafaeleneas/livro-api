import dotenv from 'dotenv'
import supertest from 'supertest'

const request = supertest('http://localhost:3000')

dotenv.config()
let author = null
let book = null
let customer = null
const email = 'teste@gmail.com'
const password = 'senhadetestes'
let sale = null

describe('Admin Testes de integração', () => {
  test('1 - Criar um author com dados de teste', async () => {
    const payloadRequest1 = {
      name: 'author Teste 1',
      email: 'teste@gmail.com',
      phone: '99-99999-9999'
    }
    //desafio-igti-nodejs
    //'admin'
    // 'desafio-igti-nodejs'
    const res = await request.post('/author')
      .auth('admin','desafio-igti-nodejs')
      .send(payloadRequest1)
    expect(res.status).toBe(201)  //200 sucesso 201 create
    expect(res.body.name).toBe(payloadRequest1.name)
    expect(res.body.email).toBe(payloadRequest1.email)
    expect(res.body.phone).toBe(payloadRequest1.phone)
    expect(res.body.authorId).toBeDefined()
    author = res.body
  })
  test('2 -Verificar se ele foi criado corretamente no banco de dados', async () => {
    const authorId = author.authorId
    const res = await request.get(`/author/${authorId}`)
      .auth('admin', 'desafio-igti-nodejs')
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(author.name)
    expect(res.body.email).toBe(author.email)
    expect(res.body.phone).toBe(author.phone)
    expect(res.body.authorId).toBe(author.authorId)
  })

  test('3 -Criar um book com dados de teste para o author criado anteriormente', async () => {
    const payloadRequest1 = {
      name: 'book Teste 1',
      value: 100.49,
      authorId: author.authorId,
      stock: 10
    }
    const res = await request.post('/book')
      .auth('admin', 'desafio-igti-nodejs')
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(payloadRequest1.name)
    expect(parseFloat(res.body.value)).toBe(payloadRequest1.value)
    expect(res.body.authorId).toBe(author.authorId)
    book = res.body
  })

  test('4 - Verificar se o book foi criado corretamente', async () => {
    const bookId = book.bookId
    const res = await request.get(`/book/${bookId}`)
      .auth('admin', 'desafio-igti-nodejs')
    expect(res.status).toBe(200)
    expect(res.body.bookId).toBe(bookId)
    expect(res.body.name).toBe(book.name)
    expect(res.body.stock).toBe(book.stock)
    expect(res.body.authorId).toBe(author.authorId)
  })

  test('5 - Criar um client com dados de teste', async () => {
    //const res0 = await request.delete(`/client/email/${email}`)
    //  .auth('admin', 'desafio-igti-nodejs')
    //expect(res0.status).toBe(200)
    const payloadRequest1 = {
      name: 'client Teste 1',
      email:email,
      password: password,
      phone: '99-99999-9999',
      address: 'Rua dos Bobos, nº 0'
    }
    const res = await request.post('/client')
      .auth('admin', 'desafio-igti-nodejs')
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(payloadRequest1.name)
    expect(res.body.email).toBe(payloadRequest1.email)
    expect(res.body.password).toBe(payloadRequest1.password)
    expect(res.body.phone).toBe(payloadRequest1.phone)
    expect(res.body.address).toBe(payloadRequest1.address)

    customer = res.body
  })

  test('6 - Verificar se o client foi criado corretamente', async () => {
    const clientId = customer.clientId
    const res = await request.get(`/client/${clientId}`)
      .auth('admin', 'desafio-igti-nodejs')
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(customer.name)
    expect(res.body.email).toBe(customer.email)
    expect(res.body.password).toBe(customer.password)
    expect(res.body.phone).toBe(customer.phone)
    expect(res.body.address).toBe(customer.address)
  })
})

describe('Com Login criado', () => {
  test('1 - Buscar o book criado utilizando os dados de login do usuário e verificar se o retorno  é adequado.', async () => {
    const bookId = book.bookId
    const res = await request.get(`/book/${bookId}`)
      .auth(customer.email, password)
    expect(res.status).toBe(200)
    expect(res.body.bookId).toBe(bookId)
    expect(res.body.name).toBe(book.name)
    expect(res.body.stock).toBe(book.stock)
    expect(res.body.authorId).toBe(author.authorId)
  })

  test('2 - Criar uma sale para o usuário e book criados para teste', async () => {
    const payloadRequest2 = {
      bookId: book.bookId,
      clientId: customer.clientId,
      value: book.value,
      date: new Date()
    }

    const res2 = await request.post('/sale')
      .auth(customer.email, password)
      .send(payloadRequest2)
    expect(res2.status).toBe(201)

    expect(res2.body.clientId).toBe(payloadRequest2.clientId)
    expect(res2.body.bookId).toBe(payloadRequest2.bookId)
   // expect(res2.body.saleId).toBeDefined()
    sale = res2.body
  })

  test('3 - Verificar se ela foi salva corretamente', async () => {
    console.log('Sale ID 1:', sale.saleId) // Adiciona esta linha para imprimir o saleId
    const saleId = sale.saleId
    console.log('emai, password', customer.email);
    console.log('password', password);
    console.log('Sale ID:', saleId) // Adiciona esta linha para imprimir o saleId
    const res = await request.get(`/sale/${saleId}`).auth(customer.email, password)
    console.log('sale res: ',res.body.saleId)
    expect(res.status).toBe(200)
    expect(res.body.saleId).toBe(saleId) //erro aqui saleId chegando algo estranho
    expect(res.body.bookId).toBe(book.bookId)
    expect(res.body.clientId).toBe(customer.clientId)
    //expect(res.body.value).toBeDefined()
  })
})

afterAll(async () => {
  const saleId = book.bookId
  await request.delete(`/sale/${saleId}`)
    .auth('admin', 'desafio-igti-nodejs')

  const bookId = book.bookId
  await request.get(`/book/${bookId}`)
    .auth('admin', 'desafio-igti-nodejs')

  const clientId = customer.clientId
  await request.delete(`/client/${clientId}`)
    .auth('admin', 'desafio-igti-nodejs')
})
