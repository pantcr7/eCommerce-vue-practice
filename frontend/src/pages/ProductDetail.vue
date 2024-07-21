<template>
    <div class="m-5">
        <h1>Product Details Page</h1>
        <div v-if="productDoc">
            <h1 class="text-3xl text-gray-800">{{ productDoc.name }}</h1>

            <div class="sm:flex sm:gap-6 sm:mt-4">
                <div class="flex flex-col w-fit gap-3 mt-5">

                        <div @click="currentPreviewImage = image.image_url" 
                            v-for="image in productDoc.images"
                            :class="[
                                ' p-2 w-16 h-16 object-contain border-gray-600/25 border-2 rounded hover:bg-black-overlay-50 cursor-pointer',
                                currentPreviewImage === image.image_url? 'border-gray-600' :''
                            ]"
                            :key="image.image_url"
                        >
                            <img  
                                :src="image.image_url" 
                                :key="image" 
                                alt="image"
                            />
                        </div>
                </div>
                <img :src="currentPreviewImage" alt="product-image" class="sm:max-w-lg" />
            </div>

            <div v-html="md.render(productDoc.description)" class="prose"></div>
            <div class="space-y-3 mt-3">
                <p class="text-3xl font-bold text-gray-900">{{ formatCurrency(productDoc.price, productDoc.currency) }}</p>
                <Button variant ="solid" size = "2xl" @click="addProductToCart">
                    <template #prefix>
                      <FeatherIcon name="shopping-cart" class="h-6"/> Add To Cart 
                    </template>
                </Button>
                
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { createDocumentResource, FeatherIcon } from 'frappe-ui';
import { computed, ref, watch,inject } from 'vue';
import { formatCurrency } from '../utils';
import { useToast } from "vue-toastification";

import markdownit from 'markdown-it';

const md = markdownit();

const route = useRoute();

const toast = useToast();


const currentPreviewImage = ref('');

const cart = inject('cart');

// Ensure the route parameter 'name' is defined
const productName = route.params.name;
if (!productName) {
    console.error('Product name is not defined in route parameters.');
}

const productResource = createDocumentResource({
    doctype: 'Product',
    name: productName,
    auto: true,
    onSuccess: (data) => {
        // Check if images array is not empty before assigning
        // if (data.images && data.images.length > 0) {
        //     currentPreviewImage.value = data.images[0].image_url;
        // } else {
        //     console.warn('No images found for this product.');
        // }
    }
});

const productDoc = computed(() => {
    return productResource.doc || {};
});

function addProductToCart() {
    console.log('Adding product to cart');
    const productName= route.params.name;
    cart.items.push({
        product: productName,
        qty:1
    });
    toast.success("Product added to cart");
}

watch(productDoc, (newVal) => {
    if (newVal.images && newVal.images.length > 0) {
        currentPreviewImage.value = newVal.images[0].image_url;
    }
});
</script>
<style scoped>
.product-image {
    width: 200px; /* Set your desired width */
    height: 200px; /* Set your desired height */
    object-fit: contain; /* Maintain aspect ratio */
    border: 2px solid #4b5563; /* border-gray-600/25 */
}
</style>