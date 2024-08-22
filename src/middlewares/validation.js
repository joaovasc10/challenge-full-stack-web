// src/middlewares/validation.js

export function validate(schema) {
  return (request, reply, done) => {
    // Valida o corpo da requisição com o schema fornecido
    const result = schema.safeParse(request.body);
    // Se a validação falhar, responde com status 400 e o erro
    if (!result.success) {
      reply.status(400).send(result.error);
    } else {
      // Se a validação passar, chama o próximo middleware
      done();
    }
  };
}

