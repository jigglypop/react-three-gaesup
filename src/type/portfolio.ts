export interface IIconSet {
  id: number;
  title: string;
}

export interface IImageUrl {
  id: number;
  title: string;
}

export interface IPortfolio {
  id: number;
  content: string;
  title: string;
  summary: string;
  createdAt: Date;
  viewcount: number;
  images: string;
  imageurls: IImageUrl[];
  iconsets: IIconSet[];
  site: string;
}
