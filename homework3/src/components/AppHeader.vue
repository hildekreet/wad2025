<template>
  <header class="navbar">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/signup" class="nav-link">Signup</router-link>
  </header>
</template>

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