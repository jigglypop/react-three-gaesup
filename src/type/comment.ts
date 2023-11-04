import { IUser } from './user';

export type IComments = {
  id: number;
  content: string;
  createdAt: Date;
  user: IUser;
  recomments: IComments[];
};

export type IRecomments = {
  id: number;
  content: string;
  createdAt: Date;
  recommentuser: IUser;
};
