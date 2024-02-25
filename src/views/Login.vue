<script setup>
import { ref, inject } from 'vue';
const axios = inject('axios');
const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

const account = ref(null);
const password = ref(null);

const login = async () => {
    const parameter = {
        username: account.value,
        password:password.value
    }
    await axios.post(`${apiUrl}/admin/signin`, parameter).then((res) => {
                console.log(res);
                const { token, expired } = res.data;
                document.cookie = `hextoken=${token}; expires=${new Date(expired)}; path=/`;
                window.location = "admin"
    })
    .catch((err) => { console.log(err) });
}
</script>

<template>
    <div class="container">
        <div class="row justify-content-center text-center">
            <h1 class="h3 mb-3 mt-5 font-weight-normal">
            請先登入
            </h1>
            <div class="col-8">
            <form id="form" class="form-signin" v-on:submit.prevent="login">
                <div class="form-floating mb-3">
                <input type="email" class="form-control" id="username"
                    placeholder="name@example.com" v-model="account" required autofocus>
                <label for="username">Email address</label>
                </div>
                <div class="form-floating">
                <input type="password" class="form-control" id="password"
                    placeholder="Password" v-model="password" required>
                <label for="password">Password</label>
                </div>
                <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
                登入
                </button>
            </form>
            </div>
        </div>
        <p class="mt-5 mb-3 text-muted text-center">
            &copy; 2021~∞ - 六角學院
        </p>
    </div>
</template>