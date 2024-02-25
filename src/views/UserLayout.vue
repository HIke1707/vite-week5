<script setup>
</script>

<template>
  <div class="home">
    <h1>你現在在前台頁面</h1>
    <div id="nav">
      <RouterLink to="/">week5</RouterLink> |
      <RouterLink to="/user/products">前台產品列表</RouterLink> |
      <RouterLink to="/user/cart">前台購物車</RouterLink> |
      <RouterLink to="/admin">後台購物車列表</RouterLink>
    </div>
    <RouterView />
  </div>
</template>