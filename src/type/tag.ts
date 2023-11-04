import { IPost } from "./post";

export type ITag = {
    id: number;
    title: string;
    posts: IPost[];
};

export type ITagItem = {
    id: number;
    title: string;
};
