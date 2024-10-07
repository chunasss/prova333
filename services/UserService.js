import { User } from '../models/User'; // Ajuste o caminho conforme necessário
import bcrypt from 'bcrypt'; // Se você estiver usando bcrypt para hashear senhas

export const createUser = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    return newUser;
  } catch (error) {
    return new Error('User already exists'); // Customize conforme necessário
  }
};

export const findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

export const matchPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const all = async () => {
  return await User.findAll();
};
