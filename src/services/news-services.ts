import { INews, News } from "../models/news-model";
import { CombinedParamsForRemoveComment, INewsDocument, IResponseCreateService, IUpdateNewsBody, NewsUpdateBody } from "../types/news-types";
import { statusFailed } from "./user-services";
import { IParamsId } from "../types/user.types";

export async function createNewsService(bodyData: object): Promise<IResponseCreateService | undefined>{
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

export async function updateNewsService(idNews: IParamsId, newsForUpdate: NewsUpdateBody): Promise<IResponseCreateService | undefined> {
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