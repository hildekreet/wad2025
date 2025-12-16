import { createStore } from 'vuex'
import api from '../api'

export default createStore({
  state: {
    posts: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts.map(post => ({ ...post, likes: 0, }));
    },

    increaseLikes(state, postId) {
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.likes++;
        console.log('likes updated', post)
      }
    },

    resetLikes(state) {
      state.posts.forEach(post => {
        post.likes = 0
      });
    },

    clearPosts(state) {
      state.posts = [];
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      try{
        const res = await api.get('/posts')
        commit('setPosts', res.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    },

    likePost({commit}, postId) {
      commit('increaseLikes', postId)
    },

    resetClicked({commit}) {
      commit('resetLikes')
    },

    async deleteAllPosts({ commit }) {
      try {
        await api.delete('/posts')
        commit('clearPosts')
      } catch (error) {
        console.error('Error deleting all posts:', error)
        throw error
      }
    }
  },
  getters: {
    getPosts: state => state.posts
  }
});