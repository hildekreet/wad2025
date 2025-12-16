<template>
  <header class="navbar">
    <router-link to="/" class="nav-link">Home</router-link>
    <template v-if="!isLogin">
      <router-link to="/login" class="nav-link">Login / Signup</router-link>
    </template>
    <template v-else>
      <router-link to="/add-post" class="nav-link">Add Post</router-link>
      <button class="nav-link logout-btn" @click="logout">Logout</button>
    </template>
  </header>
</template>

<script>
  export default {
  name: 'AppHeader',
  props: {
    isLogin: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
      this.$emit('update:isLogin', false)
    }
  }
}
</script>

<style scoped>
.navbar {
  overflow: hidden;
  background-color: #333;
  display: flex;
  width: 100%;
  position: fixed;
  top: 0;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
  height: 50px;
  align-items: left;
}
.nav-link {
  color: #f2f2f2;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
.nav-link:hover {
  background-color: #ddd;
  color: black;
}
</style>