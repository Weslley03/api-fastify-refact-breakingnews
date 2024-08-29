import { FastifyInstance } from 'fastify';
import { authPlugin } from '../plugins/myPlugin';
import { CombinedParamsForRemoveComment, NewsCreateBody } from '../types/news-types';
import { IParamsId } from '../types/user.types';
import { 
  findByTitle, 
  findByUser, 
  findCommentByIdNews, 
  findNewsById, 
  findTopNews, 
  likeCheck, 
  newsCreate, 
  newsFindAll, 
  removeComment, 
  updateNews
} from '../controllers/news-controllers';

async function newsRoutes(fastify:FastifyInstance) {
  fastify.post<{ Body: NewsCreateBody, Params: IParamsId }>('/create', { preHandler: authPlugin }, newsCreate);
  fastify.get("/getall", newsFindAll);
  fastify.get("/top", findTopNews);
  fastify.get("/search", findByTitle);
  fastify.get("/byUser", { preHandler: authPlugin }, findByUser);
  fastify.get('/comment/commentbyidnews/:id', findCommentByIdNews);
  fastify.get('/likecheck/:id', { preHandler: authPlugin }, likeCheck);
  fastify.patch<{ Params: CombinedParamsForRemoveComment }>("/comment/:idNews/:commentId", { preHandler: authPlugin }, removeComment); 
  fastify.get("/findId/:id", { preHandler: authPlugin }, findNewsById);
  fastify.get("/findnewsidsimple/:id", findNewsById);
  fastify.patch("/upadate/:id", { preHandler: authPlugin }, updateNews);
};

export default newsRoutes;  