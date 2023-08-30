<template>
  <div>
      <product-details :id="parseInt($route.params.id)" />
  </div>
</template>

<script>
import ProductDetails from "../components/ProductDetails.vue"

export default {
    components: {
        ProductDetails
    }

}
</script>

<style>

</style>