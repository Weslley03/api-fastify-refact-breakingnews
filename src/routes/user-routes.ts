import { FastifyInstance } from 'fastify';
import { userCreate, userUpdate, userFindById, userFindAll, userRemove } from '../controllers/user-controllers';
import { authPlugin } from '../plugins/myPlugin';
import { IParamsId, UserCreateBody, UserUpdateBody } from '../types/user.types';

async function userRoutes(fastify:FastifyInstance) {
  fastify.get('/', userFindAll);
  fastify.get<{ Params: IParamsId }>('/findbyidsimple/:id?', userFindById);
  fastify.get('/findById/:id?', { preHandler: authPlugin }, userFindById)
  fastify.post<{ Body: UserCreateBody }>('/create', userCreate);
  fastify.patch<{ Body: UserUpdateBody, Params: IParamsId }>('/findByIdUpdate/:id?', { preHandler: authPlugin }, userUpdate);
  fastify.delete<{ Params: IParamsId }>('/findByIdDelete/:id?', userRemove)
};

export default userRoutes;  