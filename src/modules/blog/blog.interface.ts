import mongoose, { Model } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  isPublished: boolean;
}
export interface BlogModel extends Model<IBlog, BlogModel> {
  isBlogExist(): Promise<IBlog | null>;
}
