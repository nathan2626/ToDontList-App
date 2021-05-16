<!--<template>-->
<!--  <div>-->
<!--    <h1>Login</h1>-->
<!--    <form @submit.prevent="login">-->

<!--      <label for="email">Email</label>-->
<!--      <input type="email" id="email" name="email" v-model="form.email">-->

<!--      <label for="password">Password</label>-->
<!--      <input type="password" id="password" name="password" v-model="form.password">-->

<!--      <button type="submit">Login</button>-->

<!--    </form>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->

<!--export default {-->
<!--name: "Login",-->
<!--  data() {-->
<!--    return {-->
<!--      form: {-->
<!--        "device_name": "Ionic"-->
<!--      }-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    login() {-->
<!--      console.log(this.form)-->
<!--      axios.post(-->
<!--          "http://127.0.0.1:8000/api/auth/login", this.form)-->
<!--          .then((response) => {-->
<!--            console.log(response)-->
<!--            localStorage.setItem('auth-token', response.data.token)-->
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
