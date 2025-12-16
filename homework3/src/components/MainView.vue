<template>
  <div>
    <AppHeader :isLogin="isLogin" @update:isLogin="isLogin= $event" />
    <div class="container" id="mainContainer">
      <main class="posts">
        <div 
          v-for="post in posts" 
          :key="post.id" 
          class="post"
          @click="viewPost(post.id)"
        >
          <div class="post-header">
            <div class="header-left">
              <img 
              class="avatar" 
              :src="post.avatar || 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'" 
              alt="Avatar"
              >
              <div class="post-author">{{ post.author }}</div>
            </div>
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
            <button class="like-btn" @click.stop="like(post.id)">
              👍 {{ post.likes}}
            </button>
          </div>
        </div>
        <button class="reset-btn" @click="resetClicked">Reset all likes</button>
        <button v-if="isLogin" class="reset-btn delete-all-btn" @click="handleDeleteAll">Delete All Posts</button>
      </main>
    </div>
    <AppFooter />
  </div>


</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'

export default {
  name: 'MainView',
  components: {
    AppHeader,
    AppFooter
  },

  data() {
    return {
      isLogin: !!localStorage.getItem('token')
    }
  },

  computed: {
    ...mapGetters(['getPosts']),
    posts() {
      return this.getPosts
    }
  },
  methods: {
    ...mapActions(['fetchPosts', 'likePost', 'resetClicked', 'deleteAllPosts']),

    like(id) {
        this.likePost(id)
    },

    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },

    viewPost(postId) {
      this.$router.push(`/post/${postId}`)
    },

    async handleDeleteAll() {
      if (confirm('Are you sure you want to delete all posts? This action cannot be undone.')) {
        try {
          await this.deleteAllPosts()
          alert('All posts deleted successfully')
        } catch (err) {
          console.error(err)
          alert('Failed to delete posts')
        }
      }
    }
  },
  mounted() {
    if (this.isLogin) {
      this.fetchPosts()
    }
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
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-all-btn {
  background-color: #ff6b6b;
  color: white;
}

.post:hover {
  background-color: #d0d0d0;
}

.delete-all-btn:hover { 
  background-color: #ff5252;
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

.header-left {
  display: flex;
  align-items: center;
}

.post-author {
  margin-left: 20px;
  font-weight: bold;
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


.reset-btn {
  background-color: #dcdcdc;
  border-radius: 25px;
  margin-bottom: 20px;
  padding: 10px 0;
  border: none;
  cursor: pointer;
  font-size: 1.1em;
}

.reset-btn:hover {
  background-color: #ccc;
}
</style>