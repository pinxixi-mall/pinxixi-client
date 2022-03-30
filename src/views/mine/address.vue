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
        const chosenAddressId = ref()
        const addressList = ref()
        const router = useRouter()
        
        onMounted(() => {
            getAddresInfo()
        })

        const getAddresInfo = async () => {
            const { data } = await getAddress()
            addressList.value = data.map((address: AddressType) => ({
                ...address,
                id: address.addressId,
                address: address.addressDetail,
                isDefault: address.isDefault === 1
            }))
        }

        const onAdd = () => {
            router.push('/mine/address-edit')
        }
        const onEdit = (item: any, index: number) => {
            console.log(item);
            
            router.push(`/mine/address-edit?id=${item.id}`)
        }

        return {
            onAdd,
            onEdit,
            chosenAddressId,
            addressList
        };
    },

})
</script>

<style scoped>
</style>