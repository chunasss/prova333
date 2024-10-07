
import { User, UserInstance } from '../models/User';
import * as UserService from '../services/UserService';

describe('Testando User Service', () => {
  let email = 'test@jest.com';
  let password = '123456';

  beforeAll(async () => {
    await User.sync({ force: true }); // Resetando o banco de dados
  });

  it('Deve criar um novo usuário', async () => {
    const newUser = await UserService.createUser(email, password);
    expect(newUser).not.toBeInstanceOf(Error);
    expect(newUser).toHaveProperty('id');
    expect(newUser.email).toBe(email);
  });

  it('Não deve criar um usuário com email existente', async () => {
    const newUser = await UserService.createUser(email, password);
    expect(newUser).toBeInstanceOf(Error);
  });

  it('Deve encontrar um usuário pelo email', async () => {
    const user = await UserService.findByEmail(email);
    expect(user.email).toBe(email);
  });

  it('Deve combinar com a senha do banco de dados', async () => {
    const user = await UserService.findByEmail(email);
    const match = await UserService.matchPassword(password, user.password);
    expect(match).toBeTruthy();
  });

  it('Não deve combinar com a senha do banco de dados', async () => {
    const user = await UserService.findByEmail(email);
    const match = await UserService.matchPassword('invalid', user.password);
    expect(match).toBeFalsy();
  });

  it('Deve retornar uma lista de usuários', async () => {
    const users = await UserService.all();
    expect(users.length).toBeGreaterThanOrEqual(1);
    for (let i in users) {
      expect(users[i]).toBeInstanceOf(User);
    }
  });
});
