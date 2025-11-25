<!--
<template>
  <AppHeader/>
  <main id="content">
      <router-view/>
    </main>
  <LoginView/>
  <AppFooter/>
</template>

<script>
import LoginView from './components/LoginView.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
export default {
  name: 'App',
  components: {
    AppHeader,
    LoginView,
    AppFooter
  }
}
</script>


<style>
body, html, #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
#content {
  margin-top: 80px;
}
</style>
-->

<template>
  <div>
    <AppHeader />
    <div class="container" id="mainContainer">
      <main class="posts">
        <div 
          v-for="post in posts" 
          :key="post.id" 
          class="post"
        >
          <div class="post-header">
            <img 
              class="avatar" 
              :src="post.avatar || 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'" 
              alt="Avatar"
            >
            <span class="date">{{ formatDate(post.created_at) }}</span>
          </div>
          <div class="post-body">
            <p class="post-text">{{ post.content }}</p>
            <img 
              v-if="post.image_base64" 
              :src="'data:image/png;base64,' + post.image_base64" 
              class="post-image"
              alt="Post image"
            >
          </div>
          <div class="post-footer">
            <button class="like-btn">
              👍 {{ post.likes || 0 }}
            </button>
          </div>
        </div>
      </main>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'MainView',
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    ...mapGetters(['getPosts']),
    posts() {
      return this.getPosts
    }
  },
  methods: {
    ...mapActions(['fetchPosts']),
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
  },
  mounted() {
    this.fetchPosts()
  }
}
</script>

<style scoped>
.container {
  margin-top: 100px; /* leave space for header */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.posts {
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 800px;
}

.post {
  background-color: #dcdcdc;
  border-radius: 25px;
  margin-bottom: 20px;
  padding: 10px 0;
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 20px;
}

.date {
  margin-right: 20px;
  font-size: 0.9em;
}

.post-body {
  margin: 10px 20px;
}

.post-text {
  margin-bottom: 10px;
}

.post-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.post-footer {
  display: flex;
  justify-content: flex-start;
  padding-left: 20px;
  margin-bottom: 10px;
}

.like-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1em;
}

.like-btn:hover {
  background-color: #ccc;
  border-radius: 5px;
}
</style>