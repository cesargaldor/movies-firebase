<template>
  <div class="flex justify-center items-center h-screen">
    <form
      @submit.prevent="login"
      class="flex flex-col sm:w-11/12 lg:w-1/3 shadow-md p-6"
      v-if="loginForm"
    >
      <h1 class="font-bold text-3xl pb-6">Sign in with your account</h1>
      <label for="email" class="pb-2">Email</label>
      <input
        class="border border-gray-300 py-2 px-2 rounded focus:outline-none mb-2"
        type="email"
        v-model="email"
      />
      <label for="password" class="pb-2">Password</label>
      <input
        class="border border-gray-300 py-2 px-2 rounded focus:outline-none mb-2"
        type="password"
        v-model="password"
      />
      <div class="flex justify-between items-center mt-4">
        <button
          class="border bg-gray-200 hover:bg-gray-300 duration-200 py-2 px-5 rounded focus:outline-none"
          type="submit"
        >
          Login
        </button>
        <router-link to="reset" class="text-sm text-blue-500"
          >Forgot password?</router-link
        >
      </div>
      <p class="pt-6 text-gray-500 text-center">
        Don't have an account?
        <span
          class="text-blue-500 cursor-pointer"
          @click="loginForm = !loginForm"
          >Register</span
        >
      </p>
    </form>
    <form
      @submit.prevent="register"
      class="flex flex-col sm:w-11/12 lg:w-1/3 shadow-md p-6"
      v-else
    >
      <h1 class="font-bold text-3xl pb-6">Register your account</h1>
      <label for="name" class="pb-2">Name</label>
      <input
        class="border border-gray-300 py-2 px-2 rounded focus:outline-none mb-2"
        type="text"
        v-model="name"
      />
      <label for="email" class="pb-2">Email</label>
      <input
        class="border border-gray-300 py-2 px-2 rounded focus:outline-none mb-2"
        type="text"
        v-model="email"
      />
      <label for="password" class="pb-2">Password</label>
      <input
        class="border border-gray-300 py-2 px-2 rounded focus:outline-none mb-2"
        type="password"
        v-model="password"
      />
      <div class="w-full mt-4">
        <button
          class="border bg-gray-200 hover:bg-gray-300 duration-200 py-2 px-5 rounded w-full focus:outline-none"
          type="submit"
        >
          Register
        </button>
      </div>
      <p class="pt-6 text-gray-500 text-center">
        Already have an account?
        <span
          class="text-blue-500 cursor-pointer"
          @click="loginForm = !loginForm"
          >Login</span
        >
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Auth",
  title: "Login - What's Next?",
  data() {
    return {
      loginForm: true,
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
        this.$toast.success("Log in sucessfully!");
        this.$router.push("/");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async register() {
      try {
        await this.$store.dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$toast.success("Account created sucessfully!");
        this.loginForm = true;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<style scoped></style>
