<script setup>
import { ref, inject } from 'vue';
const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;
const axios = inject('axios') 

// 表單
const form = ref({
  user: {
    name: "",
    email: "",
    tel: "",
    address: "",
  },
  message: "",
});

const formRef = ref(null);

const createOrder = () => {
    const url = `${apiUrl}/api/${apiPath}/order`;
    const order = form.value;
    axios
    .post(url, { data: order })
    .then((response) => {
        alert(response.data.message);
        formRef.value.resetForm();
    })
    .catch((err) => {
        alert(err.response.data.message);
    });
};

</script>

<template>
    <div class="my-5 row justify-content-center">
        <v-form ref="formRef" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <v-field id="email" name="email" type="email" class="form-control"
                        :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email"
                        rules="email|required" v-model="form.user.email"
                        ></v-field>
                <error-message name="email" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
                <label for="name" class="form-label">收件人姓名</label>
                <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                        placeholder="請輸入姓名" rules="required" v-model="form.user.name"></v-field>
                <error-message name="姓名" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
                <label for="tel" class="form-label">收件人電話</label>
                <v-field id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                        placeholder="請輸入電話" rules="required|min:8|max:10" 
                        v-model="form.user.tel"></v-field>
                <error-message name="電話" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
                <label for="address" class="form-label">收件人地址</label>
                <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                        placeholder="請輸入地址" rules="required" 
                        v-model="form.user.address"></v-field>
                <error-message name="地址" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea id="message" class="form-control" cols="30" rows="10" 
                v-model="form.message"></textarea>
            </div>
            <div class="text-end">
                <button type="submit" class="btn btn-danger"
                        >送出訂單</button>
            </div>
        </v-form>
    </div>
</template>