import './index.css'

import { createApp, reactive } from 'vue'
import router from './router'
import App from './App.vue'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'

let app = createApp(App)


let cartData = localStorage.getItem('cart')
if (cartData) {
  cartData= JSON.parse(cartData)
}
else {
  localStorage.setItem('cart', JSON.stringify({items: []}))
  cartData = {items: []}
}

setConfig('resourceFetcher', frappeRequest)

const cart = reactive(
  cartData
)


const options = {
  position: "bottom-right",
};


app.use(Toast, options);


app.provide('cart', cart)
app.use(router)
app.use(resourcesPlugin)

app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)

app.mount('#app')
