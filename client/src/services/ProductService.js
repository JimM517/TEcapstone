import axios from 'axios'


// const http = axios.create({
//     baseURL: "http://localhost:9000"
// })

export default {

    list() {
        return axios.get('/products');
    },

    get(id) {
        return axios.get(`/products/${id}`)
    },

    create(product) {
        return axios.post("/products/", product)
    },

    update(id, product) {
        return axios.put(`/products/${id}`, product)
    },

    delete(id) {
        return axios.delete(`/products/${id}`)
    }


}