<template>
  <div>
    <AppHeader :isLogin="isLogin" @update:isLogin="isLogin = $event" />
    
    <div class="container">
      <main class="post-content">
        <div v-if="loading" class="loading">Loading post...</div>
        
        <div v-else-if="post" class="post-detail">
          <div class="post-header">
            <div class="header-left">
              <img 
                class="avatar" 
                :src="post.avatar || 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'" 
                alt="Avatar"
              >
              <div class="post-info">
                <div class="post-author">{{ post.author }}</div>
                <span class="date">{{ formatDate(post.created_at) }}</span>
              </div>
            </div>
          </div>

          <div class="post-body">
            <textarea 
              v-if="isEditing"
              v-model="editedContent"
              class="edit-textarea"
              placeholder="Edit your post..."
            ></textarea>
            <p v-else class="post-text">{{ post.content }}</p>
            
            <img 
              v-if="post.image_base64" 
              :src="'data:image/png;base64,' + post.image_base64" 
              class="post-image"
              alt="Post image"
            >
          </div>

          <div class="post-footer">
            <div class="likes-section">
              <button class="like-btn" @click="likePost">
                👍 {{ post.likes }}
              </button>
            </div>

            <div v-if="isLogin" class="action-buttons">
              <button 
                v-if="!isEditing" 
                class="action-btn update-btn" 
                @click="startEditing"
              >
                ✏️ Update
              </button>
              <button 
                v-if="isEditing" 
                class="action-btn save-btn" 
                @click="savePost"
              >
                💾 Save
              </button>
              <button 
                v-if="isEditing" 
                class="action-btn cancel-btn" 
                @click="cancelEditing"
              >
                ❌ Cancel
              </button>
              <button 
                class="action-btn delete-btn" 
                @click="deletePost"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>

        <div v-else class="error">
          Post not found
        </div>

        <button class="back-btn" @click="goBack">
          ← Back to Home
        </button>
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
  name: 'PostView',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      post: null,
      loading: true,
      isLogin: !!localStorage.getItem('token'),
      isEditing: false,
      editedContent: ''
    }
  },
  methods: {
    async fetchPost() {
      try {
        const postId = this.$route.params.id
        const token = localStorage.getItem('token')
        const response = await api.get(`/posts/${postId}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        this.post = response.data
        this.editedContent = this.post.content
      } catch (err) {
        console.error('Error fetching post:', err)
        alert('Failed to load post')
      } finally {
        this.loading = false
      }
    },

    async likePost() {
      try {
        const token = localStorage.getItem('token')
        await api.put(`/posts/${this.post.id}/like`, {}, {
            headers: { Authorization: `Bearer ${token}`}
        })
        this.post.likes = (this.post.likes || 0) + 1
      } catch (err) {
        console.error('Error liking post:', err)
      }
    },

    startEditing() {
      this.isEditing = true
    },

    cancelEditing() {
      this.isEditing = false
      this.editedContent = this.post.content
    },

    async savePost() {
      if (!this.editedContent.trim()) {
        alert('Post content cannot be empty')
        return
      }

      try {
        const token = localStorage.getItem('token')
        await api.put(`/posts/${this.post.id}`, 
          { content: this.editedContent },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        
        this.post.content = this.editedContent
        this.isEditing = false
        alert('Post updated successfully!')
      } catch (err) {
        console.error('Error updating post:', err)
        alert(err.response?.data?.message || 'Failed to update post')
      }
    },

    async deletePost() {
      if (!confirm('Are you sure you want to delete this post?')) {
        return
      }

      try {
        const token = localStorage.getItem('token')
        await api.delete(`/posts/${this.post.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        alert('Post deleted successfully!')
        this.$router.push('/')
      } catch (err) {
        console.error('Error deleting post:', err)
        alert(err.response?.data?.message || 'Failed to delete post')
      }
    },

    formatDate(dateString) {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },

    goBack() {
      this.$router.push('/')
    }
  },
  mounted() {
    this.fetchPost()
  }
}
</script>

<style scoped>
.container {
  margin-top: 80px;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  min-height: calc(100vh - 200px);
}

.post-content {
  width: 90%;
  max-width: 800px;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #666;
  padding: 40px;
}

.error {
  text-align: center;
  font-size: 1.2em;
  color: #ff6b6b;
  padding: 40px;
}

.post-detail {
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid #ddd;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #333;
}

.post-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.post-author {
  font-weight: bold;
  font-size: 1.2em;
  color: #333;
}

.date {
  font-size: 0.9em;
  color: #666;
}

.post-body {
  margin: 25px 0;
}

.post-text {
  font-size: 1.1em;
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;
  white-space: pre-wrap;
}

.edit-textarea {
  width: 100%;
  min-height: 150px;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #333;
  resize: vertical;
  font-size: 1.1em;
  font-family: inherit;
  line-height: 1.6;
  margin-bottom: 20px;
}

.post-image {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-footer {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 2px solid #ddd;
}

.likes-section {
  display: flex;
  justify-content: flex-start;
}

.like-btn {
  background-color: #333;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.1em;
  transition: all 0.3s ease;
  font-weight: 500;
}

.like-btn:hover {
  background-color: #555;
  transform: scale(1.05);
}

.action-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  transition: all 0.3s ease;
}

.update-btn {
  background-color: #4CAF50;
  color: white;
}

.update-btn:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.save-btn {
  background-color: #2196F3;
  color: white;
}

.save-btn:hover {
  background-color: #0b7dda;
  transform: scale(1.05);
}

.cancel-btn {
  background-color: #9E9E9E;
  color: white;
}

.cancel-btn:hover {
  background-color: #757575;
  transform: scale(1.05);
}

.delete-btn {
  background-color: #ff6b6b;
  color: white;
}

.delete-btn:hover {
  background-color: #ff5252;
  transform: scale(1.05);
}

.back-btn {
  background-color: #333;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
}

.back-btn:hover {
  background-color: #555;
  transform: translateX(-5px);
}

@media (max-width: 768px) {
  .container {
    padding: 20px 10px;
  }

  .post-detail {
    padding: 20px;
  }

  .avatar {
    width: 50px;
    height: 50px;
  }

  .post-author {
    font-size: 1em;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }
}
</style>