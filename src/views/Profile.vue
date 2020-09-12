<template>
  <div class="relative h-screen w-full flex items-center justify-center">
    <router-link
      to="/"
      class="absolute top-0 left-0 bg-white flex items-center rounded border border-black px-2 py-1 mt-8 ml-8"
      ><svg width="17" height="17" viewBox="0 0 24 24" class="pr-1">
        <path
          fill-rule="evenodd"
          d="M10.7902954,4.38710056 L10.7071068,4.29289322 C10.3466228,3.93240926 9.77939176,3.90467972 9.38710056,4.20970461 L9.29289322,4.29289322 L2.29289322,11.2928932 L2.2514958,11.336853 L2.2514958,11.336853 L2.19633458,11.4046934 L2.19633458,11.4046934 L2.12467117,11.5159379 L2.12467117,11.5159379 L2.07122549,11.628664 L2.07122549,11.628664 L2.03584514,11.734007 L2.03584514,11.734007 L2.00690716,11.8819045 L2.00690716,11.8819045 L2,12 L2.00278786,12.0752385 L2.00278786,12.0752385 L2.02024007,12.2007258 L2.02024007,12.2007258 L2.04973809,12.3121425 L2.04973809,12.3121425 L2.09367336,12.4232215 L2.09367336,12.4232215 L2.14599545,12.5207088 L2.14599545,12.5207088 L2.21968877,12.625449 L2.21968877,12.625449 L2.29289322,12.7071068 L9.29289322,19.7071068 C9.68341751,20.0976311 10.3165825,20.0976311 10.7071068,19.7071068 C11.0675907,19.3466228 11.0953203,18.7793918 10.7902954,18.3871006 L10.7071068,18.2928932 L5.416,13 L21,13 C21.5522847,13 22,12.5522847 22,12 C22,11.4477153 21.5522847,11 21,11 L5.414,11 L10.7071068,5.70710678 C11.0675907,5.34662282 11.0953203,4.77939176 10.7902954,4.38710056 L10.7071068,4.29289322 L10.7902954,4.38710056 Z"
        />
      </svg>
      Go back</router-link
    >
    <div class="sm:w-11/12 lg:w-1/3 shadow-md p-6">
      <h1 class="text-4xl font-bold mb-2">Hello, {{ nombre }}!</h1>
      <button
        class="bg-red-400 py-1 px-3 rounded text-white mb-2"
        @click="logout"
      >
        Logout
      </button>
      <h1 class="text-2xl font-semibold mt-2 mb-2">Change password</h1>
      <form @submit.prevent="updatePassword" class="flex flex-col">
        <label for="newPassword" class="pb-2">New password</label>
        <input
          class="border border-gray-300 py-2 px-2 rounded focus:outline-none mb-2"
          type="password"
          v-model="password"
        />
        <label for="confirmPassword" class="pb-2">Confirm password</label>
        <input
          class="border border-gray-300 py-2 px-2 rounded focus:outline-none mb-2"
          type="password"
          v-model="confirmPassword"
        />
        <div class="flex justify-between items-center mt-4">
          <button
            class="border bg-gray-200 hover:bg-gray-300 duration-200 py-2 px-5 rounded focus:outline-none"
            type="submit"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  title: "Account - What's next?",
  data() {
    return {
      nombre: this.$store.state.user.displayName,
      password: "",
      confirmPassword: "",
    };
  },
  components: {},
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.push("/");
      } catch (error) {
        console.log(error.message);
      }
    },

    async updatePassword() {
      try {
        if (this.password == this.confirmPassword) {
          await this.$store.dispatch("updatePassword", {
            newPassword: this.password,
          });
          this.password = "";
          this.confirmPassword = "";
          this.$toast.success("Password updated succesfully!");
        } else {
          this.$toast.error("Both passwords must match!");
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<style scoped></style>
