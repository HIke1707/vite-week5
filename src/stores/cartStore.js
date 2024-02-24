import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;  

// export const useCartStore = defineStore('cartStore', () => {
//   const cart = ref({});
//   // 取購物車
//   function getCart (){
//     const url = `${apiUrl}/api/${apiPath}/cart`;
//     axios.get(url).then((response) => {
//     cart.value = response.data.data;
//     }).catch((err) => {
//     alert(err.response.data.message);
//     });
//   };

//   return { cart, getCart }
// })

export const useCartStore = defineStore('counterStore', {
  state: () => ({
    cart: ref({})
  }),
  actions: {
    getCart() {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      axios.get(url).then((response) => {
        this.cart = response.data.data;
      }).catch((err) => {
        alert(err.response.data.message);
      });
    }
  }
})
