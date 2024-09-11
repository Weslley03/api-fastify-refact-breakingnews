import { FastifyInstance } from 'fastify';
import { userCreate, userUpdate, userFindById, userFindAll, userRemove } from '../controller/controllers/user-controllers';
import { authPlugin } from '../plugins/myPlugin';
import { IParamsId, UserCreateBody, UserUpdateBody } from '../model/types/user.types';
import { createUserServiceSchema, deleteUserServiceSchema, findAllUserServiceSchema, GetByIdServiceSchema, updateUserServiceSchema } from '../model/schemas/users-schemas';

async function userRoutes(fastify:FastifyInstance) {
  fastify.get('/', { schema: findAllUserServiceSchema }, userFindAll);
  fastify.get<{ Params: IParamsId }>('/findbyidsimple/:id?', { schema: GetByIdServiceSchema }, userFindById);
  fastify.get('/findById/:id?', { schema: GetByIdServiceSchema, preHandler: authPlugin }, userFindById)
  fastify.post<{ Body: UserCreateBody }>('/create', { schema: createUserServiceSchema }, userCreate);
  fastify.patch<{ Body: UserUpdateBody, Params: IParamsId }>('/findByIdUpdate/:id?', { schema: updateUserServiceSchema, preHandler: authPlugin }, userUpdate);
  fastify.delete<{ Params: IParamsId }>('/findByIdDelete/:id?', { schema: deleteUserServiceSchema }, userRemove)
};

export default userRoutes;  