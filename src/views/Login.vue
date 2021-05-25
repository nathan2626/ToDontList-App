<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="login(form)">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" v-model="form.email">

      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="form.password">

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "Login",
  data() {
    return {
      form: {}
    };
  },
  methods: {
    ...mapActions({'login': 'auth/login'})
  }
}
</script>
