// routes/alunoRoutes.js

import { getAllAlunos, createAluno, updateAluno, deleteAluno } from '../controllers/alunoController.js';
import { validate } from '../middlewares/validation.js';
import { z } from 'zod';

// Define o schema de validação para os dados do aluno
const alunoSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  ra: z.string().length(6), // RA deve ter exatamente 6 caracteres
  cpf: z.string().length(11), // CPF deve ter exatamente 11 caracteres
});

// Define o schema de validação para a atualização dos dados do aluno
const alunoUpdateSchema = z.object({
  nome: z.string().min(1).optional(),
  email: z.string().email().optional(),
  ra: z.string().length(6).optional(),
  cpf: z.string().length(11).optional(),
});

// Define as rotas para os alunos
export default async function alunoRoutes(app, options) {
  
  // rota para listar todos os alunos
  app.get('/alunos', { preHandler: [app.authenticate] }, getAllAlunos);

  // rota para criar um novo aluno
  app.post('/alunos', { preHandler: [app.authenticate, validate(alunoSchema)] }, createAluno);

  // rota para editar/atualizar um aluno
  app.put('/alunos/:id', { preHandler: [app.authenticate, validate(alunoUpdateSchema)] }, updateAluno);

  // rota para deletar um aluno
  app.delete('/alunos/:id', { preHandler: [app.authenticate] }, deleteAluno);
}