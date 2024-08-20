import { getAllAlunos, createAluno, updateAluno, deleteAluno } from '../controllers/alunoController.js';

export default async function alunoRoutes(app, options) {
  app.get('/alunos', getAllAlunos);
  app.post('/alunos', createAluno);
  app.put('/alunos/:id', updateAluno);
  app.delete('/alunos/:id', deleteAluno);
}


