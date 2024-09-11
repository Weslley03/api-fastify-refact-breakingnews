import { FastifyRequest, FastifyReply } from "fastify";
import { Readable } from "stream";
import { IParamsId } from "../../model/types/user.types";
import { 
  CombinedParamsForRemoveComment, 
  IBodyCommentAdd, 
  INewsDocument, 
  IResponseMessageandOK, 
  IUpdateNewsBody, 
  NewsCreateBody, 
  NewsUpdateBody, 
  PaginationQuery, 
  TitleParams 
} from "../../model/types/news-types";
import { 
  addCommentService, 
  countNewsServic, 
  createNewsService, 
  deleteLikeNewsByIdService, 
  deleteNewsByIdService, 
  findAllNewsService, 
  findByIdService, 
  findByIdServiceSimple, 
  findByTitleService, 
  findByUserService, 
  findCommentById, 
  findTopNewsService, 
  likeNewsByIdService, 
  removeCommentService, 
  updateNewsService 
} from "../services/news-services";


export async function newsCreate(request:FastifyRequest<{Body: NewsCreateBody}>, reply: FastifyReply){ //OK
  try{
    const { title, text, banner } = request.body;
    const userID = request.user?.id;
    
    const createResponse = await createNewsService({
      title,
      text,
      banner,
      user: userID,
    });

    if(!createResponse){
      return reply.status(500).send({
        message: "an error occurred while trying to register",
        OK: false,
      });
    }; 

    const { message, OK } = createResponse;
    if(!OK) return reply.status(500).send({message, OK})

    return reply.send({ message, OK }); 
  }catch(err){
    console.error(`an error occurred while register the news: ${err}`);
    return reply.status(500).send({err: 'an error occurred while register the news'});
  };
};

export async function newsFindAll(request:FastifyRequest<{ Querystring: PaginationQuery }>, reply: FastifyReply): Promise<void>{ //OK
  try{
    const limit: number = parseInt(request.query.limit || '6', 10);
    const offset: number = parseInt(request.query.offset || '1', 10);

    const cursor: INewsDocument[] = await findAllNewsService(offset, limit);
    const total: number = await countNewsServic();
    const currentUrl = `${request.protocol}://${request.hostname}${request.url}`;

    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}/getall?limit=${limit}&offset=${next}` : null;
    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous !== null ? `${currentUrl}/getall?limit=${limit}&offset=${previous}` : null;

    if (cursor.length === 0) {
      reply.status(404).send({ message: "no news found" });
      return;
    };

    reply.raw.setHeader('Content-Type', 'application/json');
    reply.raw.write(JSON.stringify({ nextUrl, previousUrl, limit, offset, total, results: [] }).replace('}', '[').replace('[]', ''));

    const stream = Readable.from(
      cursor.map(doc => ({
        id: doc._id,
        title: doc.title,
        text: doc.text,
        banner: doc.banner,
        likes: doc.likes,
        comments: doc.comments,
        userName: doc.user.username,
        userAvatar: doc.user.avatar,
      }))
    );

    let firstChunk = true;

    stream.on('data', (chunk) => {
      if (!firstChunk) {
        reply.raw.write(',');
      }
      firstChunk = false;
      reply.raw.write(JSON.stringify(chunk));
    });

    stream.on('end', () => {
      reply.raw.end(']}');
    });

    stream.on('error', (err) => {
      reply.status(500).send({ message: err.message });
    });
  }catch(err){
    reply.status(500).send({ message: (err as Error).message });
    console.error("error encountered:", err);
  };
};

export async function findTopNews(request: FastifyRequest, reply: FastifyReply){ //OK  
  try{
    const topNews = await findTopNewsService();
    
    if(!topNews){
      return reply.status(500).send({
        message: "an error occurred while find TOP news",
        OK: false,
      });
    };

    reply.send({
      news: {
        id: topNews._id,
        title: topNews.title,
        text: topNews.text,
        banner: topNews.banner,
        likes: topNews.likes,
        comments: topNews.comments,
        userName: topNews.user.username,
        userAvatar: topNews.user.avatar,
      },
      message: 'fin top news OK',
      OK: true,
    });
  }catch(err){
    console.error(`an error occurred while find TOP news: ${err}`);
    return reply.status(500).send({err: 'an error occurred while find TOP news'});
  };
};

export async function findByTitle(request: FastifyRequest<{ Querystring: TitleParams }>, reply:FastifyReply){ //OK
  try{
    const title = request.query.title;  
    
    const newsByTitle: INewsDocument[] = await findByTitleService(title);
    if(!newsByTitle){
      return reply.status(500).send({
        message: "an error occurred while findByTitle news",
        OK: false,
      });
    };

    const formaattedNews = newsByTitle.map(news => ({
      id: news._id,
      title: news.title,
      text: news.text,
      banner: news.banner,
      likes: news.likes,
      comments: news.comments,
      userName: news.user.username,
      userAvatar: news.user.avatar,
    }));

    reply.send({
      news: formaattedNews,
      message: 'findByTitle news OK',
      OK: true,
    });

  }catch(err){
    console.error(`an error occurred while findByTitle news: ${err}`);
    return reply.status(500).send({err: 'an error occurred while findByTitle news'});
  };
};

export async function findByUser(request: FastifyRequest, reply: FastifyReply) { //OK
  try{
   const userID = request.user?.id;
   const newsFindUser: INewsDocument[] = await findByUserService(userID);
   if(!newsFindUser){
    return reply.status(500).send({
      message: "an error occurred while findByUser news",
      OK: false,
    });
   };

    const formaattedNews = newsFindUser.map(news => ({
      id: news._id,
      title: news.title,
      text: news.text,
      banner: news.banner,
      likes: news.likes,
      comments: news.comments,
      userName: news.user.username,
      userAvatar: news.user.avatar,
    }));

    reply.send({
      news: formaattedNews,
      message: 'findByTitle news OK',
      OK: true,
    });

  }catch(err){
    console.error(`an error occurred while findByUser news: ${err}`);
    return reply.status(500).send({err: 'an error occurred while findByUser news'});
  };
};

export async function findCommentByIdNews(request: FastifyRequest<{ Params: IParamsId }>, reply: FastifyReply){ //OK
  try{
    const idNews: IParamsId = request.params;
    
    const news = await findCommentById(idNews);
    if(!news){
      return reply.status(500).send({
        message: "an error occurred while findByUser news",
        OK: false,
      });
     };
     
     reply.status(200).send({
      news: {
        comments: news.comments,
      },
    });
  }catch(err){
    console.error(`an error occurred while findCommentByIdNews news: ${err}`);
    return reply.status(500).send({err: 'an error occurred while findCommentByIdNews news'});
  };
};

export async function likeCheck(request: FastifyRequest<{ Params: IParamsId }>, reply: FastifyReply){ //OK
  try{
    const idNews = request.params; 
    const news =  await findByIdServiceSimple(idNews);
    if(!news){
      return reply.status(500).send({
        message: "an error occurred while findByUser news",
        OK: false,
      });
    };
    
    const liked = news.likes;
    if(!liked) return reply.status(404).send({ message: "there was a problem in the system" });

    return reply.send({ news });
  }catch(err){
    console.error(`an error occurred while likeCheck news: ${err}`);
    return reply.status(500).send({err: 'an error occurred while likeCheck news'});
  }
};

export async function removeComment(request: FastifyRequest<{ Params: CombinedParamsForRemoveComment }>, reply: FastifyReply){
  try{
    const id = request.user?.id;
    if(!id){
      return reply.status(500).send({
        message: "you are not logged in correctly",
        OK: false,
      });
    };
    const { idNews, commentId } = request.params;

    const updatedNews = await removeCommentService({ id, idNews, commentId });

    if(!updatedNews){
      return reply.status(500).send({
        message: "an error occurred while removeComment news",
        OK: false,
      });
    };

    if(updatedNews.comments.userId !==  id) return reply.status(500).send({ message: "you can't delete this comment", OK: false });

    reply.status(200).send({ 
      message: "comment successfully removed", 
      OK: true 
    });

  }catch(err){
    console.error('error while removing comment:', err);
    reply.status(500).send({ message: "An error occurred while removing the comment" });
  }
};

export async function findNewsById(request: FastifyRequest<{ Params: IParamsId }>, reply: FastifyReply){
  try{
    const id = request.params;

    const noticia = await findByIdService(id);
    if(!noticia){
      return reply.status(500).send({
        message: "could not find this news",
        OK: false,
      });
    };

    reply.status(200).send({
      noticia: {
        id: noticia._id,
        title: noticia.title,
        text: noticia.text,
        banner: noticia.banner,
        likes: noticia.likes,
        comments: noticia.comments,
        //name: noticia.user.name,
        userName: noticia.user.username,
        userAvatar: noticia.user.avatar,
      },
    });
  }catch(err){
    console.error('error while findNewsById news:', err);
    reply.status(500).send({ message: "An error occurred while findNewsById the news" });
  };
};

export async function updateNews(request: FastifyRequest<{ Params: IParamsId, Body: IUpdateNewsBody }>, reply: FastifyReply){
  try{
    const idNews = request.params;
    const userID = request.user?.id;
    const { title, text, banner } = request.body;

    const news = await findByIdServiceSimple(idNews);
    if (!news) return reply.status(404).send({ message: "notícia não encontrada" });

    const NewsUpdatePayload: NewsUpdateBody ={
      ...(title && {title}),
      ...(text && {text}),
      ...(banner && {banner}),
    };

    const IDUSER = news.user.toString();
    if (IDUSER != userID) {
      return reply
        .status(404)
        .send({ message: "você não tem permissão para mudar essa noticia" });
    };

    const updateResponse = await updateNewsService(idNews, NewsUpdatePayload);
    if (!updateResponse) {
      return reply
        .status(404)
        .send({ message: "não foi Possivel atualizar a noticia" });
    };

    return reply.status(200).send({ message: "noticia atualizada com sucesso" });
  }catch(err){
    console.error('error while updateNews news:', err);
    reply.status(500).send({ message: "An error occurred while updateNews the news" });
  };
};

export async function deleteNewsById(request: FastifyRequest<{ Params: IParamsId }>, reply: FastifyReply){ //OK
  try{
    const idNews = request.params;
    const userID = request.user?.id;

    const news = await findByIdServiceSimple(idNews);

    if(!news) return reply.status(500).send({ message: "it was not possible to perform this task" });

    if (news?.user.toString() != userID?.toString()) {
      return reply
        .status(404)
        .send({ message: "you have not permission for delete this user" });
    };

    const deleteResponse: IResponseMessageandOK | undefined = await deleteNewsByIdService(idNews);
    if(!deleteResponse){
      return reply.status(500).send({
        message: "an error occurred while trying to delete user",
        OK: false,
      });
    }; 

    const { message, OK } = deleteResponse;

    return reply.send({ message, OK });
  }catch(err){
    console.error(`an error occurred while deleteNewsById this news: ${err}`);
    return reply.status(500).send({err: 'an error occurred while deleteNewsById this news'});
  };
};

export async function likeNewsById(request: FastifyRequest<{ Params: IParamsId }>, reply: FastifyReply) { //OK
  try{
    const idNews = request.params;
    const userID = request.user?.id;
    if(!userID) return reply.send({ message: 'o user não está autenticado.', OK: false });

    const { message, OK, ok}  = await likeNewsByIdService(idNews, userID);
    if (ok === false) {
      await deleteLikeNewsByIdService(idNews, userID);
      return reply.status(200).send({ message: `post DESCURTIDO com sucesso.` });
    }
    
    return reply.send({ message, OK });
  }catch(err){
    console.error(`an error occurred while deleteNewslikeNewsByIdById this news: ${err}`);
    return reply.status(500).send({err: 'an error occurred while likeNewsById this news'});
  };
};

export async function addComment(request: FastifyRequest <{ Params: IParamsId, Body: IBodyCommentAdd }>, reply: FastifyReply) {
  try{
    const userID = request.user?.id;
    const idNews = request.params;
    const commentBody = request.body;

    const addCommentResponse = await addCommentService(userID, idNews, commentBody);
    if(!addCommentResponse){
      return reply.status(500).send({
        message: "an error occurred while trying to addComment in this news",
        OK: false,
      });
    }; 

    const { message, OK } = addCommentResponse;
    
    return reply.status(200).send({ message, OK });
  }catch(err){
    console.error(`an error occurred while addComment this news: ${err}`);
    return reply.status(500).send({err: 'an error occurred while addComment this news'});
  };
};