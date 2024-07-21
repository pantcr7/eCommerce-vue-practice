<template>
  <div class="m-5">
    <h2 class="font-semibold my-1 text-lg">Our Products</h2>
    <div v-if="productList" class="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">

     <ProductCard v-for="product in productList" :key="product.name" :product="product" />  

    </div>
</div>
</template>

<script setup>
import { createListResource } from 'frappe-ui';
import { computed } from 'vue';
import ProductCard from '../components/ProductCard.vue';
const productsResource = createListResource({
  doctype:"Product",
  fields:["name","preview_image","price","currency"],
  auto:true
})

const productList = computed(()=>{
  if(productsResource.list.data){
    return productsResource.list.data
  }
  return [];
})

</script>