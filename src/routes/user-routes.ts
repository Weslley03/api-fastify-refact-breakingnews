import { FastifyInstance } from 'fastify';
import { userCreate } from '../controllers/user-controllers';

async function userRoutes(fastify:FastifyInstance) {
  fastify.post('/create', userCreate);
};

export default userRoutes;  