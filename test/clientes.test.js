import dotenv from 'dotenv'
import supertest from 'supertest'

const request = supertest('http://localhost:3000')

dotenv.config()

describe.skip('/cliente', () => {
  test('POST - Criar um novo cliente', async () => {
    const payloadRequest1 = {
      nome: 'Cliente Teste 1',
      email: 'teste@gmail.com',
      senha: 'senhadetestes',
      telefone: '99-99999-9999',
      endereco: 'Rua dos Bobos, nº 0'
    }
    const res = await request.post('/cliente')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    expect(res.body.nome).toBe(payloadRequest1.nome)
    expect(res.body.email).toBe(payloadRequest1.email)
    expect(res.body.senha).toBe(undefined)
    expect(res.body.telefone).toBe(payloadRequest1.telefone)
    expect(res.body.endereco).toBe(payloadRequest1.endereco)
  })

  test('PUT - Atualizar um cliente', async () => {
    const payloadRequest1 = {
      nome: 'Cliente Teste 1',
      email: 'teste@gmail.com',
      senha: 'senhadetestes',
      telefone: '99-99999-9999',
      endereco: 'Rua dos Bobos, nº 0'
    }
    const res = await request.post('/cliente')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    payloadRequest1.clienteId = res.body.clienteId
    payloadRequest1.nome = 'Cliente Teste 1 PUT'
    payloadRequest1.senha = 'novasenhadetestes'
    payloadRequest1.telefone = '99-99999-9994'

    const res2 = await request.put('/cliente')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)

    expect(res2.status).toBe(200)
    expect(res2.body.nome).toBe(payloadRequest1.nome)
    expect(res2.body.email).toBe(payloadRequest1.email)
    expect(res2.body.senha).toBe(undefined)
    expect(res2.body.telefone).toBe(payloadRequest1.telefone)
    expect(res2.body.endereco).toBe(payloadRequest1.endereco)
  })

  test('DELETE - Apagar um cliente', async () => {
    const payloadRequest1 = {
      nome: 'Cliente Teste 1',
      email: 'teste@gmail.com',
      senha: 'senhadetestes',
      telefone: '99-99999-9999',
      endereco: 'Rua dos Bobos, nº 0'
    }
    const res = await request.post('/cliente')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const id = res.body.clienteId
    const res2 = await request.delete(`/cliente/${id}`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)

    expect(res2.status).toBe(200)
  })

  test('GET - Listar Clientes', async () => {
    const res = await request.get('/cliente')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
    expect(res.status).toBe(200)
    const clientes = res.body
    clientes.forEach(client => {
      expect(client.senha).toBe(undefined)
    })
  })
})

// test('DELETE - Apagar um cliente com vendas', async () => {
//     const payloadRequest1 = {nome: 'Cliente Teste 1',
//     email: 'teste@gmail.com',
//     senha: 'senhadetestes',
//     telefone: '99-99999-9999',
//     endereco: 'Rua dos Bobos, nº 0'
// };
// const res = await request.post('/cliente')
// .send(payloadRequest1);
// expect(res.status).toBe(201);

// // TODO FINALIZAR O TESTE DE APAGAR CLIENTES COM VENDAS
// // const res = await request.post('/vendas')
// // const payloadRequest1 = {
// // }
// //    .send(payloadRequest1);
// // expect(res.status).toBe(200);

// const id = res.body.clienteId;
// const res2 = await request.put(`/cliente/${id}`)
// .send(payloadRequest1);

// expect(res2.status).toBe(200);
// });
