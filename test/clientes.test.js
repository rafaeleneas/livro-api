import dotenv from 'dotenv'
import supertest from 'supertest'

const request = supertest('http://localhost:3000')

dotenv.config()

describe.skip('/client', () => {
  test('POST - Criar um novo client', async () => {
    const payloadRequest1 = {
      name: 'client Teste 1',
      email: 'teste@gmail.com',
      password: 'senhadetestes',
      phone: '99-99999-9999',
      address: 'Rua dos Bobos, nº 0'
    }
    const res = await request.post('/client')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(payloadRequest1.name)
    expect(res.body.email).toBe(payloadRequest1.email)
    expect(res.body.password).toBe(undefined)
    expect(res.body.phone).toBe(payloadRequest1.phone)
    expect(res.body.address).toBe(payloadRequest1.address)
  })

  test('PUT - Atualizar um client', async () => {
    const payloadRequest1 = {
      name: 'client Teste 1',
      email: 'teste@gmail.com',
      password: 'senhadetestes',
      phone: '99-99999-9999',
      address: 'Rua dos Bobos, nº 0'
    }
    const res = await request.post('/client')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    payloadRequest1.clienteId = res.body.clienteId
    payloadRequest1.name = 'client Teste 1 PUT'
    payloadRequest1.password = 'novasenhadetestes'
    payloadRequest1.phone = '99-99999-9994'

    const res2 = await request.put('/client')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)

    expect(res2.status).toBe(200)
    expect(res2.body.name).toBe(payloadRequest1.name)
    expect(res2.body.email).toBe(payloadRequest1.email)
    expect(res2.body.password).toBe(undefined)
    expect(res2.body.phone).toBe(payloadRequest1.phone)
    expect(res2.body.address).toBe(payloadRequest1.address)
  })

  test('DELETE - Apagar um client', async () => {
    const payloadRequest1 = {
      name: 'client Teste 1',
      email: 'teste@gmail.com',
      password: 'senhadetestes',
      phone: '99-99999-9999',
      address: 'Rua dos Bobos, nº 0'
    }
    const res = await request.post('/client')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const id = res.body.clienteId
    const res2 = await request.delete(`/client/${id}`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)

    expect(res2.status).toBe(200)
  })

  test('GET - Listar Clientes', async () => {
    const res = await request.get('/client')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
    expect(res.status).toBe(200)
    const clientes = res.body
    clientes.forEach(client => {
      expect(client.password).toBe(undefined)
    })
  })
})

// test('DELETE - Apagar um client com vendas', async () => {
//     const payloadRequest1 = {name: 'client Teste 1',
//     email: 'teste@gmail.com',
//     password: 'senhadetestes',
//     phone: '99-99999-9999',
//     address: 'Rua dos Bobos, nº 0'
// };
// const res = await request.post('/client')
// .send(payloadRequest1);
// expect(res.status).toBe(201);

// // TODO FINALIZAR O TESTE DE APAGAR CLIENTES COM VENDAS
// // const res = await request.post('/vendas')
// // const payloadRequest1 = {
// // }
// //    .send(payloadRequest1);
// // expect(res.status).toBe(200);

// const id = res.body.clienteId;
// const res2 = await request.put(`/client/${id}`)
// .send(payloadRequest1);

// expect(res2.status).toBe(200);
// });
