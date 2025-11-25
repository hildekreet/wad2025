import { createStore } from 'vuex'
import postsData from '../Data/my.json'

export default createStore({
  state: {
    posts: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts.map(post => ({ ...post}))
    },
  },
  actions: {
    fetchPosts({ commit }) {
      commit('setPosts', postsData.Posts)
    }
  },
  getters: {
    getPosts: state => state.posts
  }
})