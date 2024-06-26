import dotenv from 'dotenv'
import supertest from 'supertest'

const request = supertest('http://localhost:3000')

dotenv.config()

describe.skip('/livro', () => {
  test('POST - Criar um novo livro', async () => {
    const payloadRequest1 = {
      nome: 'Livro Teste 1',
      valor: 100.49,
      autorId: 5,
      estoque: 10
    }
    const res = await request.post('/livro')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    expect(res.body.nome).toBe(payloadRequest1.nome)
    expect(parseFloat(res.body.valor)).toBe(payloadRequest1.valor)
    expect(res.body.autorId).toBe(payloadRequest1.autorId)
  })

  test('PUT - Atualizar um Livro', async () => {
    const nome = 'Livro teste x'
    const autorId = 5
    const payloadRequest1 = {
      nome: nome,
      valor: 100.25,
      autorId: autorId,
      estoque: 10
    }
    const res = await request.post('/livro')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    payloadRequest1.livroId = res.body.livroId
    payloadRequest1.nome = 'Livro Teste PUT'
    payloadRequest1.autorId = 9
    payloadRequest1.valor = 10.32
    payloadRequest1.estoque = 0

    const res2 = await request.put('/livro')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)

    expect(res2.status).toBe(200)
    // não deve se atualizar o nome do livro  e o autorId
    expect(res2.body.nome).toBe(nome)
    expect(res2.body.autorId).toBe(autorId)

    expect(parseFloat(res2.body.valor)).toBe(10.32)
    expect(res2.body.estoque).toBe(0)
  })

  test('DELETE - Apagar um livro', async () => {
    const payloadRequest1 = {
      nome: 'Livro Teste 1',
      valor: 100.49,
      autorId: 5,
      estoque: 10
    }

    const res = await request.post('/livro')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)

    expect(res.status).toBe(201)

    const id = res.body.livroId
    const res2 = await request.delete(`/livro/${id}`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
    expect(res2.status).toBe(200)
  })

  test('GET - Listar Livros', async () => {
    const res = await request.get('/livro')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
    expect(res.status).toBe(200)
    // const livros = res.body
    // livros.forEach(livro => {
    //   expect(client.senha).toBe(undefined)
    // })
  })

  test('GET - Listar ByAutorId', async () => {
    const autorId = 1
    const res = await request.get(`/livro?autorId=${autorId}`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
    expect(res.status).toBe(200)
    const livros = res.body
    livros.forEach(livro => {
      expect(livro.autorId).toBe(autorId)
    })
  })
})

describe.skip('/livro/info', () => {
  test('POST - Criar LivroInfo', async () => {
    const nome = 'Livro teste LivroInfo'
    const autorId = 5
    const payloadRequest1 = {
      nome: nome,
      valor: 24.50,
      autorId: autorId,
      estoque: 2
    }
    const res = await request.post('/livro')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const livroId = res.body.livroId

    const payloadRequest2 = {
      livroId,
      descricao: 'Descrição do livro teste',
      paginas: 42,
      editora: 'Editora Teste'
    }

    const res2 = await request.post('/livro/info')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest2)

    expect(res2.status).toBe(201)
    expect(res2.body.livroId).toBe(livroId)
    expect(res2.body.descricao).toBe(payloadRequest2.descricao)
    expect(res2.body.paginas).toBe(payloadRequest2.paginas)
    expect(JSON.stringify(res2.body.avaliacoes)).toBe(JSON.stringify([]))
  })

  test('PUT - Atualizar LivroInfo', async () => {
    const nome = 'Livro teste LivroInfo PUT'
    const autorId = 5
    const payloadRequest1 = {
      nome: nome,
      valor: 24.52,
      autorId: autorId,
      estoque: 3
    }
    const res = await request.post('/livro')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const livroId = res.body.livroId

    const payloadRequest2 = {
      livroId,
      descricao: 'Descrição do livro teste',
      paginas: 42,
      editora: 'Editora Teste'
    }

    const res2 = await request.post('/livro/info')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest2)
    expect(res2.status).toBe(201)

    const payloadRequest3 = {
      livroId,
      descricao: 'Atualiza a descrição do teste',
      paginas: 51,
      editora: 'Editora Teste Atualizado',
      dumbfied: 'dumb'
    }

    const res3 = await request.put('/livro/info')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest3)
    expect(res3.status).toBe(200)

    expect(res3.body.livroId).toBe(livroId)
    expect(res3.body.descricao).toBe(payloadRequest3.descricao)
    expect(res3.body.paginas).toBe(payloadRequest3.paginas)
    expect(res3.body.editora).toBe(payloadRequest3.editora)
    expect(res3.body.dumbfield).toBe(undefined)
  })

  test('DELETE - Remover LivroInfo', async () => {
    const nome = 'Livro teste LivroInfo delete'
    const autorId = 5
    const payloadRequest1 = {
      nome: nome,
      valor: 24.52,
      autorId: autorId,
      estoque: 3
    }
    const res = await request.post('/livro')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const livroId = res.body.livroId

    const payloadRequest2 = {
      livroId,
      descricao: 'Descrição do livro teste',
      paginas: 42,
      editora: 'Editora Teste'
    }

    const res2 = await request.post('/livro/info')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest2)
    expect(res2.status).toBe(201)

    const res3 = await request.delete(`/livro/info/${livroId}`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
    expect(res3.status).toBe(200)
  })
})

describe.skip('/livro/avaliacao', () => {
  test('create livro review', async () => {
    const payloadRequest1 = {
      nome: 'Livro teste Livro Rewiew',
      valor: 24.50,
      autorId: 5,
      estoque: 2
    }
    const res = await request.post('/livro')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    const livroId = res.body.livroId

    const payloadRequest2 = {
      livroId,
      descricao: 'Descrição do livro teste',
      paginas: 42,
      editora: 'Editora Teste'
    }

    const res2 = await request.post('/livro/info')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest2)
    expect(res2.status).toBe(201)

    const payloadRequest3 = {
      nome: 'payload request3',
      nota: 5,
      avaliacao: 'teste'
    }

    const res3 = await request.post(`/livro/${livroId}/avaliacao`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest3)
    expect(res3.status).toBe(201)
  })
})
