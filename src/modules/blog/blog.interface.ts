/* eslint-disable no-unused-vars */
import mongoose, { Model } from 'mongoose';
// Interface for blog
export interface IBlog {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  isPublished: boolean;
}
// extend the interface with mongoose model
export interface BlogModel extends Model<IBlog, BlogModel> {
  isBlogExist(id: string): Promise<IBlog | null>;
}
