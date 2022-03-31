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
        :switchable="switchable"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @click-item="onAddressClick"
    />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter, RouteLocationNormalized } from 'vue-router'
import { getAddress } from '@/api'
import { Address } from '@/types'

let prevPathObj: RouteLocationNormalized

export default defineComponent({
    beforeRouteEnter(to, from) {
        // 保存上一页面路由信息
        prevPathObj = from
    },
    setup() {
        const chosenAddressId = ref()
        const addressList = ref()
        const prevPath = ref<any>({})
        const router = useRouter()
        const route = useRoute()

        const switchable = computed(() => {
            const disabledPaths = ['/mine', '/mine/address-edit']
            return !disabledPaths.includes(prevPath.value.path)
        })
        
        onMounted(() => {
            prevPath.value = prevPathObj
            if (route.query.id) {
                chosenAddressId.value = +route.query.id
            }
            getAddresInfo()
        })

        const getAddresInfo = async () => {
            const { data } = await getAddress()
            addressList.value = data.map((address: Address) => ({
                ...address,
                id: address.addressId,
                address: address.addressDetail,
                isDefault: address.isDefault === 1
            }))
        }

        const onAdd = () => {
            router.push('/mine/address-edit?type=ADD')
        }
        const onEdit = (item: any) => {
            router.push(`/mine/address-edit?id=${item.id}&type=EDIT`)
        }

        const onAddressClick = (item: any) => {
            const { fullPath, query, path } = prevPathObj
            if (!switchable.value) return
            router.push({
                path: fullPath,
                query: {
                    ...query,
                    addressId: item.addressId
                }
            })
        }

        return {
            chosenAddressId,
            addressList,
            switchable,
            onAdd,
            onEdit,
            onAddressClick
        };
    },

})
</script>

<style scoped>
</style>