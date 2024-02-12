<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ text }}
  </div>
</template>

<script setup>
  const text = import.meta.env.VITE_TEXT;
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
