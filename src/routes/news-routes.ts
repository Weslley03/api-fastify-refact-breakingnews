import { FastifyInstance } from 'fastify';
import { authPlugin } from '../plugins/myPlugin';
import { CombinedParamsForRemoveComment, NewsCreateBody } from '../types/news-types';
import { IParamsId } from '../types/user.types';
import { 
  deleteNewsById,
  findByTitle, 
  findByUser, 
  findCommentByIdNews, 
  findNewsById, 
  findTopNews, 
  likeCheck, 
  newsCreate, 
  newsFindAll, 
  removeComment, 
  updateNews,
  likeNewsById,
  addComment,
} from '../controllers/news-controllers';
import { addCommentSchema, deleteNewsByIdSchema, findByTitleSchema, findByUserSchema, findCommentByIdNewsSchema, findNewsByIdSchema, findTopNewsSchema, likeCheckSchema, likeNewsByIdSchema, newsCreateSchema, newsFindAllSchema, removeCommentSchema, updateNewsSchema } from '../schemas/news-schemas';

async function newsRoutes(fastify:FastifyInstance) {
  fastify.post<{ Body: NewsCreateBody, Params: IParamsId }>('/create', { schema: newsCreateSchema, preHandler: authPlugin }, newsCreate);
  fastify.get("/getall", { schema: newsFindAllSchema }, newsFindAll);
  fastify.get("/top", { schema: findTopNewsSchema }, findTopNews);
  fastify.get("/search", { schema: findByTitleSchema }, findByTitle);
  fastify.get("/byUser", { schema: findByUserSchema, preHandler: authPlugin }, findByUser);
  fastify.get('/comment/commentbyidnews/:id', { schema: findCommentByIdNewsSchema }, findCommentByIdNews);
  fastify.get('/likecheck/:id', { schema: likeCheckSchema, preHandler: authPlugin }, likeCheck);
  fastify.patch<{ Params: CombinedParamsForRemoveComment }>("/comment/:idNews/:commentId", { schema: removeCommentSchema, preHandler: authPlugin }, removeComment); 
  fastify.get("/findId/:id", { schema: findNewsByIdSchema, preHandler: authPlugin }, findNewsById);
  fastify.get("/findnewsidsimple/:id", { schema: findByUserSchema}, findNewsById);
  fastify.patch("/upadate/:id", { schema: updateNewsSchema, preHandler: authPlugin }, updateNews);
  fastify.delete("/:id", { schema: deleteNewsByIdSchema, preHandler: authPlugin }, deleteNewsById);
  fastify.patch("/like/:id", { schema: likeNewsByIdSchema, preHandler: authPlugin }, likeNewsById);
  fastify.patch("/comment/:id", { schema: addCommentSchema, preHandler: authPlugin }, addComment);
};

export default newsRoutes;  