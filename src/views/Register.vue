<!--<template>-->
<!--  <div>-->
<!--    <h1>Register</h1>-->
<!--    <form @submit.prevent="register">-->
<!--      <label for="name">Name</label>-->
<!--      <input type="text" id="name" name="name" v-model="form.name">-->

<!--      <label for="email">Email</label>-->
<!--      <input type="email" id="email" name="email" v-model="form.email">-->

<!--      <label for="password">Password</label>-->
<!--      <input type="password" id="password" name="password" v-model="form.password">-->

<!--      <button type="submit">Register</button>-->

<!--    </form>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from 'axios'-->

<!--export default {-->
<!--  name: "Register",-->
<!--  data() {-->
<!--    return {-->
<!--      form: {-->
<!--        "device_name": "Ionic"-->
<!--      }-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    register() {-->
<!--      console.log(this.form)-->
<!--      axios.post(-->
<!--          "http://127.0.0.1:8000/api/auth/register", this.form)-->
<!--          .then((response) => {-->
<!--            console.log(response)-->
<!--            // localStorage.setItem('auth-token', response.data.token)-->
<!--          })-->
<!--          .catch((error) => {-->
<!--            console.log(error);-->
<!--          })-->

<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

i

Keppler 1.4.1

Real time code sharing for you lectures and presentations.

GitHub
NPM
Development

Bruno Simon (GitHub, Twitter, Site)
UX / UI

Tom Bonnike
Thibaud Vaubourg
Aymeric Sans
Axel Chalon
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
