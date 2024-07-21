<template>
    <div>
        <nav class="m-5 flex justify-between items-center">
            <router-link class="font-bold text-2xl text-gray-800" :to="{name:'ProductListPage'}">
                Welcome to Prasant Ecommerce
            </router-link>
            <button class="flex justify-start" @click="cartDialogShow=true">
                <div class="relative">
                    <FeatherIcon name="shopping-cart" class="h-8"/>
                    <Badge class="absolute -top-1 -right-2" variant="solid">{{ cart.items.length }}</Badge>
                </div>
            </button>
        </nav>
        <Dialog :options="options"   v-model="cartDialogShow" >
            <template #body-content>
                <ul class="space-y-3">
                    <li v-for="(item, index) in cart.items" :key="item.product">
                        #{{index + 1}} {{ item.product }}
                        <FormControl v-model="item.qty" type="number" placeholder="Qty"/>
                        <Button @click="removeProductCart(index)" variant="outline" theme="red" class="mt-2">Remove</Button>
                    </li>
                </ul>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import {FeatherIcon, Badge,Dialog,FormControl } from 'frappe-ui';
import { inject,ref } from 'vue';
import { useRouter } from 'vue-router';
const cart = inject('cart');

const cartDialogShow = ref(false);

const router = useRouter();
const options = {
    title: 'Your Cart',
    size: 'md',
    actions: [
        {
            label: 'Proceed to Checkout',
            variant: 'solid',
            onClick: (close) => {
                router.push({name:'CheckoutPage'});
                close();
                // cartDialogShow.value = false;
                // console.log('Proceed to checkout');
                
            }
        }
    ]
}

function removeProductCart(index) {
    cart.items.splice(index, 1);
}
</script>