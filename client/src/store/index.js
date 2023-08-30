import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

/*
 * The authorization header is set for axios when you login but what happens when you come back or
 * the page is refreshed. When that happens you need to check for the token in local storage and if it
 * exists you should set the header so that it will be attached to each request
 */
const currentToken = localStorage.getItem('token')
const currentUser = JSON.parse(localStorage.getItem('user'));
//created new cart and getting from local
const currentCart = JSON.parse(localStorage.getItem('cart'));

if (currentToken != null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
}

export default new Vuex.Store({
  state: {
    token: currentToken || '',
    user: currentUser || {},
    //store products
    products: [],
    //cart either local or empty array
    cart: currentCart || []
  },
  mutations: {
    SET_PRODUCTS(state, data) {
      state.products = data;
    },
    SET_CART(state, data) {
      state.cart = data;
    },
    ADD_ITEM_TO_CART(state, data) {
      state.cart.push(data)
      //store new cart to local
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    SET_AUTH_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    REMOVE_ITEM_FROM_CART(state, cartItemId) {
      state.cart = state.cart.filter(item => item.cartItemId !== cartItemId);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    CLEAR_CART(state) {
      state.cart = [];
      localStorage.removeItem('cart');
    },
    LOGOUT(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('cart')
      state.token = '';
      state.user = {};
      state.cart = []
      axios.defaults.headers.common = {};
    }
  },

})
