// import { boot } from 'quasar/wrappers'
// import { defineCustomElements } from '@ionic/pwa-elements/loader'
// // "async" is optional;
// // more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async ({ app }) => {
//   app.use(defineCustomElements)
// })
import { defineCustomElements } from '@ionic/pwa-elements/loader'
export default () => {
  defineCustomElements(window)
}