// const files = import.meta.globEager('./modules/*.ts')

// const modules: any = {}
// for (const key in files) {
//   if (Object.prototype.hasOwnProperty.call(files, key)) {
//     const matchResult: any  = key.match(/.*\/(.*)\.ts/)
//     modules[matchResult[1]] = files[key].default
//   }
// }

import useCartStore from './modules/useCartStore'
import useTabbarStore from './modules/useTabbarStore'

export {
  useCartStore,
  useTabbarStore
}
