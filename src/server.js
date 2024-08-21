import fastify from "fastify";
import jwt from '@fastify/jwt';
import alunoRoutes from "./routes/alunoRoutes.js";
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import authMiddleware from './middlewares/auth.js';

dotenv.config();
// console.log(process.env.DATABASE_URL);

const app = fastify({ logger: true });

// Registre o plugin JWT com a chave secreta do JWT carregada do arquivo .env
app.register(jwt, {
    secret: process.env.JWT_SECRET,
});

// Registre as rotas públicas (sem autenticação)
await app.register(authRoutes);

// Registre o middleware de autenticação para proteger as rotas que precisam de proteção
app.register(async function (app) {
    // Middleware para adicionar o decorador authenticate a todas as rotas registradas a seguir
    app.decorate('authenticate', async function (request, reply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });

    // Registre as rotas protegidas aqui
    app.register(alunoRoutes, { onRequest: [app.authenticate] });
});

// Confirmação de que o servidor está rodando
app.listen({ port: 3333 }).then(() => {
    console.log("Server is running on port 3333");
});