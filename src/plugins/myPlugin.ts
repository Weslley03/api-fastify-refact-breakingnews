import { FastifyRequest, FastifyReply } from 'fastify';
import { GetByIdService } from '../services/user.services';
import { verify, JwtPayload  } from "jsonwebtoken";
import dotenv from "dotenv";
import { IParamsId } from '../types/user.types';
dotenv.config();

interface JwtPayloadWithId extends JwtPayload {
  userId?: string;
};

const SECRET_JWT = process.env.SECRET_JWT;
if(!SECRET_JWT) throw new Error('SECRET_KEY is not defined in the environment variables');

export const authPlugin = async (request: FastifyRequest<{ Params: IParamsId }>, reply: FastifyReply) => {
  const { authorization } = request.headers;
  if(!authorization) return reply.status(404).send("header without authorization");

  const parts = authorization.split(' ');
  const [ schema, token ] = parts;
  
  if(parts.length !== 2) return reply.status(404).send("token out of format 'Bearer xxxxxx'"); 
  if(schema !== 'Bearer') return reply.status(404).send("token out of format"); 

  try{
    const decoded = verify(token, SECRET_JWT) as JwtPayloadWithId;

    if (decoded.userId) {
      const user = await GetByIdService(decoded.userId);
      user
      
      if (!user || !user._id) {
        return reply.status(401).send({ message: "user or id invalid" });
      }

      (request as any).user = { id: user._id };
      return;
    } else {
      return reply.status(401).send({ message: "token invalid or missing ID" });
    }
  }catch(err){
    console.error(`JWT verification error: ${err}`);
    return reply.status(401).send({ message: "token invalid" });
  };
};
