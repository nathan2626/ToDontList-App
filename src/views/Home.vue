<template>
  <div>
    <h1>Register</h1>

    <form @submit.prevent="register(form)">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" v-model="form.name">

      <label for="email">Email</label>
      <input type="email" id="email" name="email" v-model="form.email">

      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="form.password">

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: "Register",
  data() {
    return {
      form: {}
    };
  },
  methods: {
    ...mapActions({'register': 'auth/register'})
  }
}
</script>
