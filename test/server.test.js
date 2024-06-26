import dotenv from 'dotenv'
import supertest from 'supertest'

const request = supertest('http://localhost:3000')

dotenv.config()

test('Servidor na porta 3000', async () => {
  const resposta = await request.get('/')
    .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
  expect(resposta.status).toBe(200)
  expect(resposta.text).toBe('Bootcamp IGTI: Desenvolvedor Node JS - Desafio Final. Bem vindo à livraria-api.')
})
