export interface RecommendProps {
  imageUrl: string;
  description: string;
  price: number;
  recommendId: number;
}

export interface PageProps {
  pageNo: number;
  pageSize: number;
  total: number;
}

export interface StateProps {
  bannerList: any[];
  recommendList: Array<RecommendProps>;
  recommendPage: PageProps;
}