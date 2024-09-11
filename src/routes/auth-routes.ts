import { FastifyInstance } from 'fastify';
import { userLogin } from '../controller/controllers/auth-controllers';
import { loginUserServiceSchema } from '../model/schemas/auth-schemas';

async function authRoutes(fastify:FastifyInstance) {
  fastify.post('/', { schema: loginUserServiceSchema }, userLogin)
};

export default authRoutes;