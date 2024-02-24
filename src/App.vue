<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div id="nav">
    <RouterLink :to="'about'"><a>關於</a></RouterLink>
    <RouterLink :to="'/'"><a>前台產品列表</a></RouterLink>
  </div>
  <div class="container">
    <div class="mt-4">
      <RouterView />
    </div>    
  </div>
  
</template>

<style lang="scss">
  @import "./assets/all.scss"
</style>
