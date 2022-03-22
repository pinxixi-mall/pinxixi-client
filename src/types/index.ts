export interface RecommendType {
    imageUrl: string;
    description: string;
    price: number;
    recommendId: number;
}

export interface PageType {
    pageNum: number;
    pageSize: number;
    total: number;
}

export interface HomeStateType {
    carouselList: any[];
    recommendList: Array<RecommendType>;
    recommendPage: PageType;
}

export interface GoodsCategoryType {
    categoryId: number;
    categoryName: string;
    categoryLevel: number;
    categoryImage: number;
}

export interface GoodsType {
  goodsName: string;
  goodsImage: string;
  goodsPrice: number;
  goodsDesc: string;
}