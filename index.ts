import fastify from "fastify";
import connectDB from './src/utils/db';
import userRoutes from './src/routes/user-routes';

const server = fastify();

//database conection function
connectDB();

server.register(userRoutes, { prefix: '/users' });

server.listen({port: 8080, host: '127.0.0.1'}, (err, address) => {
  if(err){
    console.log(`houve um erro ao rodar a aplicação: ${err}`);
    process.exit(1);
  }
  console.log(`server listening at ${address}`);
});