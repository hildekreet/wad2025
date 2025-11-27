<template>
    <div class="page-wrapper">
        <div class="page-container">
        <h2>Sign up</h2>

        <form id="signupForm" @submit.prevent="handleSignup">
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="password" v-model="password" placeholder="Password" @input="validatePassword" required />

        <button class="btn" type="submit">Create Account</button>

        <p v-if="passwordError" class="error-msg">
            {{ passwordError }}
        </p>
        </form>
    </div>
    </div>
    
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      passwordError: ""
    };
  },
  methods: {
    validatePassword() {
        const pwd = this.password;
        const errors = [];
        if(pwd.length < 8 || pwd.length >= 15)
            errors.push("Must be 8-14 characters");
        if (!/[A-Z]/.test(pwd))
            errors.push("Must include at least one uppercase letter");
        if ((pwd.match(/[a-z]/g) || []).length < 2)
            errors.push("Must include at least two lowercase letters");
        if (!/[0-9]/.test(pwd))
            errors.push("Must include at least one number");
        if(!/^[A-Z]/.test(pwd))
            errors.push("Must start with an uppercase letter")
        if (!/_/.test(pwd))
            errors.push('Must include the "_" character');

        this.passwordError = errors.length
        ? "The password is not valid — " + errors.join(", ")
        : "";
    },

    handleSignup() {
      this.validatePassword();
      if (this.passwordError) return;

      console.log("Account created:", {
        username: this.username
      });
    }
  }
};
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

.error-msg {
  margin-top: 10px;
  color: red;
  font-size: 14px;
}
</style>