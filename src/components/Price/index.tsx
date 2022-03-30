import { createVNode, defineComponent } from "vue"
import './index.less'

const PriceProps = {
    value: Number,
    currency: String,
    decimalLength: Number,
    fontSize: Number,
}

export default defineComponent({
    props: PriceProps,
    setup(props) {
        const renderPrice = () => {
            const { value, currency = '￥', decimalLength = 2, fontSize = 10 } = props
            if (typeof value === 'number') {
                const pricePair = value.toFixed(+decimalLength).split('.')
                const decimal = decimalLength ? `.${pricePair[1]}` : ''
                return createVNode('div',
                    {
                        class: 'price-wrap',
                        style: {
                            fontSize: fontSize + 'px'
                        }
                    },
                    [
                        createVNode('span', { class: 'currency' }, currency),
                        createVNode('span', { class: 'integer' }, [pricePair[0]]),
                        createVNode('span', { class: 'decimal' }, decimal),
                    ]
                )
            }
        }

        return () => renderPrice()
    }
})