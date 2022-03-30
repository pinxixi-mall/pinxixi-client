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
        ref="addressEditRef"
        :address-info="addressEditInfo"
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
    />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { ref } from 'vue';
import { Toast } from 'vant';
import { areaList } from '@vant/area-data'
import { getAddressById } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import type { AddressEditInstance, AddressEditInfo } from 'vant'

export default defineComponent({
    setup() {
        const route = useRoute()
        const router = useRouter()
        const addressEditRef = ref<AddressEditInstance>()
        const addressEditInfo = ref<AddressEditInfo>()
        let addressId: number
        
        onMounted(() => {
            const { id } = route.query
            if (id) {
                addressId = +id
                getAddresInfo()
            }
        })

        const getAddresInfo = async () => {
            const { data } = await getAddressById(addressId)
            const { county, isDefault } = data
            data.areaCode = county
            data.isDefault = isDefault === 1
            addressEditInfo.value = data
        }



        const onSave = () => {

        }
        const onDelete = () => {

        }

        return {
            addressEditRef,
            areaList,
            addressEditInfo,
            onSave,
            onDelete,
        };
    },
})

</script>

<style scoped>
</style>