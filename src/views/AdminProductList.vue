<script setup>
// 載入套件
import { ref, inject, onMounted } from 'vue';
const axios = inject('axios');
const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;
import PaginationVue from '@/components/Pagination.vue';
import detail from '@/components/AdminProductDetail.vue';
import deleteModal from '@/components/AdminDeleteModal.vue';
import productModal from '@/components/AdminProductModal.vue';

// 資料定義
const products = ref([]);
const focusProduct = ref(null);
const hasFocus = ref(false);
const modalopen = ref(false);
const isNewModal = ref(false);
const delModal = ref(null);
const expectedDeleteId = ref(0);
const tempProduct = ref({ imagesUrl: [] });
const pagination = ref({});

// element ref
const delProductModal = ref(null);
const productModalRef = ref(null);
/** 定義方法 */ 
// 查看細節
const seeDetail = (product) => {
    focusProduct.value = product;
    hasFocus.value = true;
};
// 取得產品列表
const getProducts = async(page = 1) => {
    const url = `${apiUrl}/api/${apiPath}/admin/products?page=${page}`;
    await axios.get(url).then((res) => {
        console.log(res);
        const resProducts = res.data.products;
        products.value = Object.entries(resProducts).map(([id, obj]) => ({ id, ...obj }));
        pagination.value = res.data.pagination;
    })
    .catch((err) => { console.log(err) });
}
// 檢查登入狀態
const checkAuth = async() => {
    const url = `${apiUrl}/api/user/check`;
    let result = false;
    await axios.post(url).then((res) => {
        const { success } = res.data;
        result = success;
    }).catch((err) => { alert(err.message); });
    return result;
}
// 關閉跳窗
const closeModal = () => {
    modalopen.value = false;
    getProducts();
}
// 開窗
const openModal = (type, item) => {
    if (type === 'new') {
        tempProduct.value = { imagesUrl: [] };
        isNewModal.value = true;
        productModalRef.value.openModal();
    } else if (type === 'edit') {
        tempProduct.value = { ...item };
        isNewModal.value = false;
        productModalRef.value.openModal();
    } else if (type === 'delete') {
        tempProduct.value = { ...item };
        delProductModal.value.openModal();
    }
}

// onmounted hook
onMounted(() => {
    const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hextoken="))
        ?.split("=")[1];
    axios.defaults.headers.common.Authorization = cookieValue;          
    console.log(cookieValue);
    checkAuth().then((res) => {
        if (res) {
            getProducts();
        }
        else {
            alert("請登入");
            window.location = "login";
        }
    });
})

</script>
<template>
    <div class="container">
        <div class="row py-3">
        <div class="col-md-6">
            <div class="row">
            <div class="col-md-6">
                <h2 class="w50">產品列表</h2>
            </div>
            <div class="col-md-6">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#product-modal" style="float: right;" @click="openModal('new', null)">新增項目</button>
            </div>                
            </div>              
            <table class="table table-hover mt-4">
            <thead>
                <tr>
                <th width="150">產品名稱</th>
                <th width="120">
                    原價
                </th>
                <th width="120">
                    售價
                </th>
                <th width="140">
                    是否啟用
                </th>
                <th width="140">
                    查看細節
                </th>
                <th width="180">
                    動作
                </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id" v-bind:class="[{'table-secondary':!product.is_enabled}]">
                <td width="150">{{ product.title }}</td>
                <td width="120">
                    {{ product.origin_price }}
                </td>
                <td width="120">
                    {{ product.price  }}
                </td>
                <td width="140">
                    <span v-show="product.is_enabled" class="text-success">啟用</span>
                    <span v-show="!product.is_enabled">未啟用</span>
                </td>
                <td width="140">
                    <button type="button" class="btn btn-primary" @click="seeDetail(product)">查看細節</button>
                </td>
                <td width="200">
                    <button type="button" class="btn btn-primary" @click="openModal('delete',product)">刪除</button>
                    <button type="button" class="btn btn-primary" @click="openModal('edit',product)">編輯</button>
                </td>
                </tr>
            </tbody>
            </table>
            <!-- 分頁元件 -->
            <PaginationVue :pages="pagination" @emit-pages="getProducts"></PaginationVue>
            <!-- 分頁元件 -->
            <p>目前有 <span>{{ products.length }}</span> 項產品</p>
        </div>
        <div class="col-md-6">
            <detail v-bind:product="focusProduct" v-bind:has-focus="hasFocus"></detail>
        </div>
        </div>
    </div>
    <product-modal :isnew="isNewModal" :propitem="tempProduct" @close="closeModal" ref="productModalRef"></product-modal> 
    <delete-modal :propitem="tempProduct" @close="closeModal" ref="delProductModal"></delete-modal> 
</template>