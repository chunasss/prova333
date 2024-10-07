import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes'; // Ajuste o caminho conforme necessário

const app = express();

// Middleware para analisar JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Definindo rotas
app.use('/api', userRoutes); // Rotas de usuário

// Endpoint de ping para teste
app.get('/ping', (req, res) => {
  res.json({ pong: true });
});

export default app;
