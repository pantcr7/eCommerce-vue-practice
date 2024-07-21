<template>
    <div>
        <p v-if="cart.items.length === 0">Cart Empty</p>
        <Button v-else :loading="placeOrderResource.loading" @click="placeOrder()">Place Order</Button>
        <ErrorMessage :message="placeOrderResource.error"/>
        <div v-if="orderPlaced" class="popup">Order placed successfully!</div>
    </div>
</template>

<script setup>
import { createResource, ErrorMessage } from 'frappe-ui';
import { inject, ref, watch } from 'vue';

const cart = inject('cart');
const orderPlaced = ref(false);

const placeOrderResource = createResource({
    url: '/api/method/ecommerce_vue_practice.api.place_order',
    makeParams() {
        return {
            products: cart.items
        };
    },
    onSuccess() {
        orderPlaced.value = true;
    }
});

// Function to handle place order action
const placeOrder = () => {
    placeOrderResource.submit();
};

// Watch for orderPlaced changes to show popup message
watch(orderPlaced, (newValue) => {
    if (newValue) {
        // Show popup message
        setTimeout(() => {
            orderPlaced.value = false; // Reset after showing the message
        }, 3000); // Hide popup after 3 seconds
    }
});
</script>

<style>
.popup {
    /* Style your popup message here */
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>