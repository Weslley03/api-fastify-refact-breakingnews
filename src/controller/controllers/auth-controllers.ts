import { FastifyReply, FastifyRequest } from "fastify";
import { UserLoginBody } from "../../model/types/user.types";
import { loginUserService } from "../services/auth-services";
import { generateToken } from "../services/user-services";
import * as dotenv from "dotenv";
dotenv.config();

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
    
    const token = await generateToken(user._id);
    if(!token) {
      return reply.status(400).send({ message: 'we were unable to generate your security token.' });
    } else {
      return reply.status(200).send({ token, message, OK });
    };
  }catch(err){
    console.error(`an error occurred while login the user: ${err}`);
    return reply.status(500).send({err: 'an error occurred while login the userr'})
  };
};