import request from 'supertest';
import app from '../app'; // Ajuste o caminho para seu app
import { User } from '../models/User';

describe('Testando rotas da API', () => {
  beforeAll(async () => {
    await User.sync({ force: true }); // Resetando o banco de dados
  });

  it('Não deve registrar um usuário sem a senha', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'test@jest.com' });
      
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Password is required');
  });

  it('Não deve registrar um usuário sem o email', async () => {
    const response = await request(app)
      .post('/register')
      .send({ password: '123456' });
      
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email is required');
  });

  it('Não deve registrar um usuário sem os dados', async () => {
    const response = await request(app)
      .post('/register')
      .send({});
      
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email and password are required');
  });

  it('Deve logar corretamente', async () => {
    // Primeiro, registre um usuário
    await request(app)
      .post('/register')
      .send({
        email: 'test@jest.com',
        password: '123456'
      });

    // Depois, tente logar
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@jest.com',
        password: '123456'
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
  });
});
