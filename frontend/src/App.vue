<template>
  <div >
    <NavBar />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';

import { watch, inject} from 'vue';

const cart = inject("cart");

watch(cart.items, () => {
  console.log('Cart updated');
  localStorage.setItem("cart", JSON.stringify(cart));
});

</script>
