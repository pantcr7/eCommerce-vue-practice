<template>
     <router-link :to = "{
        name: 'ProductDetailPage',
        params: { name: product.name }
     }"  class="shadow-sm rounded-sm p-3 space-y-2 flex items-start justify-between flex-col">
        <div>
          <img :src="product.preview_image" >
          <p class="text-base text-gray-800 font-medium mt-2">{{ product.name }}</p>
        </div>
       <p class="text-xl font-bold text-gray-900">{{ formatCurrency(product.price,product.currency) }} </p>
     </router-link>
    
</template>

<script setup>
import { formatCurrency } from '../utils';
const props = defineProps({
    product: Object
});


</script>