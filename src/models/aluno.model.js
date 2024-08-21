// models/aluno.model.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const Aluno = prisma.aluno;

export default Aluno;
