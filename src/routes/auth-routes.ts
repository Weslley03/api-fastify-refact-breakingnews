import { FastifyInstance } from 'fastify';
import { userLogin } from '../controllers/auth-controllers';
import { loginUserServiceSchema } from '../schemas/auth-schemas';

async function authRoutes(fastify:FastifyInstance) {
  fastify.post('/', { schema: loginUserServiceSchema }, userLogin)
};

export default authRoutes;