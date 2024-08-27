import { FastifyReply, FastifyRequest } from "fastify";
import { UserLoginBody } from "../types/user.types";
import { loginUserService } from "../services/auth-services";
import { generateToken } from "../services/user.services";

export async function userLogin(request: FastifyRequest<{ Body: UserLoginBody }>, reply: FastifyReply){
  try{
    const { email, password } = request.body;
    const loginResponse = await loginUserService(email, password);
    if(!loginResponse){
      return reply.status(500).send({
        message: "an error occurred while trying to login",
        OK: false,
      });  
    };
    const { user, message, OK } = loginResponse;
    if(!OK) return reply.status(400).send({ message, OK });
    
    const userToken = await generateToken(user._id);
    return reply.status(200).send({ userToken, message, OK });
  }catch(err){
    console.error(`an error occurred while login the user: ${err}`);
    return reply.status(500).send({err: 'an error occurred while login the userr'})
  };
};