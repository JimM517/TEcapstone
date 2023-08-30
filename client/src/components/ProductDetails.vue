<template>
  <div class="product-card">
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <p class="description">{{ product.description }}</p>
      <div class="price-wrapper">
        <span class="sku">{{ product.productSku }}</span>
        <span class="price">{{ product.price }}</span>
      </div>
      <div class="button-wrapper">
        <h3>{{ product.name }}</h3>
        <button @click="addItemToCart(product)">
          Add Item
          <font-awesome-icon icon="fa-solid fa-cart-plus" class="cart" v-show="$store.state.token.length > 0" />
        </button>
      </div>
    </div>
    <img :src="'https://via.placeholder.com/350x250.jpg'" />
  </div>
</template>

<script>

import productService from '../services/ProductService'
import cartService from '../services/CartService'

export default {
    name: 'product-details',
    props: {
        id: Number,
    },
    data() {
        return {
            product: {
                productId: '',
                productSku: '',
                name: '',
                price: '',
                description: '',
                imageName: '',
            }
        }
    },
    methods: {
        addItemToCart() {
               //create new cartItem, this path is looking for a cart item object?
            const cartItem = {
                productId: this.product.productId,
                quantity: 1
            }
             
            cartService.add(cartItem).then((response) => {
                this.$store.commit("ADD_ITEM_TO_CART", response.data)
                
                alert('Item added to cart')

               
               
                //refresh cart items
               cartService.listCart()
            }).catch(err => {
                console.error(err)
            })
        }
    },
    created() {
        productService.get(this.id)
            .then((response) => {
                this.product = response.data;
            })
    }
}
</script>

<style>
    .product-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
}

.product-details {
  margin-bottom: 20px;
  text-align: center;
}

.description {
  margin-bottom: 10px;
}

.price-wrapper {
  margin-bottom: 10px;
}

.sku {
  font-weight: bold;
}

.price {
  margin-left: 5px;
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  margin-top: 10px;
}

img {
  max-width: 100%;
  height: auto;
}


</style>