<template>
    <div class="page-wrapper">
        <div class="page-container">
        <h2>{{ isLogin ? "Login" : "Create Account" }}</h2>

        <form @submit.prevent="submitForm">
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" @input="!isLogin && validatePassword()" required />

        <button class="btn" type="submit">{{ isLogin ? "Login" : "Create Account" }}</button>

        <p v-if="!isLogin && passwordError" class="error-msg">
          {{ passwordError }}
        </p>
        </form>
        <p style="margin-top: 10px; cursor: pointer; color: blue;" @click="toggleMode">
        {{ isLogin ? "Don't have an account? Sign up" : "Already have an account? Login" }}
        </p>
    </div>
    </div>
    
</template>

<script>
import api from '../api'

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      passwordError: "",
      isLogin: true
    };
  },
  methods: {

    submitForm() {
      if (this.isLogin) {
        this.handleLogin()
      } else {
        this.handleSignup()
      }
    },

    toggleMode() {
      this.isLogin = !this.isLogin;
      this.passwordError = "";
      this.password = "";
      this.email = "";
    },

    validatePassword() {
      const pwd = this.password
      const errors = []
      if (pwd.length < 8 || pwd.length >= 15) errors.push("Must be 8-14 characters")
      if (!/[A-Z]/.test(pwd)) errors.push("Must include at least one uppercase letter")
      if ((pwd.match(/[a-z]/g) || []).length < 2) errors.push("Must include at least two lowercase letters")
      if (!/[0-9]/.test(pwd)) errors.push("Must include at least one number")
      if (!/^[A-Z]/.test(pwd)) errors.push("Must start with an uppercase letter")
      if (!/_/.test(pwd)) errors.push('Must include the "_" character')
      this.passwordError = errors.length ? "The password is not valid — " + errors.join(", ") : ""
    },

    async handleSignup() {
      this.validatePassword()
      if (this.passwordError) return

      try {
        const res = await api.post('/auth/signup', {
          email: this.email,
          password: this.password
        })
        localStorage.setItem('token', res.data.token)
        this.$router.push('/')
      } catch (err) {
        console.error(err)
        alert(err.response?.data?.message || 'Signup failed')
      }
    },

    async handleLogin() {
      try {
        const res = await api.post('/auth/login', {
          email: this.email,
          password: this.password
        })
        localStorage.setItem('token', res.data.token)
        this.$router.push('/')
      } catch (err) {
        console.error(err)
        alert(err.response?.data?.message || 'Login failed')
      }
    }
  }
}
</script>

<style scoped>

.page-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* Container */
.page-container {
  margin-top: 120px;
  border-radius: 20px;
  padding: 40px 60px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ddd;
}

/* Inputs + Button */
.page-container input,
.page-container .btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-bottom: 12px;
  opacity: 0.80;
  display: block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none;
}

.page-container input {
  background-color: #f2f2f2;
}
.page-container input:hover,
.page-container .btn:hover {
  opacity: 1;
}

.btn {
  cursor: pointer;
}

/* Error text */
.error-msg {
  margin-top: 10px;
  color: red;
  font-size: 14px;
}
</style>