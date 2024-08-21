// middlewares/authRoutes.js

import { login, register } from '../controllers/authController.js';
import { validate } from '../middlewares/validation.js';
import { z } from 'zod';

const authSchema = z.object({
    // Define um schema para a validação dos dados
    email: z.string().email(),
    password: z.string().min(6),
});

export default async function authRoutes(app, options) {
  app.post('/login', { preHandler: [validate(authSchema)] }, login);
  app.post('/register', { preHandler: [validate(authSchema)] }, register);
}