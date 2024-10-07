

import { DataTypes } from 'sequelize';
import { sequelize } from '../database'; // Certifique-se de ter o arquivo de configuração do Sequelize

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Garante que o email seja único
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Adiciona campos createdAt e updatedAt
});

// Exportando o modelo User
export { User };
