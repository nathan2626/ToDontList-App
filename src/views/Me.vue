<template>
  <div class="row">
    <div class="col-lg-12">

<!--      <div v-if="user">-->
<!--        <pre><code>{{ user }}</code></pre>-->
<!--        <pre><code>{{ tasks }}</code></pre>-->
<!--      </div>-->
<!--      <div v-else>Not logged.</div>-->

      <h1 class="d-flex justify-content-center">🤔💥 To Dont List 💥🤔</h1>
      <div>
        <div>
          <form @submit.prevent="addTask(form)" class="mt-5">
            <input type="text" name="" class="form-control" v-model="form.body" v-focus/>
            <input type="number" min="0" max="1" name="" class="form-control" v-model="form.done"/>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-success">Créer 💨</button>
            </div>
          </form>
        </div>
        <p class="text-center text-muted mt-3">👉 Cliquez sur le début de votre note pour pouvoir la modifier. 👈</p>
      </div>
    </div>
    <div class="col-lg-12">
      <h2 class="my-4">Mes Notes 🗂️</h2>
      <div class="list-group">
        <a class="text-center text-muted mt-5 list-group-item" v-if="!tasks.length">Pas de notes.</a>

        <div v-for="task in tasks" :key="task.id" class="mb-5">
          <form @submit.prevent="editTask(task)"  class="list-group-item">
            <textarea v-model="task.body" class="showAllTask"></textarea>
            <br>
            <input v-model="task.done" type="number" min="0" max="1" name="doneIn" id="doneIn"><br>
            <label for="doneIn">{{ task.done == 0 ? 'Pas fais' : "Fais !"}}</label>
            <br>
            <br>
            <button type="submit" class="btn btn-primary btn-sm mt-2" >Modifier</button>
            <p class="mt-2" style="color: black">{{ task.body.length + (task.body.length == 1 ? ' caractère.' : ' caractères.') }}</p>
          </form>
          <button @click.prevent="deleteTask(task.id)" class="btn btn-danger btn-sm mt-4">Supprimer</button>
        </div>

<!--        <div v-for="task in tasks" :key="task.id" class="list-group-item">-->
<!--          <a>{{ task.body.substring(0, 18) + '... ' }}</a>-->
<!--          <input v-model="task.done" type="number" min="0" max="1" value="" name="doneIn" id="doneIn">-->
<!--          <label for="doneIn">{{ task.done == 0 ? 'Pas fais' : "Fais !"}}</label>-->
<!--        </div>-->
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from "vuex"

export default {
  name: "Me",
  data() {
    return {
      form: {},
      forEdit: false,
      selectedIndex: null,
    };
  },
  methods:{
    ...mapActions({
      'loadTasks': 'auth/tasks',
      'addTask' : 'auth/addTask',
      'editTask' : 'auth/editTask',
      'deleteTask' : 'auth/deleteTask',

      viewTask(){
        let showAllTask = document.getElementsByClassName('showAllTask');
        let showAllEdit = document.getElementsByClassName('showAllEdit');

        let cicle = 0;
        for (let i=0; i< showAllTask.length; i+=1){
          for (let i=0; i< showAllEdit.length; i+=1) {
            if(showAllTask[i].style.display === 'none'){
              showAllEdit[i].style.display = 'none';
            } else {
              showAllEdit[i].style.display = 'block';
            }
            if (cicle) {
              showAllTask[i].style.display = 'none';
              cicle = 1;
            } else {
              showAllTask[i].style.display = 'block';
              cicle = 0;
            }
          }
        }
        // console.log(content);
        // return content;
      },
    }),

  },
  mounted() {
    this.loadTasks()
  },
  computed: {
    ...mapGetters({'user': 'auth/user', 'tasks': 'auth/tasks'})
  }
}

</script>