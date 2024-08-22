// src/controllers/alunoController.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllAlunos(request, reply) {
    try {
      const alunos = await prisma.aluno.findMany();
      reply.send(alunos);
    } catch (error) {
      console.error('Get All Alunos Error:', error);
      reply.status(500).send({ message: 'Erro ao listar alunos', error });
    }
}

export async function createAluno(request, reply) {
  try {
    const { nome, email, ra, cpf } = request.body;

    const aluno = await prisma.aluno.create({
      data: { nome, email, ra, cpf },
    });

    reply.status(201).send({ message: 'Aluno criado com sucesso', aluno }); // 201 CREATED
  } catch (error) {
    if (error.code === 'P2002') {
      // Erro de violação de unicidade
      reply.status(400).send({ message: 'Este aluno já existe' });
    } else {
      console.error('Create Aluno Error:', error);
      reply.status(500).send({ error: 'Erro ao criar aluno' });
    }
  }
}

export async function updateAluno(request, reply) {

    // captura o id do aluno da URL
    const { id } = request.params;

    // captura os dados do aluno do corpo da requisição
    const { nome, email, ra, cpf } = request.body;

    // Verifica se "ra" ou "cpf" estão presentes na requisição
    if (ra || cpf) {
        return reply.status(400).send({ error: 'Esse campo não pode ser editado' });
    }

    // atualiza os dados do aluno
    try {
        const aluno = await prisma.aluno.update({
            where: { id },
            data: { nome, email },
        });

        // retorna o aluno atualizado e uma mensagem de sucesso
        reply.send({ message: 'Aluno atualizado com sucesso', aluno });
    } catch (error) {
        // retorna uma mensagem de erro caso ocorra algum problema
        console.error('Erro ao atualizar aluno:', error.message);
        reply.status(500).send({ error: 'Erro ao atualizar aluno' });
    }
}

export async function deleteAluno(request, reply) {
  try {
    // captura o id do aluno da URL
    const { id } = request.params;

    // exclui o aluno do banco de dados pelo id
    await prisma.aluno.delete({
      where: { id },
    });

    // retorna uma mensagem de sucesso
    reply.send({ message: 'Aluno excluído com sucesso' });
  } catch (error) {
    console.error('Delete Aluno Error:', error);
    reply.status(500).send({ message: 'Erro ao excluir aluno', error });
  }
}

export default { getAllAlunos, createAluno, updateAluno, deleteAluno };
