import { createStore } from 'vuex'
import postsData from '../Data/my.json'

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
  },
  actions: {
    fetchPosts({ commit }) {
      commit('setPosts', postsData.Posts)
    },

    likePost({commit}, postId) {
      commit('increaseLikes', postId)
    },

    resetClicked({commit}) {
      commit('resetLikes')
    },
  },
  getters: {
    getPosts: state => state.posts
  }
});