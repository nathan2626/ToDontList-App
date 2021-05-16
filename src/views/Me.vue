<!--<template>-->
<!--  <div v-if="userData.email">-->
<!--    <h1>Me</h1>-->
<!--    <p>Email : {{ userData.email}} </p>-->
<!--    <p>Name : {{ userData.name }} </p>-->
<!--    <p>Created_at : {{ userData.created_at }}</p>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->


<!--export default {-->

<!--  name: "Me",-->
<!--  data() {-->
<!--    return {-->
<!--      form: {},-->
<!--      userData: {-->
<!--        email: "",-->
<!--        name: "",-->
<!--        created_at: ""-->
<!--      }-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    me() {-->
<!--      console.log(this.form)-->
<!--      const token = localStorage.getItem('auth-token')-->
<!--      if(!token) {-->
<!--        return;-->
<!--      }-->
<!--      axios.post(-->
<!--          "http://127.0.0.1:8000/api/auth/me", {}, {-->
<!--            headers: {-->
<!--              "Authorization": `Bearer ${token}`-->
<!--            }})-->
<!--          .then((response) => {-->
<!--            console.log(response.data)-->
<!--            this.userData.email = response.data.email;-->
<!--            this.userData.name = response.data.name;-->
<!--            this.userData.created_at = response.data.created_at;-->
<!--          })-->
<!--          .catch((error) => {-->
<!--            console.log(error);-->
<!--          })-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.me()-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
  <div>
    <h1>Me</h1>

    <div v-if="user">
      <pre><code>{{ user }}</code></pre>
    </div>
    <div v-else>Not logged.</div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from "vuex"

export default {
  name: "Me",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({'user': 'auth/user'})
  }
}
</script>