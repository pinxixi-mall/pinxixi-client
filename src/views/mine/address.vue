<template>
    <van-nav-bar
        title="地址管理"
        left-arrow
        fixed
        placeholder
        z-index="2"
        @click-left="$router.go(-1)"
    />
    <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { getAddress } from '@/api'
import { AddressType } from '@/types'

export default defineComponent({
    setup() {
        const chosenAddressId = ref('1');
        const list = [
            {
                id: '1',
                name: '张三',
                tel: '13000000000',
                address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                isDefault: true,
            },
            {
                id: '2',
                name: '李四',
                tel: '1310000000',
                address: '浙江省杭州市拱墅区莫干山路 50 号',
            },
        ];
        const disabledList = [
            {
                id: '3',
                name: '王五',
                tel: '1320000000',
                address: '浙江省杭州市滨江区江南大道 15 号',
            },
        ];
        const addressList = ref()
        const router = useRouter()
        
        onMounted(() => {
            getAddresInfo()
        })

        const getAddresInfo = async () => {
            const { data } = await getAddress()
            addressList.value = data.map((address: AddressType) => ({
                id: address.addressId,
                name: address.recipient,
                tel: address.phone,
                address: address.addressDetail,
                isDefault: address.isDefault === 1
            }))
        }

        const onAdd = () => {
            router.push('/mine/address-edit')
        }
        const onEdit = (item: any, index: number) => {
            router.push('/mine/address-edit')
        }

        return {
            list,
            onAdd,
            onEdit,
            disabledList,
            chosenAddressId,
            addressList
        };
    },

})
</script>

<style scoped>
</style>