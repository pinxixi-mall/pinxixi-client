<template>
  <div class="fixed-to-top van-hairline--bottom">
    <van-search v-model="searchValue" shape="round" show-action placeholder="请输入搜索关键词(TODO)">
      <template #action>
        <div>搜索</div>
      </template>
    </van-search>
  </div>
  <div class="category-box">
    <van-sidebar class="level-1" v-model="levelOne" @change="onLevelOneChange">
      <van-sidebar-item :title="item.categoryName" v-for="item in leftList" :key="item.categoryId" />
    </van-sidebar>
    <div class="content">
      <div class="level-2" v-for="item in rightList" :key="item.categoryId">
        <h4 class="title">{{ item.categoryName }}</h4>
        <van-grid square :column-num="3" :icon-size="60" :border="false">
          <van-grid-item
            v-for="it in item.children"
            :key="it.categoryId"
            :icon="it.categoryImage"
            :text="it.categoryName"
          />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getGoodsCategoryTree } from '@/api'
import { onMounted, ref, reactive, toRefs } from 'vue'

interface StateType {
  leftList: any[];
  rightList: any[];
}

export default {
  setup() {
    const searchValue = ref()
    const levelOne = ref()
    const state = reactive<StateType>({
      leftList: [],
      rightList: [],
    })

    onMounted(async () => {
      initPage()
    })

    const initPage = async () => {
      // 查询所有分类
      state.leftList = await getTreeList()

      // 默认显示第一级分类的二、三级
      state.rightList = getChildren(0)
    }

    // 获取一级分类下面的所有子级
    const getChildren = (index: number) => {
      const item: any = state.leftList.find(it => it.categoryId === state.leftList[index].categoryId)
      return item.children
    }

    // 获取所有分类
    const getTreeList = async () => {
      const { data } = await getGoodsCategoryTree()
      return data || []
    }

    // 一级分类切换
    const onLevelOneChange = (index: number) => {
      state.rightList = getChildren(index)
    }

    return {
      ...toRefs(state),
      levelOne,
      searchValue,
      onLevelOneChange
    }
  }
}
</script>

<style lang="less">
.category-box {
  height: calc(100vh - 100px);
  width: 100%;
  position: absolute;
  top: 50px;
  .level-1 {
    position: absolute;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    background-color: #f8f8f8;
  }
  .content {
    position: absolute;
    top: 0;
    left: 90px;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    padding: 0 0 40px;
    .level-2 {
      padding: 10px 0;
      .title{
        font-size: 14px;
        color: #333;
        padding: 10px 0;
      }
    }
  }
}
</style>
