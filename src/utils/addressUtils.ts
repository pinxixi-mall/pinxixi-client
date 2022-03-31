import { getDefaultAddress, getAddressById } from "@/api"
import { Address, QueryId } from '@/types'

/**
 * 当前操作的地址
 * @param addressId 
 * @returns 
 */
export const getCurrentAddress = async (addressId?: QueryId) : Promise<Address> => {
    return new Promise(async (resolve) => {
        let address: Address
        if (addressId) {
            const { data } = await getAddressById(addressId)
            address = data
        } else {
            const { data } = await getDefaultAddress()
            address = data
        }
        address = address || {}
        const { province, city, county, addressDetail } = address
        resolve({
            ...address,
            fullAddress: `${province + city + county} ${addressDetail}`
        })
    })
}