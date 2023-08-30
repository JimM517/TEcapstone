<template>
  <div>
      <Cart   />
  </div>
</template>

<script>
import Cart from "../components/Cart.vue"
import cartService from "../services/CartService"

export default {
    name: 'CartView',
    data() {
        return {
            cart: []
        }
    },
    components: {
        Cart,
    },
   
    created() {
        if (this.$store.state.token) {
            cartService.listCart().then((response) => {
                // this.cart = response.data;
                // console.log(response.data)
                this.$store.commit("SET_CART", response.data)
            })
        }
    }
}
</script>

<style>

</style>