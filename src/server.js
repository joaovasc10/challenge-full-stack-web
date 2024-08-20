import fastify from "fastify";
import alunoRoutes  from "./routes/alunoRoutes.js";
import dotenv from 'dotenv';

const app = fastify({ logger: true });

dotenv.config();
console.log(process.env.DATABASE_URL);

// registros das rotas
app.register(alunoRoutes);

// confirmação de que o servidor está rodando
app.listen({ port:3333 }).then(() => {
    console.log("Server is running on port 3333");
});