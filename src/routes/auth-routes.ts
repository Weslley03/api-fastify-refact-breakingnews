import { FastifyInstance } from 'fastify';
import { userLogin } from '../controllers/auth-controllers';

async function authRoutes(fastify:FastifyInstance) {
  fastify.post('/', userLogin)
};

export default authRoutes;