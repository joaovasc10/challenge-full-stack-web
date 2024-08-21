//src/routes/alunoRoutes.js
import authMiddleware from '../middlewares/auth.js';
import { getAllAlunos, createAluno, updateAluno, deleteAluno } from '../controllers/alunoController.js';
import { validate } from '../middlewares/validation.js';
import { z } from 'zod';

const alunoSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  ra: z.string().min(6).max(6),
  cpf: z.string().min(11).max(11),
});

export default async function alunoRoutes(app, options) {
  
  // // Aplica autenticação diretamente nas rotas
  app.get('/alunos', { preHandler: [app.authenticate] }, getAllAlunos);
  app.post('/alunos', { preHandler: [app.authenticate, validate(alunoSchema)] }, createAluno);
  app.put('/alunos/:id', { preHandler: [app.authenticate, validate(alunoSchema)] }, updateAluno);
  app.delete('/alunos/:id', { preHandler: [app.authenticate] }, deleteAluno);
}