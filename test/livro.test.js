import dotenv from 'dotenv'
import supertest from 'supertest'

const request = supertest('http://localhost:3000')

dotenv.config()

describe.skip('/book', () => {
  test('POST - Criar um novo book', async () => {
    const payloadRequest1 = {
      name: 'book Teste 1',
      value: 100.49,
      authorId: 5,
      stock: 10
    }
    const res = await request.post('/book')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(payloadRequest1.name)
    expect(parseFloat(res.body.value)).toBe(payloadRequest1.value)
    expect(res.body.authorId).toBe(payloadRequest1.authorId)
  })

  test('PUT - Atualizar um book', async () => {
    const name = 'book teste x'
    const authorId = 5
    const payloadRequest1 = {
      name: name,
      value: 100.25,
      authorId: authorId,
      stock: 10
    }
    const res = await request.post('/book')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    payloadRequest1.bookId = res.body.bookId
    payloadRequest1.name = 'book Teste PUT'
    payloadRequest1.authorId = 9
    payloadRequest1.value = 10.32
    payloadRequest1.stock = 0

    const res2 = await request.put('/book')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)

    expect(res2.status).toBe(200)
    // não deve se atualizar o name do book  e o authorId
    expect(res2.body.name).toBe(name)
    expect(res2.body.authorId).toBe(authorId)

    expect(parseFloat(res2.body.value)).toBe(10.32)
    expect(res2.body.stock).toBe(0)
  })

  test('DELETE - Apagar um book', async () => {
    const payloadRequest1 = {
      name: 'book Teste 1',
      value: 100.49,
      authorId: 5,
      stock: 10
    }

    const res = await request.post('/book')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)

    expect(res.status).toBe(201)

    const id = res.body.bookId
    const res2 = await request.delete(`/book/${id}`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
    expect(res2.status).toBe(200)
  })

  test('GET - Listar Livros', async () => {
    const res = await request.get('/book')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
    expect(res.status).toBe(200)
    // const livros = res.body
    // livros.forEach(book => {
    //   expect(client.senha).toBe(undefined)
    // })
  })

  test('GET - Listar ByAutorId', async () => {
    const authorId = 1
    const res = await request.get(`/book?authorId=${authorId}`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
    expect(res.status).toBe(200)
    const livros = res.body
    livros.forEach(book => {
      expect(book.authorId).toBe(authorId)
    })
  })
})

describe.skip('/book/info', () => {
  test('POST - Criar LivroInfo', async () => {
    const name = 'book teste LivroInfo'
    const authorId = 5
    const payloadRequest1 = {
      name: name,
      value: 24.50,
      authorId: authorId,
      stock: 2
    }
    const res = await request.post('/book')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const bookId = res.body.bookId

    const payloadRequest2 = {
      bookId,
      descricao: 'Descrição do book teste',
      paginas: 42,
      editora: 'Editora Teste'
    }

    const res2 = await request.post('/book/info')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest2)

    expect(res2.status).toBe(201)
    expect(res2.body.bookId).toBe(bookId)
    expect(res2.body.descricao).toBe(payloadRequest2.descricao)
    expect(res2.body.paginas).toBe(payloadRequest2.paginas)
    expect(JSON.stringify(res2.body.avaliacoes)).toBe(JSON.stringify([]))
  })

  test('PUT - Atualizar LivroInfo', async () => {
    const name = 'book teste LivroInfo PUT'
    const authorId = 5
    const payloadRequest1 = {
      name: name,
      value: 24.52,
      authorId: authorId,
      stock: 3
    }
    const res = await request.post('/book')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const bookId = res.body.bookId

    const payloadRequest2 = {
      bookId,
      descricao: 'Descrição do book teste',
      paginas: 42,
      editora: 'Editora Teste'
    }

    const res2 = await request.post('/book/info')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest2)
    expect(res2.status).toBe(201)

    const payloadRequest3 = {
      bookId,
      descricao: 'Atualiza a descrição do teste',
      paginas: 51,
      editora: 'Editora Teste Atualizado',
      dumbfied: 'dumb'
    }

    const res3 = await request.put('/book/info')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest3)
    expect(res3.status).toBe(200)

    expect(res3.body.bookId).toBe(bookId)
    expect(res3.body.descricao).toBe(payloadRequest3.descricao)
    expect(res3.body.paginas).toBe(payloadRequest3.paginas)
    expect(res3.body.editora).toBe(payloadRequest3.editora)
    expect(res3.body.dumbfield).toBe(undefined)
  })

  test('DELETE - Remover LivroInfo', async () => {
    const name = 'book teste LivroInfo delete'
    const authorId = 5
    const payloadRequest1 = {
      name: name,
      value: 24.52,
      authorId: authorId,
      stock: 3
    }
    const res = await request.post('/book')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const bookId = res.body.bookId

    const payloadRequest2 = {
      bookId,
      descricao: 'Descrição do book teste',
      paginas: 42,
      editora: 'Editora Teste'
    }

    const res2 = await request.post('/book/info')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest2)
    expect(res2.status).toBe(201)

    const res3 = await request.delete(`/book/info/${bookId}`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
    expect(res3.status).toBe(200)
  })
})

describe.skip('/book/avaliacao', () => {
  test('create book review', async () => {
    const payloadRequest1 = {
      name: 'book teste book Rewiew',
      value: 24.50,
      authorId: 5,
      stock: 2
    }
    const res = await request.post('/book')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    const bookId = res.body.bookId

    const payloadRequest2 = {
      bookId,
      descricao: 'Descrição do book teste',
      paginas: 42,
      editora: 'Editora Teste'
    }

    const res2 = await request.post('/book/info')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest2)
    expect(res2.status).toBe(201)

    const payloadRequest3 = {
      name: 'payload request3',
      nota: 5,
      avaliacao: 'teste'
    }

    const res3 = await request.post(`/book/${bookId}/avaliacao`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest3)
    expect(res3.status).toBe(201)
  })
})
