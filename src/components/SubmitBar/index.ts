import { createVNode } from 'vue'
import { defineComponent } from 'vue'
import { Button } from 'vant'
import './index.less'

const bem = (name?: string | string[]): string => {
  let className: string = ''
  if (name && typeof name === 'string') {
    className = `pxx-submit-bar__${name}`
  } else if (name && Array.isArray(name)) {
    className = name.reduce((ret, it) => `pxx-submit-bar__${ret}` + ' ' + `pxx-submit-bar__${it}`)
  } else {
    className = 'pxx-submit-bar'
  }
  return className
}

const submitBarProps = {
  label: String,
  price: Number,
  loading: Boolean,
  currency: String,
  showTotal: Boolean,
  disabled: Boolean,
  textAlign: String,
  buttonText: String,
  buttonType: String,
  buttonColor: String,
  suffixLabel: String,
  decimalLength: Number
}

export default defineComponent({
  name: 'SubmitBar',
  props: submitBarProps,
  emits: ['submit'],
  setup(props, { emit, slots }) {
    const renderText = () => {
      const { price, label, currency = '￥', showTotal, textAlign, suffixLabel, decimalLength = 2 } = props
      if (typeof price === 'number') {
        const pricePair = (price / 100).toFixed(+decimalLength).split('.')
        const decimal = decimalLength ? `.${pricePair[1]}` : ''
        return createVNode(
          'div',
          {
            class: bem('text'),
            style: {
              textAlign
            }
          },
          [
            showTotal && createVNode('span', null, [label || '合计']),
            showTotal && createVNode(
              'span',
              {
                class: bem('price')
              },
              [
                currency,
                createVNode(
                  'span',
                  {
                    class: bem('price-integer')
                  },
                  [pricePair[0]]
                ),
                decimal
              ]
            ),
            suffixLabel &&
              createVNode(
                'span',
                {
                  class: bem('suffix-label')
                },
                [suffixLabel]
              )
          ]
        )
      }
    }

    const onClickButton = () => emit('submit')

    const renderButton = () => {
      if (slots.button) {
        return slots.button()
      }
      return createVNode(
        Button,
        {
          round: true,
          type: props.buttonType,
          text: props.buttonText,
          class: `van-button--danger ${bem(['button', 'button__danger'])}`,
          color: props.buttonColor,
          loading: props.loading,
          disabled: props.disabled,
          onClick: onClickButton
        },
        null
      )
    }

    return () => {
      var s
      return createVNode(
        'div',
        {
          class: [bem(), {}]
        },
        [
          createVNode(
            'div',
            {
              class: bem('bar')
            },
            [(s = slots.default) == null ? void 0 : s.call(slots), renderText(), renderButton()]
          )
        ]
      )
    }
  }
})
