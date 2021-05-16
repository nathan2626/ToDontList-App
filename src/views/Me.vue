<template>
  <div class="row">
    <div class="col-lg-12">

      <div v-if="user">
        <pre><code>{{ user }}</code></pre>
      </div>
      <div v-else>Not logged.</div>

      <h1 class="d-flex justify-content-center">🤔💥 Note App 💥🤔</h1>
      <div>
        <form @submit.prevent="addTask" class="mt-5">
          <input type="text" name="" class="form-control" v-model="form.body" v-focus/>
          <input type="number" min="0" max="1" name="" class="form-control" v-model="form.done" v-focus/>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-success">Créer 💨</button>
          </div>
        </form>
      </div>
    </div>
    <div class="col-lg-12">
      <h2 class="my-4">Mes Notes 🗂️</h2>
      <div class="list-group">
        <a class="text-center text-muted mt-5 list-group-item" v-if="!tasks.length">Pas de notes.</a>
        <div v-for="task in tasks" :key="task.id" class="list-group-item">
          <a>{{ task.body.substring(0, 18) + '... ' }}</a>
          <p>{{ task.done == 0 ? 'Pas fais' : "Fais !"}}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { mapGetters } from "vuex"

export default {
  name: "Me",
  data() {
    return {
      form: {},
      forEdit: false,
      task:"Quel est t'as mission aujourd'hui ?",
      tasks:[],
      selectedIndex: null,
    };
  },
  methods:{
    addTask(){
      if(!this.task){
        return;
      }

      axios.post(
          'http://127.0.0.1:8000/api/tasks', this.form, {
            headers: {
              'Authorization': `Bearer ${this.user.token}`
            }
          }
      ).then((response) => {
        console.log(response);

      }).catch((error) => {
        console.log(error)
      });


    },

  },
  mounted() {
    axios.get(
        'http://127.0.0.1:8000/api/tasks', {
          headers: {
            'Authorization': `Bearer ${this.user.token}`
          }
        }
    ).then((response) => {
      this.tasks = response.data.tasks;
      console.log(response);

    }).catch((error) => {
      console.log(error)
    });
  },
  computed: {
    ...mapGetters({'user': 'auth/user'})
  }
}
</script>