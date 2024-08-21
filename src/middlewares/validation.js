// src/middlewares/validation.js

export function validate(schema) {
  return (request, reply, done) => {
    const result = schema.safeParse(request.body);
    if (!result.success) {
      reply.status(400).send(result.error);
    } else {
      done();
    }
  };
}
