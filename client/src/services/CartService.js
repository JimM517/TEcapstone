import axios from 'axios'

export default {
    listCart() {
        return axios.get(`/cart`)
    },

    getCart(id) {
        return axios.get(`/cart/${id}`)
    },

    //not sure if i need this or an add function
    create(cart) {
        return axios.post("/cart/", cart)
    },

    //trying add to cart function
    //works in theory
    add(item) {
        return axios.post("/cart/items", item)
    },

    update(id, cart) {
        return axios.put(`/cart/${id}`, cart)
    },

    delete(id) {
        return axios.delete(`/cart/items/${id}`)
    }

}