<template>
<div>
    <!-- <div id="products-header">
      <div class="heading-container">
          <h1>Products</h1>
        <div class="search-div">
            <span class="search-icon"><i class="fas fa-search"></i></span>
            <input class="search" type="text" id="search" placeholder="Search..." v-model="searchTerm">
        </div>
      </div>
     <p class="product-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus maiores, veniam hic ad tenetur tempore minus cupiditate fugit quos fugiat ipsam, necessitatibus id, pariatur reprehenderit! Optio laudantium ipsum sint aliquid.</p>
    </div> -->
   <products :products="filterProducts ? filterProducts : tableProducts" :cardView="cardView" :class="{ 'card-view' : cardView, 'table-view': !cardView }" />
  
   <div class="view-icons">
      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: cardView }"
        v-on:click="toggleView(true)"
        icon="fa-solid fa-grip"
        title="View tiles"
      />
      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: !cardView }"
        v-on:click="toggleView(false)"
        icon="fa-solid fa-table"
        title="View table"
      />
   </div>

  <!-- <div v-show="!cardView" class="product-table">
    <table>
       <thead>
          <tr>
              <th>SKU</th>
              <th>Product</th>
              <th>Price</th>
              <th></th>
          </tr>
        </thead>
      <router-link v-for="product in tableProducts" :key="product.productId" :to="{name: 'product-details', params: {id: product.productId} }">
        <tr>
          <td>{{ product.productSku }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td><font-awesome-icon icon="fa-solid fa-cart-plus" class="cart" /></td>
        </tr>

      </router-link>
    </table>
  </div> -->
  
</div>
  <!-- <div class="home">
    <div id="heading-line">
      <h1>
        Products
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>
    </div>
    <h2>Loading spinner demonstration</h2>
    <p>
      This is a demonstration of how you can show or hide a "spinner" icon to
      let the user know something is happening. Before calling an API, you'd set
      the data property <code>isLoading</code> to <code>true</code>. When the
      call completes, set it to <code>false</code>.
    </p>
    <p>
      For this demonstration, clicking the checkbox below sets
      <code>isLoading</code> to <code>true</code>, so it simulates what the user
      would see when your app is accessing an API.
    </p>
    <input type="checkbox" name="loading" id="loading" v-model="isLoading" /> Is
    Loading
    <p id="login-message" v-if="!isLoggedIn">
      Welcome! You may browse anonymously as much as you wish,<br />
      but you must
      <router-link v-bind:to="{ name: 'login' }">Login</router-link> to add
      items to your shopping cart.
    </p>
    <h2>Font-awesome demonstration</h2>
    <p>
      This code shows you how you can include Font-awesome icons on your page. Below are two icons: 
      one to indicate a "tile" view of products, and another to indicate a "table" view. There's also a little bit
      of styling to get you started, but you can style it your own way. And there's a property to track which view is "active".
    </p>
    -->
    <!-- <font-awesome-icon
      v-bind:class="{ 'view-icon': true, active: cardView }"
      v-on:click="cardView = true"
      icon="fa-solid fa-grip"
      title="View tiles"
    />
    <font-awesome-icon
      v-bind:class="{ 'view-icon': true, active: !cardView }"
      v-on:click="cardView = false"
      icon="fa-solid fa-table"
      title="View table"
    /> -->
 
</template>

<script>
// import LoadingSpinner from "../components/LoadingSpinner.vue";
import productService from "../services/ProductService";
import Products from "../components/Products.vue"
// import ProductDetails from "../components/ProductDetails.vue"

export default {
  name: "ProductsView",
  components: {
    // LoadingSpinner,
    Products,
   
  },
  data() {
    return {
      isLoading: false,
      cardView: true,
      searchTerm: '',
      tableProducts: []
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
       filterProducts() {
      return this.$store.state.products.filter(product => {
        return product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      })
       }

  },

  methods: {
    getProducts() {
      productService.list().then((response) => {
        this.$store.commit("SET_PRODUCTS", response.data);
        this.tableProducts = response.data;
      })
    },
    toggleView(isCardView) {
      this.cardView = isCardView;
    }
  },

  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
#spinner {
  color: green;
}

.view-icons {
  position: relative;
 
}

.view-icon {
  font-size: 1.2rem;
  margin-right: 7px;
  padding: 3px;
  color: #444;
  border-radius: 3px;
}

.view-icon.active {
  background-color: lightgreen;
}

.view-icon:not(.active) {
  font-size: 1.2rem;
  margin-right: 7px;
  cursor: pointer;
}

.view-icon:not(.active):hover {
  color: blue;
  background-color: rgba(255, 255, 255, 0.7);
}

.product-table {
  padding: 10px;
}

/*JUST COPIED THIS FROM THE MID MODULE PROJECT */

/* .heading-container {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 10px;
}

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
} */


</style>