export interface RecommendProps {
  imageUrl: string;
  description: string;
  price: number;
  recommendId: number;
}

export interface PageProps {
  pageNum: number;
  pageSize: number;
  total: number;
}

export interface StateProps {
  carouselList: any[];
  recommendList: Array<RecommendProps>;
  recommendPage: PageProps;
}