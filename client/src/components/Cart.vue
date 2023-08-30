<template>
  <div>
      <div class="header">
          <h1>Shopping Cart</h1>
         <button @click="clear">
             <font-awesome-icon icon="fa-solid fa-cart-plus" class="cart" />
            Clear Cart
         </button>
      </div>
      <div class="cart-container">
      
            <router-link v-for="item in cart.items" :key="item.cartItemId" :to="{name: 'product-details', params: {id: item.product.productId}}" class="cart-item" >
                <div class="info">
                    <div class="info-row">
                        <h3>Quantity</h3>
                        <p>{{ item.quantity }}</p>
                    </div>
                    <div class="info-row">
                        <h3>Product</h3>
                        <p>{{ item.product.name }}</p>
                    </div>
                    <div class="info-row">
                        <h3>Price</h3>
                        <p> {{ item.product.price }} </p>
                    </div>
                    <div class="info-row">
                        <h3>Amount</h3>
                        <p>{{ item.quantity * item.product.price  }}</p>
                    </div>
                </div> 
                <button @click="removeItem(item.cartItemId)" v-show="cart.items.length > 0">X</button>
            </router-link>
                
            
            <div class="total">
                <div class="total-row">
                    <h3>Subtotal:</h3>
                    <p>{{ cart.itemSubtotal }}</p>
                </div>
                <div class="total-row">
                    <h3>Tax Amount:</h3>
                    <p>{{ cart.tax }}</p>
                </div>
                <div class="total-row">
                    <h3>Total:</h3>
                    <p>{{ cart.total }}</p>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import cartService from "../services/CartService"

export default {
    data() {
        return {
            items: []
        }
    },
    // props: {
    //     cart: {
    //         type: Object,
    //         required: true
    //     }
    // },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
    },
    methods: {
        getCartItems() {

            cartService.listCart().then((response) => {
                this.$store.commit("SET_CART", response.data);
                // console.log(response.data);
                // console.log(this.$store.state.cart)
            })
        },
        removeItem(cartItemId) {
            cartService.delete(cartItemId).then(response => {
                if (response.status === 200) {
                    this.$store.commit("REMOVE_ITEM_FROM_CART", cartItemId);
                    console.log(cartItemId)
                }
                this.getCartItems();
            })
            
        },
        clear() {
            this.$store.commit("CLEAR_CART")
        },
    },
    created() {
        this.getCartItems();
    }
}
</script>

<style>

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.cart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px;
}



.info {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
}

.info-row {
    display: flex;
    align-items: center;
}

.info-row h3 {
    margin-right: 5px;
}

.total-row {
    display: flex;
    align-items: center;
}

.total-row h3 {
    margin-right: 5px;
}



</style>