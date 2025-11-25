import { createStore } from 'vuex'
import postsData from '../Data/my.json'

export default createStore({
  state: {
    posts: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts.map(post => ({ ...post, likes: 0 }))
    },
    likePost(state, postId) {
      const post = state.posts.find(p => p.id === postId)
      if(post) post.likes++
    },
    resetLikes(state) {
      state.posts.forEach(p => p.likes = 0)
    }
  },
  actions: {
    fetchPosts({ commit }) {
      // Using the imported JSON
      commit('setPosts', postsData.Posts)
    }
  },
  getters: {
    getPosts: state => state.posts
  }
})