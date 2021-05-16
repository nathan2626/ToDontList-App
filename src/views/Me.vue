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

<!--  <div>-->
<!--    <h1>Me</h1>-->

<!--    <div v-if="user">-->
<!--      <pre><code>{{ user }}</code></pre>-->
<!--    </div>-->
<!--    <div v-else>Not logged.</div>-->
<!--  </div>-->

  <div class="row">
    <div class="col-lg-12">
      <h1 class="d-flex justify-content-center">🤔💥 Note App 💥🤔</h1>
      <div v-if="!forEdit">
        <form @submit.prevent="addTask" class="mt-5">
          <input type="text" name="" class="form-control" v-model="task" v-focus/>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-success" :disabled="!task.trim()">Créer 💨</button>
          </div>
        </form>
      </div>
      <div  v-else >
        <form @submit.prevent="updateTask" class="mt-5">
          <input type="text" name="" class="form-control" v-model="task" v-focus/>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-success" :disabled="!task.trim()">Modifier 💨</button>
          </div>
        </form>
      </div>
      <p class="text-center text-muted mt-3">👉 Cliquez sur le début de votre note pour pouvoir la modifier. 👈</p>
      <p class="text-center text-muted mt-4" ><strong>{{tasks.length}}</strong>{{tasks.length <= 1 ? ' note': ' notes'}}</p>
    </div>
    <div class="col-lg-12">
      <h2 class="my-4">Mes Notes 🗂️</h2>
      <div class="list-group">
        <a class="text-center text-muted mt-5 list-group-item" v-if="!tasks.length">Pas de notes.</a>
        <form @submit.prevent="addTask" v-for="task in tasks" :key="task.id" class="list-group-item">
          <a @click.prevent="viewTask()" style="text-decoration: none; cursor: pointer;" >{{ task.content.substring(0, 18) + '... ' }}</a>
          <textarea v-model="task.content" class="showAllTask" style="display: none;"></textarea>
          <br>
          <button @click.prevent="deleteTask(task.id)" class="btn btn-danger btn-sm mt-4">Supprimer</button>
          <br>
          <button style="display: none;" type="submit" class="btn btn-primary btn-sm mt-2 showAllEdit" >Modifier</button>
          <p class="mt-2" style="color: black">{{ task.content.length + (task.content.length == 1 ? ' caractère.' : ' caractères.') }}</p>
          <p style="color: black; margin-top: -15px">{{ counterWords(task.content) + (task.content.length == 1 ? ' mot.' : ' mots.') }}</p>
        </form>
      </div>
    </div>

    <div class="col-lg-9 mt-5">
      <div class="card mt-5">
        <div class="card-body">
          <h3 class="card-title">📁 Détails de votre note 📁</h3>
          <p v-text="task.content"></p>
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
      const task ={
        id: Date.now(),
        content: this.task,
      };
      // console.log(this.tasks);
      // console.log(this.tasks[0][task.id]);
      // if(tasks[task.id].includes(task.id))
      this.tasks.unshift(task);
      this.task = "";
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    editTask(content){
      this.forEdit = true;
      console.log('edition');
      this.task.content = content;

      const task ={
        id: Date.now(),
        content: content,
      };

      this.tasks.unshift(task);
      this.task = "";
      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      // this.selectedIndex = id;
    },
    updateTask(){
      this.tasks.splice(this.id, 1, this.task);
      this.task = "";
      this.forEdit = false;
      console.log('updating');

    },
    deleteTask(id){
      this.tasks = this.tasks.filter((task)=>{
        return id !== task.id;
      });
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    counterWords(task){
      task = task.replace(/(^\s*)|(\s*$)/gi,"");
      task = task.replace(/[ ]{2,}/gi," ");
      task = task.replace(/\n /,"\n");
      return task.split(' ').length;
    },
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
  },
  mounted() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  },
  computed: {
    ...mapGetters({'user': 'auth/user'})
  }
}
</script>