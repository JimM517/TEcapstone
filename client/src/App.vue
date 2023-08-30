<template>
  <div id="app">
    <header id="main-header">
      <img src="https://via.placeholder.com/700x200.jpg" />
    </header>
    <nav>
      <div class="left">
      <router-link v-bind:to="{name: 'home'}">Home</router-link>
      <router-link v-bind:to="{name : 'cart'}">Cart</router-link>
      </div>
      <div class="right">
      <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token">Logout</router-link>
      <router-link v-bind:to="{ name: 'login' }" v-else>Login</router-link>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
    <footer>&copy;</footer>
  </div>
</template>

<script>
// import Products from "./components/Products.vue"


  export default {
    name: 'app',
    components: {
    
    }
  }
</script>

<style scoped>

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    #app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#main-header {
  text-align: center;
  margin-top: 20px; /* Adjust as needed */
}

nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid red;
  padding: 10px;
}

.left {
  display: flex;
  gap: 10px;
}

.right {
  display: flex;
  gap: 10px;
  margin-left: auto;
}


    /* #main-header {
      text-align: center;
      position: fixed;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
    }

    nav {
      display: flex;
      justify-content: space-between;
      position: absolute;
      border: 1px solid red;
      top: 220px;
      width: 100%;
      padding: 10px;
    }

    .left {
      display: flex;
      gap: 10px;
    }

    .right {
      display: flex;
      gap: 10px;
      margin-left: auto;
      margin-right: 10px;
    }

    */

    main {
    overflow-y: scroll;
    border-bottom: 1px solid black;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 300px;
    height: 100vh;
    padding: 15px;
} 

footer {
  position: fixed;
  bottom: 0;
  left: 0;
}


</style>