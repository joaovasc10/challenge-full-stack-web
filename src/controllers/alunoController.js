import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllAlunos(request, reply) {
    try {
      const alunos = await prisma.aluno.findMany();
      reply.send(alunos);
    } catch (err) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
}

export async function createAluno(request, reply) {
  const { nome, email, ra, cpf } = request.body;
  try {
    const aluno = await prisma.aluno.create({
      data: { nome, email, ra, cpf },
    });
    reply.send(aluno);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar aluno' });
  }
}

export async function updateAluno(request, reply) {

    // captura o id do aluno da URL
    const { id } = request.params;

    // captura os dados do aluno do corpo da requisição
    const { nome, email, ra, cpf } = request.body;

    // atualiza os dados do aluno
    try {
        const aluno = await prisma.aluno.update({
            where: { id },
            data: { nome, email, ra, cpf },
        });

        // retorna os dados do aluno atualizados
        reply.send(aluno);
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error.message);
        reply.status(500).send({ error: 'Erro ao atualizar aluno' });
    }
}

export async function deleteAluno(request, reply) {
  const { id } = request.params;
  try {
    await prisma.aluno.delete({
      where: { id },
    });
    reply.send({ message: 'Aluno excluído com sucesso' });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao excluir aluno' });
  }
}

export default { getAllAlunos, createAluno, updateAluno, deleteAluno };
