import { IComments } from './comment';
import { ITagItem } from './tag';
import { IUser } from './user';

export type IPost = {
  // [x: string]: ReactNode;
  id: number;
  title: string;
  summary: string;
  content: string;
  images: string;
  viewcount: number;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  tags: ITagItem[];
  comments: IComments[];
  postcount?: number;
  last?: number;
  commentcount?: number;
};

export type IWrite = {
  id: number;
  title: string;
  summary: string;
  content: string;
  images: string;
  user: IUser;
  category: string;
  tags: string[];
};

export type ITempImage = {
  url: string;
};
