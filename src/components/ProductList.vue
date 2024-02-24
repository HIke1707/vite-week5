<script setup>
import { onMounted, inject, ref } from 'vue';
import { useCartStore } from '../stores/cartStore'
const cartStore = useCartStore() 
const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH; 
import ProductModal from '@/components/ProductModal.vue';

defineProps({
})

const axios = inject('axios')  // inject axios

const products = ref([]);
const selectedProduct = ref({});

const productModal = ref(null);

// 取購物車
const getCart = () => {
    cartStore.getCart();
};

const addToCart = (id, qty = 1) => {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      const cartData = {
        product_id: id,
        qty,
      };
  axios.post(url, { data: cartData }).then((response) => {
        alert('商品加入購物車成功');
        getCart();
      }).catch((err) => {
        alert(err.response.data.message);
      });
};

const openDetail = (item) => {
  selectedProduct.value = item;
  productModal.value.openModal();
}

onMounted(async() => {
  await axios.get(`${apiUrl}/api/${apiPath}/products/all`).then((res) => {
    console.log(res.data);
    products.value = res.data.products;
  });
})

</script>

<template>
    <table class="table align-middle">
        <thead>
            <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in products">
            <td style="width: 200px">
                <div style="height: 100px; background-size: cover; background-position: center">
                    <img :src="item.imageUrl" style="height:100px"/>
                </div>
            </td>
            <td>
                {{ item.title }}
            </td>
            <td>
                <!-- <div class="h5">{{ item.price }} 元</div> -->
                <del class="h6">原價 {{ item.origin_price }} 元</del>
                <div class="h5">現在只要 {{ item.price }} 元</div>
            </td>
            <td>
                <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary" @click="openDetail(item)">
                    <i class="fas fa-spinner fa-pulse"></i>
                    查看更多
                </button>
                <button type="button" class="btn btn-outline-danger" @click="addToCart(item.id)">
                    <i class="fas fa-spinner fa-pulse"></i>
                    加到購物車
                </button>
                </div>
            </td>
            </tr>
        </tbody>
    </table>
    <ProductModal ref="productModal" :propItem="selectedProduct" @add-cart="addToCart"></ProductModal>
</template>