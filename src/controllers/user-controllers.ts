import { FastifyRequest, FastifyReply } from "fastify";
import { generateToken, createUserService, updateUserService } from "../services/user.services";
import { IParamsId, UserCreateBody, UserUpdateBody } from "../types/user.types";

export async function userCreate(request: FastifyRequest<{ Body: UserCreateBody }>, reply: FastifyReply) {
  try{
    const { name, userName, email, password, avatar, background } = request.body;
    if (!name || !userName || !email || !password || !avatar || !background) {
      reply.status(400).send({ 
        message: "there are missing fields to be filled in",
        OK: false,
      });
    };
    const registerResponse  = await createUserService(request.body);
    if(!registerResponse){
      return reply.status(500).send({
        message: "an error occurred while trying to register",
        OK: false,
      });
    }; 
    const { user, message, OK } = registerResponse;
    if(!OK) return reply.status(400).send({ message, OK });
    const usertoken = await generateToken(user._id);
    return reply.send({ usertoken, message, OK });
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