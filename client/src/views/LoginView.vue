<template>
  <div id="login">
    <form v-on:submit.prevent="login">
      <h1>Please Sign In</h1>
      <div id="fields">
        <div class="form-row">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            v-model="user.username"
            required
            autofocus
          />
        </div>
        <div class="form-row">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            v-model="user.password"
            required
          />
        </div>
        <div class="form-row">
          <button type="submit">Sign in</button>
        </div>
      </div>
      <hr/>
      Need an account? <router-link v-bind:to="{ name: 'register' }">Register!</router-link>
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  name: "LoginView",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (!response) {
            alert(error);
          } else if (response.status === 401) {
            alert("Invalid username and password!");
          } else {
            alert(response.message);
          }
        });
    },
  },
};
</script>

<style scoped>

/*ADDED BASIC STYLING*/

#login {
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  padding: 10px;
}

#fields {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.form-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

label {
  margin-right: 10px;
  min-width: 80px;
}

input {
  flex: 1;
  margin: 0;
}

.button {
  margin-left: auto;
}

</style>
