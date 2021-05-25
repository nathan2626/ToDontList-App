export const token = (state, token) => {
    state.user.token = token
}

export const data = (state, data) => {
    state.user.data = data
}

export const tasks = (state, data) => {
    state.tasks = data
}
export const addTask = (state, task) => {
    state.tasks.unshift(task)
}

export const editTask = (state, data) => {
    state.tasks.forEach(
        function(task, index) {
            if(task.id == data.id){
                this[index] = data;
                state.tasks.unshift(data)
            }
        }, state.tasks)
}

export const deleteTask = (state, id) => {
    state.tasks.forEach(
        function(task, index) {
            if(task.id == id){
                this.splice(index, 1)
            }
        }, state.tasks)
}