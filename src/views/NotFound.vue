<script setup>
import { onMounted } from 'vue';
onMounted(() => {
    setTimeout(() => {
        window.location = "#/user";
    },3000)    
});
</script>

<template>
    <p>頁面不存在</p>
    <p>3秒後跳轉畫面</p>
</template>