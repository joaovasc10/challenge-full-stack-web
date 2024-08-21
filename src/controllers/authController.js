// src/controllers/authController.js

import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export async function register(request, reply) {
  try {
    const { email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = this.jwt.sign({ id: user.id }, { expiresIn: 300 });
    reply.send({ user, token });
  } catch (error) {
    if (error.code === 'P2002') {
      // Se o erro for uma violação de unicidade
      reply.status(409).send({ message: 'Email already in use' });
    } else {
      console.error('Register Error:', error);
      reply.status(500).send({ message: 'Internal Server Error', error });
    }
  }
}

export async function login(request, reply) {
  try {
    const { email, password } = request.body;
    const user = await User.findUnique({ where: { email } });

    if (!user) {
      return reply.status(401).send({ message: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return reply.status(401).send({ message: 'Invalid email or password' });
    }

    const token = this.jwt.sign({ id: user.id }, { expiresIn: 300 });
    return reply.send({ user, token });
  } catch (error) {
    console.error('Login Error:', error);
    reply.status(500).send({ message: 'Internal Server Error', error });
  }
}