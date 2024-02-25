<script setup>
import { ref, onMounted, defineExpose, defineEmits, inject, watch, watchEffect } from 'vue';
const axios = inject('axios');
import Modal from 'bootstrap/js/dist/modal';
const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

const props = defineProps(['isopen', 'isnew', 'propitem']);

const product = ref(props.propitem);

const emits = defineEmits(['close']);

const productModal = ref(null);

// 打開
const openModal = () => {
    productModal.value.show();
};

// 關
const hideModal = () => {
    productModal.value.hide();    
}

const addProduct = async () => {
    const url = `${apiUrl}/api/${apiPath}/admin/product`;
    let result = false;
    const data = {
        data: product.value
    };
    await axios.post(url, data).then((res) => {
        const { success } = res.data;
        result = success;
        console.log("addProduct", result);
    }).catch((err) => {
        alert(JSON.stringify(err));
    });
    return result;
};

const updateProduct = async () => {
    const url = `${apiUrl}/api/${apiPath}/admin/product/${product.value.id}`;
    let result = false;
    const data = {
        data: product.value
    };
    await axios.put(url, data).then((res) => {
        const { success } = res.data;
        result = success;
        console.log("update", result);
    }).catch((err) => { alert(JSON.stringify(err)); });
    return result;
};

const modalConfirm = async () => {
    let result = false;
    result = props.isnew ? await addProduct() : await updateProduct();
    emits('close');
    hideModal();
    return result;
};

const cancelModal = () => {
    hideModal();
};

const createImages = () => {
    product.value.imagesUrl = [];
    product.value.imagesUrl.push('');
};

watch(() => props.propitem, (newValue, rawValue) => {
    product.value = newValue;
})
    
onMounted(async () => {
    productModal.value = new Modal(document.getElementById('product-modal'), {
        keyboard: false,
    });
});

defineExpose({
  openModal,
  hideModal,
});

</script>

<template>
    <div id="product-modal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
      aria-hidden="true">
        <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
                <span>{{ isnew ? '新增產品' : '編輯產品'}}</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="row">
                <div class="col-sm-4">
                <div class="mb-2">
                    <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入圖片網址</label>
                    <input type="text" class="form-control"
                            placeholder="請輸入圖片連結" v-model="product.imageUrl">
                    </div>
                    <img class="img-fluid" v-bind:src="product.imageUrl" alt="">
                </div>
                <div v-if="Array.isArray(product.imagesUrl)">
                    <div v-for="(img, key) in product.imagesUrl" :key="key">
                    <img class="img-fluid" v-bind:src="img" alt="">
                    <input type="text" class="form-control" 
                    v-model="product.imagesUrl[key]">
                    </div>
                    <div>
                    <button class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="product.imagesUrl.push('')">
                    新增圖片
                    </button>
                    </div>
                    <div>
                    <button class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="product.imagesUrl.pop()">
                        刪除圖片
                    </button>
                    </div>
                </div>
                <div v-else>
                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImages">
                    新增圖片
                    </button>
                </div>          
                </div>
                <div class="col-sm-8">
                <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="product.title">
                </div>

                <div class="row">
                    <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" type="text" class="form-control"
                            placeholder="請輸入分類" v-model="product.category">
                    </div>
                    <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="product.unit">
                    </div>
                </div>

                <div class="row">
                    <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="product.origin_price">
                    </div>
                    <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input id="price" type="number" min="0" class="form-control"
                            placeholder="請輸入售價" v-model.number="product.price">
                    </div>
                </div>
                <hr>

                <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea id="description" type="text" class="form-control"
                            placeholder="請輸入產品描述" v-model="product.content">
                    </textarea>
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea id="description" type="text" class="form-control"
                            placeholder="請輸入說明內容" v-model="product.description">
                    </textarea>
                </div>
                <div class="mb-3">
                    <div class="form-check">
                    <input id="is_enabled" class="form-check-input" type="checkbox"
                            :true-value="1" :false-value="0" v-model="product.is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" v-on:click="cancelModal">
                取消
            </button>
            <button type="button" class="btn btn-primary" v-on:click="modalConfirm">
                確認
            </button>
            </div>
        </div>
        </div>
    </div>
</template>