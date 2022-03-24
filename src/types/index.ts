
// 推荐商品
export interface RecommendType {
    recommendId: number;
    recommendDesc: string;
    goodsId: number;
    goodsImage: string;
    goodsPrice: number;
}

// 分页参数
export interface PageType {
    pageNum: number;
    pageSize: number;
    total: number;
}

// 商品分类
export interface GoodsCategoryType {
    categoryId: number;
    categoryName: string;
    categoryLevel: number;
    categoryImage: number;
}

// 商品详情
export interface GoodsType {
  goodsId: number;
  goodsName: string;
  goodsImage: string;
  goodsPrice: number;
  goodsDesc: string;
  goodsDetail: string;
}

// 路径参数id
export type PathIdType = number | string | string[]

// 新增购物车
export interface CartItemAddType {
  goodsId: number;
  goodsCount: number;
}

// 更新购物车
export interface CartItemUpdateType {
  cartId: number;
  goodsCount: number;
  isDeleted?: boolean;
}

// 删除购物车
export interface CartItemDeleteType {
  cartIds: number[];
}

// 购物车项
export interface CartItemType {
  cartId: number;
  goodsId: number;
  goodsName: string;
  goodsDesc: string;
  goodsCount: number;
  goodsPrice: number;
  goodsImage: string;
}