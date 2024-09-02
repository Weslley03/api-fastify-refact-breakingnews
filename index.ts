import fastify from "fastify";
import connectDB from './src/utils/db';
import cors from '@fastify/cors';
import dotenv from "dotenv";
dotenv.config();

const server = fastify();

server.register(cors, {
  origin: 'https://api-breaknews-5dmg.onrender.com',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

//database conection function
connectDB();

import { docRoutes } from './src/routes/doc-routes';
docRoutes(server);

import userRoutes from './src/routes/user-routes';
server.register(userRoutes, { prefix: '/users' });

import authRoutes from './src/routes/auth-routes';
server.register(authRoutes, { prefix: '/auth' });

import newsRoutes from './src/routes/news-routes';
server.register(newsRoutes, { prefix: '/news' });

const port = Number(process.env.PORT) || 8080;
if(!port) throw new Error('PORT is not defined in the environment variables');

server.listen({port: port, host: '0.0.0.0'}, (err, address) => {
  if(err){
    console.log(`houve um erro ao rodar a aplicação: ${err}`);
    process.exit(1);
  }
  console.log(`server listening at ${address}`);
});
