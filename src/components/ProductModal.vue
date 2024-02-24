<script setup>
import { ref, onMounted, defineExpose, defineEmits } from 'vue';
import Modal from 'bootstrap/js/dist/modal';

class product {
    constructor() {
        this.title = "";
        this.category = "";
        this.origin_price = null;
        this.price = null;
        this.unit = "";
        this.description = "";
        this.content = "";
        this.is_enabled = 1;
        this.imageUrl = "";
        this.imagesUrl = [];
    }
}

defineProps({
    propItem: {
      type: Object,
      default: () => new Product()
    }
});

const emits = defineEmits(['add-cart']);

const modal = ref(null);
const count = ref(1);
// 打開
const openModal = () => {
    modal.value.show();
};

// 關
const hideModal = () => {
    modal.value.hide();    
}

// 加入購物車
const addCart = (id, qty = 1) => {
    emits('add-cart', id, qty);
    hideModal();
}

onMounted(async() => {
    modal.value = new Modal(document.getElementById('product-modal'), {
      keyboard: false,
    });
})

defineExpose({
  openModal,
  hideModal,
});

</script>

<template>
    <div class="modal fade" id="product-modal" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalRef">
        <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ propItem.title }}</span>
        </h5>
        <button type="button" class="btn-close"
                data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <div class="row">
            <div class="col-sm-6">
            <img class="img-fluid" :src="propItem.imageUrl" alt="">
        </div>
            <div class="col-sm-6">
            <span class="badge bg-primary rounded-pill">{{ propItem.category }}</span>
            <p>商品描述：{{ propItem.description }}</p>
            <p>商品內容：{{ propItem.content }}</p>
            <div class="h5">{{ propItem.price }} 元</div>
            <!-- <del class="h6">原價 {{ }} 元</del>
            <div class="h5">現在只要 {{  }} 元</div> -->
            <div>
                <div class="input-group">
                <input type="number" class="form-control"
                        min="1" v-model="count">
                <button type="button" class="btn btn-primary" v-on:click="addCart(propItem.id, count)">加入購物車</button>
        </div>
        </div>
        </div>
            <!-- col-sm-6 end -->
        </div>
        </div>
        </div>
        </div>
    </div>
</template>
