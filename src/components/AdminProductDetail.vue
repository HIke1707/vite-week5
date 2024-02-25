<script setup>
    defineProps({
        product: {
            type: Object,
            default: () => new Product()
        },
        hasFocus:false
    });
</script>
<template>
    <div id="detail">
        <h2>單一產品細節</h2>
        <template v-if="hasFocus">
            <div class="card mb-3">
            <img :src="product.imageUrl" class="card-img-top primary-image" alt="主圖">
            <div class="card-body">
                <h5 class="card-title">
                {{ product.title }}
                <span class="badge bg-primary ms-2">{{ product.category }}</span>
                </h5>
                <p class="card-text">商品描述：{{ product.description }}</p>
                <p class="card-text">商品內容：{{ product.content }}</p>
                <div class="d-flex">
                <p class="card-text me-2">{{ product.price }}</p>
                <p class="card-text text-secondary"><del>{{ product.origin_price }}</del></p>
                元 / {{ product.unit }}
                </div>
            </div>
            </div>
            <template v-for="(img,index) in product.imagesUrl" :key="index">
            <img :src="img" alt="" class="images m-2">
            </template>
        </template>
        <p class="text-secondary" v-show="!hasFocus">請選擇一個商品查看</p>
    </div>
</template>
