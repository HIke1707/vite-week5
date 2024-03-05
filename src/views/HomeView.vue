<script setup>
import ProductList from '@/components/ProductList.vue'
import CartVue from '@/components/CartVue.vue'
import OrderForm from '@/components/OrderForm.vue';

</script>

<template>
  <div id="nav">
    <RouterLink to="/user">week6</RouterLink>
  </div>
  <ProductList />
  <CartVue></CartVue>
  <OrderForm></OrderForm>
</template>
