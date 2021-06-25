import axios from "axios";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  fetchTodos: async ({ commit }) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );

      commit("setTodos", response.data);
    } catch (err) {
      console.log(err);
    }
  },

  addTodo: async ({ commit }, title) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        { title, completed: false }
      );

      commit("newTodo", response.data);
    } catch (err) {
      console.log(err);
    }
  },

  deleteTodo: async ({ commit }, id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

      commit("removeTodo", id);
    } catch (err) {
      console.log(err);
    }
  },

  async filterTodos({ commit }, event) {
    // console.log(event);

    const limit = parseInt(event.target.value);

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );

    commit("setTodos", response.data);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),

  newTodo: (state, todo) => state.todos.unshift(todo),

  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
