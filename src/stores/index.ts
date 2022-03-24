const files = import.meta.globEager('./modules/*.ts')

interface StoreModuleType {
  useCartStore: any
}

const modules: any = {
  useCartStore: null
}
for (const key in files) {
  if (Object.prototype.hasOwnProperty.call(files, key)) {
    const reResult: any  = key.match(/.*\/(.*)\.ts/)
    modules[reResult[1]] = files[key].default
  }
}

export default {
  useCartStore: 888
}
