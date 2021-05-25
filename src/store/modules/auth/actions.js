import axios from 'axios'
import router from "../../../router";

export const login = ({ commit }, form) => {
    axios.post(
        'https://todontlist-api.herokuapp.com/api/auth/login',
        {
            email: form.email,
            password: form.password,
            device_name: "vue"
        }
    ).then((response) => {
        console.log(response);

        commit('token', response.data.token)

        const user = {
            name: response.data.name,
            email: response.data.email,
            created_at: response.data.created_at
        }

        commit('data', user)
        router.push({name : 'Me'});

    }).catch((error) => {
        console.log(error)
    });
}

export const register = ({ commit }, form) => {
    axios.post(
        'https://todontlist-api.herokuapp.com/api/auth/register',
        {
            name: form.name,
            email: form.email,
            password: form.password,
            device_name: "vue"
        }
    ).then((response) => {
        console.log(response);
        commit('token', response.data.token)

        const user = {
            name: response.data.name,
            email: response.data.email,
            created_at: response.data.created_at
        }

        commit('data', user)
        router.push({name : 'Login'});

    }).catch((error) => {
        console.log(error)
    });
}

export const logout = ({ commit, state }) => {
    const token = state.user.token;
    if (!token) {
        return;
    }

    axios.post(
        'https://todontlist-api.herokuapp.com/api/auth/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
        console.log(response);
        router.push({name : 'Home'});
    }).catch((error) => {
        console.log(error)
    });
    commit('token', null);
    commit('data', {});
}

export const addTask = ({ commit, getters }, form) => {

    if(!form.body || !form.done){
        return;
    }

    axios.post(
        'https://todontlist-api.herokuapp.com/api/tasks', form, {
            headers: {
                'Authorization': `Bearer ${getters.token}`
            }
        }
    ).then((response) => {
        console.log(response);

        commit('addTask', response.data.task)

    }).catch((error) => {
        console.log(error)
    });
}

export const editTask = ({ commit, getters }, task) => {

    console.log(task);

    if(!task.body || !task.done){
        return;
    }

    axios.put(
        `https://todontlist-api.herokuapp.com/api/tasks/${task.id}`,
        {
            body: task.body,
            done: task.done
        },{
            headers: {
                'Authorization': `Bearer ${getters.token}`
            }
        }
    ).then((response) => {
        console.log(response);

        commit('editTask', response.data.task[0])

    }).catch((error) => {
        console.log(error)
    });
}

export const deleteTask = ({ commit, getters }, id) => {

    axios.delete(
        `https://todontlist-api.herokuapp.com/api/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${getters.token}`
            }
        }
    ).then((response) => {
        console.log(response);

        commit('deleteTask', id)

    }).catch((error) => {
        console.log(error)
    });
}

export const tasks = ({ commit, getters }) => {
    axios.get(
        'https://todontlist-api.herokuapp.com/api/tasks', {
            headers: {
                'Authorization': `Bearer ${getters.token}`
            }
        }
    ).then((response) => {
        console.log(response);

        commit('tasks', response.data.tasks)

    }).catch((error) => {
        console.log(error)
    });
}