import { FastifyRequest, FastifyReply } from "fastify";
import { IParamsId, UserCreateBody, UserUpdateBody } from "../../model/types/user.types";
import { 
  generateToken, 
  createUserService, 
  updateUserService, 
  GetByIdService, 
  findAllUserService, 
  deleteUserService 
} from "../services/user-services";

export async function userCreate(request: FastifyRequest<{ Body: UserCreateBody }>, reply: FastifyReply) {
  try{
    const { name, userName, email, password, avatar, background } = request.body;
    if (!name || !userName || !email || !password || !avatar || !background) {
      reply.status(400).send({ 
        message: "there are missing fields to be filled in",
        OK: false,
      });
    };
    
    const registerResponse = await createUserService(request.body);
    if(!registerResponse){
      return reply.status(500).send({
        message: "an error occurred while trying to register",
        OK: false,
      });
    }; 

    const { user, message, OK } = registerResponse;
    if(!OK) return reply.status(400).send({ message, OK });
    
    const tokenUser = await generateToken(user._id);
    if(!tokenUser) return reply.status(400).send({ message: 'não foi possivel gerar seu token de segurança.' });
    
    return reply.send({ user, tokenUser, message, OK });
  }catch(err){
    console.error(`an error occurred while register the user: ${err}`);
    return reply.status(500).send({err: 'an error occurred while register the user'})
  };
};

export async function userUpdate(request: FastifyRequest<{ Body: UserUpdateBody, Params: IParamsId }>, reply: FastifyReply) {
  try {
      const { id } = request.params;
      console.log(id)
      const { name, userName, email, password, avatar, background } = request.body;
    
      const userUpdatePayload: UserUpdateBody = {
        ...(name && {name}),
        ...(userName && {userName}),
        ...(email && {email}),
        ...(password && {password}),
        ...(avatar && {avatar}),
        ...(background && {background}),
      };
    
      const updateResponse = await updateUserService(id, userUpdatePayload); 
      if(!updateResponse){
        return reply.status(500).send({
          message: "an error occurred while trying to update",
          OK: false,
        });  
      };
      const { user, message, OK } = updateResponse;
      if(!OK) return reply.status(400).send({ message, OK });
      return reply.status(200).send({ user, message, OK });
  } catch (err) {
    console.error('houve um erro na execução da função de UPDATE:', err) 
    return reply.status(500).send({ error: 'an error occurred while updating the profile' });
  }
};

export const userFindById = async (request: FastifyRequest<{ Params: IParamsId }>, reply: FastifyReply) => {
  try {
    let { id } = request.params;
    if(!id){
      const userID = request.user?.id;
      const user = await GetByIdService(userID);
      return reply.status(200).send(user);
    };
    const user = await GetByIdService(id);
    return reply.status(200).send({ user });
  } catch (err) {
    reply.status(500).send({ error: 'an error occurred while finding the profile' });
  }
};

export async function userFindAll(request: FastifyRequest, reply: FastifyReply){
  try{
    const users = await findAllUserService();
    if(!users) return reply.status(400).send({ message: "there are no users to search for" });
    
    return reply.send(users);
  }catch(err){
    console.error('houve um erro na execução da função de FINDALL:', err) 
    return reply.status(500).send({ error: 'an error occurred while finding the profile' });
  };
};

export async function userRemove(request: FastifyRequest<{ Params: IParamsId }>, reply: FastifyReply) {
  try{
    const { id } = request.params; 
    const deleteResponse = await deleteUserService(id);
    if(!deleteResponse) return reply.status(500).send({ error: 'an error occurred while delete the profile' });
    return reply.status(200).send({ message: 'user delete' }); 
  }catch(err){
    console.error('houve um erro na execução da função de DELETE:', err) 
    return reply.status(500).send({ error: 'an error occurred while delete the profile' });
  };
};