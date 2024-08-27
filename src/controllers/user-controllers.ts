import { FastifyRequest, FastifyReply } from "fastify";
import { generateToken, createUserService } from "../services/user.services";
import { UserCreateBody } from "../types/user.types";

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
    const usertoken = await generateToken(user._id);
    return reply.send({ usertoken, message, OK });
  }catch(err){
    console.error(`an error occurred while register the user: ${err}`);
    return reply.status(500).send({err: 'an error occurred while register the user'})
  };
};