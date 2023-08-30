<template>
    <div>

        <div id="products-header">
            <div class="heading-container">
                <h1>Products</h1>
            </div>
            <div class="search-div">
                <input class="search" type="text" id="search" placeholder="Search..." v-model="searchTerm">
            </div>
        </div>
        <div>
            <p class="product-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus maiores, veniam hic ad tenetur tempore minus cupiditate fugit quos fugiat ipsam, necessitatibus id, pariatur reprehenderit! Optio laudantium ipsum sint aliquid.</p>
        </div>

        <!-- <div :class="containerClass" v-if="cardView">
            <section id="product-cards" v-if="$store.state.products.length > 0">
                    <article class="card"  v-for="product in filterProducts" :key="product.productId">
                        <div class="sku">{{ product.productSku }}</div>
                        <div class="price">{{ product.price }}</div>
                        <div class="name">{{ product.name }}</div>
                        <div class="prodImg"><img :src="'https://via.placeholder.com/350x250.jpg'" ></div>
                        <font-awesome-icon icon="fa-solid fa-cart-plus" class="cart" />
                    </article>
            </section> -->
            <div class="card-container">
                <div :class="containerClass" v-if="cardView">
                    <router-link id="product-cards" v-for="product in filterProducts" :key="product.productId" :to="{name: 'product-details', params: {id: product.productId}}"  >
                        <div class="card">
                            <div class="sku">
                                {{ product.productSku }}
                            </div>
                            <div class="price">
                                {{ product.price }}
                            </div>
                            <div class="name">
                                {{ product.name }}
                            </div>
                            <div class="prodImg">
                                <img :src="'https://via.placeholder.com/350x250.jpg'" />
                            </div>
                            <font-awesome-icon icon="fa-solid fa-cart-plus" class="cart" @click="addItemToCart(product)" v-show="$store.state.token.length > 0" />
                        </div>
                    </router-link>
                </div>
            </div>

           <!-- <table v-else class="product-table">
               <thead>
                   <tr>
                       <th>SKU</th>
                       <th>Product</th>
                       <th>Price</th>
                       <th></th>
                   </tr>
                </thead>
               <tbody>
                   <tr v-for="product in filterProducts" :key="product.productId">
                       <td>{{ product.productSku }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                        <td><font-awesome-icon icon="fa-solid fa-cart-plus" class="cart" /></td>
                   </tr>
               </tbody> -->

           <!-- </table> -->
                <div v-show="!cardView" class="product-table">
                    <table>
                    <thead>
                        <tr>
                            <th class="sku">SKU</th>
                            <th class="product">Product</th>
                            <th class="price">Price</th>
                            <th></th>
                        </tr>
                        </thead>
                    <tbody id="table-body">
                        <router-link v-for="product in tableView" :key="product.productId" :to="{name: 'product-details', params: {id: product.productId} }">
                            <tr>
                            <td class="sku center">{{ product.productSku }}</td>
                            <td class="product center">{{ product.name }}</td>
                            <td class="price center">{{ product.price }}</td>
                            <td><font-awesome-icon icon="fa-solid fa-cart-plus" class="cart" @click="addItemToCart(product)" v-show="$store.state.token.length > 0" /></td>
                            </tr>

                        </router-link>
                    </tbody>
                    </table>
                </div>
       

        

     </div>
</template>


<script>
import productService from "../services/ProductService";
import cartService from "../services/CartService"

export default {
    props: {
        products: {
            type: Array,
            required: true,
        },
        cardView: {
            type: Boolean,
            required: true,
            default: true
        },
        tableProducts: {
            type: Array,
        },
    },
    data() {
        return {
            details: [],
            searchTerm: '',
            tableView: [],
        }
    },
    computed: {
        filterProducts() {
      return this.$store.state.products.filter(product => {
        return product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      })
    },
    containerClass() {
        return {
            'card-container': this.cardView,
            'table-container': !this.cardView
        }
    }
    },
    methods: {
        getProducts() {
            productService.list().then((response) => {
                this.$store.commit("SET_PRODUCTS", response.data)
                console.log(response.data)
                this.tableView = response.data;
            })
        },
        //Add item to cart with state mutation with cart
        addItemToCart(product) {

            //create new cartItem
            const cartItem = {
                productId: product.productId,
                quantity: 1
            }
             
            cartService.add(cartItem).then((response) => {
                this.$store.commit("ADD_ITEM_TO_CART", response.data)
                this.$router.push("/")
                // alert('Item added to cart')
               
                //refresh cart items
               cartService.listCart()
            }).catch(err => {
                console.error(err)
            })
        }
    },
    created() {
        this.getProducts()
    }
}
</script>

<style scoped>
.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; 
    align-items: center; 
    padding: 10px;
    gap: 10px;
}

/* #product-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  align-items: center; 
  padding: 10px;
  gap: 10px; 
} */

/* #product-cards > .card {
  flex-basis: 23%;
  margin: 5px;
  /* display: flex; */
  /* flex-direction: column;
  padding: 15px;
  border: 1px solid black;
} */

#product-cards > div {
    flex-basis: 23%;
    margin: 5px;
}

.card {
    display: grid;
    /* border: 1px solid red; */
    grid-template-rows: auto auto auto auto;
    /* gap: 10px; */
    align-content: center;
    justify-content: center;
    /* height: auto; */
    padding: 20px;
    border: 1px solid black;
}

.card .sku {
  grid-row: 1;
}

.card .price {
  grid-row: 1;
}

.card .name {
  grid-row: 2;
}

.card .prodImg {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 3;
}

.card .prodImg img {
  max-width: 100%;
  border-radius: 10px;
  justify-self: center;
  align-self: center;
  padding-left: 10px;
  padding-top: 5px;
}

.card .cart {
    grid-row: 4;
    justify-self: end;
    margin-right: 0px;
    margin-top: 5px;
    padding-top: 5px;
}

/* .heading-container {
   display: flex;
   justify-content: space-between;
   align-items: center;
} */

.search-div {
    display: flex;
    justify-content: flex-end;
}

.search-icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    margin-top: 11px;
    position: absolute;
    right: 20px;
}

.product-text {
    padding: 10px;
}

.product-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

#products-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}


/*STYLES FOR TABLE VIEW */
.product-table {
    padding: 10px;
    border: 1px solid blue;
}

.product-table table {
    width: 100%;
    border-collapse: collapse;
}

.product-table th,
.product-table td {
    padding: 8px;
    text-align: center;
}

.product-table th {
    background-color: #f2f2f2;
}

.product-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

.sku {
    width: 20%;
}

.product {
    width: 50%;
}

.price {
    width: 15%;
}

.price, .price + td {
    text-align: right;
}

.price + td .cart {
    display: flex;
    justify-content: center;
}

#table-body {
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-between;
    align-self: center;
}

.center {
    text-align: center;
}


</style>