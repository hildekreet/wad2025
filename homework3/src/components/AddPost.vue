<template>
  <div>
    <AppHeader :isLogin="isLogin" @update:isLogin="isLogin = $event" />

    <div class="container">
      <main class="add-post-form">
        <h2>Add a New Post</h2>

        <form @submit.prevent="submitPost">
          <textarea 
            v-model="content" 
            placeholder="Write your post here..." 
            required
          ></textarea>

          <button type="submit" class="submit-btn">Add Post</button>
        </form>
      </main>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import api from '../api'

export default {
  name: 'AddPostView',
  components: { AppHeader, AppFooter },
  data() {
    return {
      content: '',
      isLogin: !!localStorage.getItem('token')
    }
  },
  methods: {
    async submitPost() {
      if (!this.content.trim()) return

      try {
        const token = localStorage.getItem('token')
        await api.post('/posts', { content: this.content }, {
          headers: { Authorization: `Bearer ${token}` }
        })

        // peale edukat lisamist suunab tagasi MainView
        this.$router.push('/')
      } catch (err) {
        console.error(err)
        alert(err.response?.data?.message || 'Failed to add post')
      }
    }
  },
  mounted() {
    if (!this.isLogin) {
      this.$router.push('/login') // turvalisus: ainult sisseloginud kasutajale
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}

.add-post-form {
  width: 90%;
  max-width: 600px;
  background-color: #eee;
  padding: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-post-form h2 {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  min-height: 150px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  resize: vertical;
  margin-bottom: 20px;
  font-size: 16px;
}

.submit-btn {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #555;
}
</style>