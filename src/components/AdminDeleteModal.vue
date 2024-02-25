<script setup>
import { ref, onMounted, defineExpose, defineEmits, inject } from 'vue';
const axios = inject('axios');
import Modal from 'bootstrap/js/dist/modal';
const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

const props = defineProps({
    propitem: null
});

const emits = defineEmits(['close']);

const modal = ref(null);

// 打開
const openModal = () => {
    modal.value.show();
};

// 關
const hideModal = () => {
    modal.value.hide();    
}

// 刪除產品
const deleteProduct = async() => {
    const id = props.propitem.id;
    const url = `${apiUrl}/api/${apiPath}/admin/product/${id}`;
    let result = false;
    await axios.delete(url).then((res) => {
        const { success } = res.data;
        result = success;
        alert('已刪除商品');  
        hideModal();
        emits('close');
    }).catch(
        (err) =>
        { alert(JSON.stringify(err)) }
    );      
    return result;
}

onMounted(async() => {
    modal.value = new Modal(document.getElementById('delProductModal'), {
      keyboard: false,
    });
})

defineExpose({
  openModal,
  hideModal,
});
</script>

<template>
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
        aria-labelledby="delProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            是否刪除
            <strong class="text-danger"></strong> 商品{{propitem.title}}(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteProduct()">
                確認刪除
            </button>
            </div>
        </div>
        </div>
    </div>
</template>