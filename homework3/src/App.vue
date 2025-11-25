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
