<template>
    <van-nav-bar
        :title="pageType === 'ADD' ? '新增地址' : '编辑地址'"
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
        :show-delete="pageType === 'EDIT'"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @change-area="onAreaChange"
        @save="onSave"
        @delete="onDelete"
    />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { ref } from 'vue';
import { Dialog, Toast } from 'vant';
import { areaList } from '@vant/area-data'
import { getAddressById, addAddress, updateAddress, deleteAddress } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import type { AddressEditInstance, AddressEditInfo } from 'vant'
import { Address } from '@/types'

export default defineComponent({
    setup() {
        const route = useRoute()
        const router = useRouter()
        const addressEditRef = ref<AddressEditInstance>()
        const addressEditInfo = ref<AddressEditInfo>()
        const addressFromData = ref<Partial<Address>>({})
        const pageType = ref<any>()
        let addressId: number

        onMounted(() => {
            const { id, type } = route.query
            pageType.value = type
            if (id) {
                addressId = +id
                getAddresInfo()
            }
        })

        const getAddresInfo = async () => {
            const { data } = await getAddressById(addressId)
            const { countyCode, isDefault } = data
            data.areaCode = countyCode
            data.isDefault = isDefault === 1
            addressEditInfo.value = data
            addressFromData.value = data
        }

        // 修改地区
        const onAreaChange = (values: any) => {
            addressFromData!.value!.provinceCode = values[0].code
            addressFromData!.value!.cityCode = values[1].code
            addressFromData!.value!.countyCode = values[2].code
        }

        // 保存
        const onSave = async (content: AddressEditInfo) => {
            let param: any = Object.assign({}, addressFromData.value, content)
            if (typeof param.isDefault === 'boolean') {
                // 布尔转数字提交
                param.isDefault = +param.isDefault
            }
            let fetchApi = pageType.value === 'ADD' ? addAddress : updateAddress
            await fetchApi(param)
            Toast(`${pageType.value === 'ADD' ? '新增' : '编辑'}地址成功`)
        }

        // 删除
        const onDelete = async () => {
            await Dialog.confirm({
                title: '确认删除这个地址？'
            })
            await deleteAddress(addressId)
            router.go(-1)
        }

        return {
            addressEditRef,
            areaList,
            addressEditInfo,
            pageType,
            onAreaChange,
            onSave,
            onDelete,
        };
    },
})

</script>

<style scoped>
</style>