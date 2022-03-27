<template>
    <van-nav-bar
        title="地址编辑"
        left-arrow
        fixed
        placeholder
        z-index="2"
        @click-left="$router.go(-1)"
    />
    <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue';
import { Toast } from 'vant';
import { areaList } from '@vant/area-data'

export default defineComponent({
    setup() {
        const searchResult = ref([]);

        const onSave = () => Toast('save');
        const onDelete = () => Toast('delete');
        const onChangeDetail = (val) => {
            if (val) {
                searchResult.value = [
                    {
                        name: '黄龙万科中心',
                        address: '杭州市西湖区',
                    },
                ];
            } else {
                searchResult.value = [];
            }
        };

        return {
            onSave,
            onDelete,
            areaList,
            searchResult,
            onChangeDetail,
        };
    },
})

</script>

<style scoped>
</style>