<script setup>
import { onMounted, inject, ref, provide, computed } from 'vue';
import { useCartStore } from '../stores/cartStore'
const axios = inject('axios')
const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;
const cartStore = useCartStore() 
// const cart = ref(cartStore.cart);

const cart = computed({
  get() {
    return cartStore.cart
  }
})

// 取購物車
const getCart = () => {
    cartStore.getCart();
    // const url = `${apiUrl}/api/${apiPath}/cart`;
    // axios.get(url).then((response) => {
    // cart.value = response.data.data;
    // }).catch((err) => {
    // alert(err.response.data.message);
    // });
};

// 清空購物車
const emptyCart = () => {
    const url = `${apiUrl}/api/${apiPath}/carts`;
    axios.delete(url).then((response) => {
        alert(response.data.message);
        getCart();
    }).catch((err) => {
        alert(err.response.data.message);
    });
}

// vue mount
onMounted(() => {
    getCart();
});

</script>
<template>
    <!-- 購物車列表 -->
    <div class="text-end">
        <button class="btn btn-outline-danger" type="button" @click="emptyCart">清空購物車</button>
    </div>
    <table class="table align-middle">
        <thead>
            <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
                <td>
                <button type="button" class="btn btn-outline-danger btn-sm">
                    <i class="fas fa-spinner fa-pulse"></i>
                    x
                </button>
                </td>
                <td>
                {{ item.product.title }}
                <!-- <div class="text-success">
                    已套用優惠券
                </div> -->
                </td>
                <td>
                <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                    <input 
                            min="1" type="number" class="form-control" v-model="item.qty">
                    <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                    </div>
                </div>
                </td>
                <td class="text-end">
                <!-- <del>原價 : {{ item.product.origin_price }}</del>
                <div class="text-end">
                    <small class="text-success">折扣價：</small>                    
                    {{ item.product.price }} 
                </div>-->
                {{ item.product.price }} 
                </td>
            </tr>
            </template>
        </tbody>
        <tfoot>
            <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cart.final_total }}</td>
            </tr>
        </tfoot>
    </table>
</template>