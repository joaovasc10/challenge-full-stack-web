// middlewares/auth.js

export default function authMiddleware(app) {
  // Adiciona o método 'authenticate' ao objeto 'app'
  app.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  // Adiciona um hook 'preHandler' que usa o método 'authenticate'
  app.addHook('preHandler', async (request, reply) => {
    try {
      await app.authenticate(request, reply);
    } catch (err) {
      reply.send(err);
    }
  });
}