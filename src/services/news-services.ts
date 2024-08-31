import { INews, News } from "../models/news-model";
import { CombinedParamsForRemoveComment, IBodyCommentAdd, INewsDocument, IResponseLikeNewsById, IResponseMessageandOK, IUpdateNewsBody, NewsUpdateBody } from "../types/news-types";
import { statusFailed } from "./user-services";
import { IParamsId } from "../types/user.types";

export async function createNewsService(bodyData: object): Promise<IResponseMessageandOK | undefined>{
  try{
    const news = await News.create(bodyData)
    if(!news) return statusFailed('could not create news');

    return {
      message: 'CADASTRO of NEWS OK',
      OK: true
    };
  }catch(err){
    console.error(`there was an error in the application service: ${err}`);
    return undefined;
  };
};

export async function findAllNewsService(limit:number, offset: number): Promise<INewsDocument[]> {
  try{
    const newsCursor = News.find()
      .sort({ _id: -1 }) 
      .skip(offset)     
      .limit(limit)     
      .populate('user')  
      .cursor();

    const newsDocuments = await newsCursor.toArray();
    
    return newsDocuments;
  }catch(err){
    console.error('error fetching news articles:', err);
    throw new Error('failed to fetch news articles');
  };
};

export async function findTopNewsService(): Promise<INewsDocument | null> {
  try{
    return News.findOne().sort({_id: -1}).populate('user') as Promise<INewsDocument | null>
  }catch(err){
    console.error('error fetching news articles:', err);
    throw new Error('failed to fetch news articles');
  };
};

export async function findByTitleService(title:string): Promise<INewsDocument[]>{
  return News.find({
    title: { $regex: `${title || ''}`, $options: 'i' }
  })
    .sort({ _id: -1 }).populate('user') as unknown as Promise<INewsDocument[]>
};

export async function countNewsServic() {
  const count = await News.countDocuments().exec();
  return count;
};

export async function findByUserService(userId: string | undefined): Promise<INewsDocument[]>{
  return News.find({
    user: userId }).sort({ _id: -1 }).sort({ _id: -1 })
    .populate('user') as unknown as Promise<INewsDocument[]>
};

export async function findCommentById(idNews: IParamsId | undefined): Promise<INewsDocument>{
  try{
    return await News.findById(idNews?.id).populate('comments') as unknown as Promise<INewsDocument>
  }catch(err){
    console.error('error fetching news', err);
    throw new Error('failed to fetch news');
  };
};

export async function findByIdServiceSimple(idNews: IParamsId) {
  try{
    const ID = idNews.id;
    const news = await News.findById(ID)
    return news
  }catch(err){
    return console.error('error findByIdServiceSimple news', err);
  };  
};

export async function removeCommentService(dataObject: CombinedParamsForRemoveComment): Promise<INewsDocument | null> {
  try{
    const { commentId, id, idNews } = dataObject;

    const convertedCommentId = commentId.toString();
    const convertedUserID = id.toString();
    const convertedIdNews = idNews.toString();
    
    const updateData: any = await News.findOneAndUpdate({ 
      _id: convertedIdNews },
       { $pull: { comments: { commentId: convertedCommentId, userId: convertedUserID } } }, 
       { new: true }).exec();

       if (updateData) {
        updateData.likes = typeof updateData.likes === 'string' ? parseInt(updateData.likes, 10) : updateData.likes;
      }

      return updateData;
  }catch(err){
    console.error('error deleting comment', err);
    return null;
  };
};

export async function findByIdService(idNews: IParamsId): Promise<INewsDocument | undefined> {
  try{
    return await News.findById(idNews.id).populate('user') as unknown as Promise<INewsDocument>
  }catch(err){
    console.error('error findByIdService news', err);
    return undefined;
  };
};

export async function updateNewsService(idNews: IParamsId, newsForUpdate: NewsUpdateBody): Promise<IResponseMessageandOK | undefined> {
  try{
    const ID = idNews.id;
    const upadate = await News.findByIdAndUpdate(ID, newsForUpdate, { new: true }).exec();
    if (!upadate) return statusFailed('could not update user');

    return {
      message: 'UPDATE OK',
      OK: true
    }
  }catch(err){
    console.error('error updateNewsService news', err);
    return undefined;
  };
};

export async function deleteNewsByIdService(idNews: IParamsId): Promise<IResponseMessageandOK | undefined> { //OK
  try{
    const IDNEWS = idNews.id;
    
    const response = await News.findByIdAndDelete({ _id: IDNEWS });
    if (!response) return statusFailed('could not delte news');
  
    return {
      message: 'DELETE NEWS OK',
      OK: true,
    }
  }catch(err){
    console.error(`there was an error in the application service: ${err}`);
    return undefined;
  }
};

export async function likeNewsByIdService (idNews: IParamsId, userLiked: string | undefined): Promise<IResponseLikeNewsById> { //OK
  try {
    const IDNEWS = idNews.id.toString();
    const IDUSER = userLiked?.toString();
    
    const response = await News.findOneAndUpdate( { 
     _id: IDNEWS, 
     'likes.userLiked': { $nin: [IDUSER] } },
     { $push: { likes: { userLiked: IDUSER, created: new Date() } } }, { new: true, upsert: false } );
    
    if (!response) {
      return{
        message: 'function like pass.',
        OK: true,
        ok: false
      }
    }
    
    return{
      message: 'function like pass.',
      OK: true,
      ok: true
    };
  }catch (err) {
    console.error(`there was an error in the application service: ${err}`);
    return{
      message: 'function like NOpass.',
      OK: false,
      ok: false
    };
  }
};

export async function deleteLikeNewsByIdService(idNews: IParamsId, userLiked: string | undefined): Promise<IResponseMessageandOK | undefined>{ //OK
  try{
    const IDNEWS = idNews.id.toString();
    const IDUSER = userLiked?.toString();

    const response = await News.findOneAndUpdate( { _id: IDNEWS }, { $pull: { likes: { userLiked: IDUSER } } } );

    if (!response) return statusFailed('could not deleteLikeNewsById news');
    return {
      message: 'DESCURTIDO OK',
      OK: true,
    };

  }catch(err){
    console.error(`there was an error in the application service: ${err}`);
    return undefined;
  };
};

export async function addCommentService(userID: string | undefined, idNews: IParamsId, commentBody: IBodyCommentAdd): Promise<IResponseMessageandOK>{ //OK
  try{
    const IDNEWS = idNews.id.toString();
    const IDUSER = userID?.toString();
    const COMMENTBODY = commentBody.comment;
    const commentId = Math.floor(Date.now() * Math.random()).toString(36);

    const response = await News.findByIdAndUpdate( { _id: IDNEWS }, { $push: { comments: { commentId, IDUSER, COMMENTBODY, createdAt: new Date()} } } );
    if (!response) return statusFailed('could not addCommentService news');

    return {
      message: 'comment adding',
      OK: true,
    };
  }catch(err){
    console.error(`there was an error in the application service: ${err}`);
    return {
      message: 'there was an error in the application service:',
      OK: false,
    };
  };
};