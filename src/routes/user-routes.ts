import { FastifyInstance } from 'fastify';
import { userCreate, userUpdate, userFindById, userFindAll } from '../controllers/user-controllers';
import { authPlugin } from '../plugins/myPlugin';
import { IParamsId, UserCreateBody, UserUpdateBody } from '../types/user.types';

async function userRoutes(fastify:FastifyInstance) {
  fastify.get('/', userFindAll);
  fastify.get<{ Params: IParamsId }>('/findbyidsimple/:id?', userFindById);
  fastify.post<{ Body: UserCreateBody }>('/create', userCreate);
  fastify.patch<{ Body: UserUpdateBody, Params: IParamsId }>('/findByIdUpdate/:id?', { preHandler: authPlugin }, userUpdate);
};

export default userRoutes;  