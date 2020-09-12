<template>
  <div class="relative">
    <nav
      class="margin sm:w-full lg:w-4/5 py-8 pr-4 flex items-center justify-between"
    >
      <!-- Div con el search input -->
      <div class="sm:w-5/6 lg:w-2/3 sm:pl-5 sm:pr-0 lg:pr-4">
        <input
          class="bg-gray-200 w-full sm:py-3 sm:px-2 lg:py-4 lg:px-2 rounded-md focus:outline-none"
          type="text"
          placeholder="Search something..."
          v-model="search"
          @keyup.enter="submit"
        />
      </div>
      <!-- Div con los links a las listas -->
      <div class="sm:hidden lg:flex items-center w-1/3 justify-between text-lg">
        <router-link to="/watchlist">Watchlist</router-link>
        <router-link to="/watched">Watched</router-link>
        <router-link to="/favorites">Favorites</router-link>
        <router-link v-if="user" to="/profile">Account</router-link>
        <router-link v-else to="/auth">
          <!-- <img src="" alt="" class="w-12 rounded-full" /> -->
          Login
        </router-link>
      </div>
      <!-- Icono burger para móvil -->
      <div @click="mobile = true" class="sm:block lg:hidden xl:hidden pr-2">
        <svg width="36" height="36" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M17,14 C17.5522847,14 18,14.4477153 18,15 C18,15.5522847 17.5522847,16 17,16 L3,16 C2.44771525,16 2,15.5522847 2,15 C2,14.4477153 2.44771525,14 3,14 L17,14 Z M17,9 C17.5522847,9 18,9.44771525 18,10 C18,10.5522847 17.5522847,11 17,11 L3,11 C2.44771525,11 2,10.5522847 2,10 C2,9.44771525 2.44771525,9 3,9 L17,9 Z M17,4 C17.5522847,4 18,4.44771525 18,5 C18,5.55228475 17.5522847,6 17,6 L3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 L17,4 Z"
          />
        </svg>
      </div>
      <!-- Menu para el movil -->
    </nav>
    <div
      @click="mobile = false"
      v-if="mobile"
      class="lg:hidden fixed top-0 left-0 bg-gray-800 z-40 h-full w-full opacity-50 transition duration-200"
    ></div>
    <div
      v-if="mobile"
      class="overflow-y-scroll pl-6 pt-1 pb-4 lg:hidden fixed top-0 left-0 w-3/4 bg-white h-full z-50 transition duration-500"
    >
      <!-- Div de los links -->
      <div class="flex flex-col border-b py-4 border-gray-300 text-lg">
        <router-link class="flex items-center pb-1" v-if="!user" to="/auth"
          >Login
          <svg width="18" height="18" viewBox="0 0 20 20" class="pt-1">
            <path
              fill-rule="evenodd"
              d="M7.707125,16.707375 L13.707125,10.707375 C14.098125,10.316375 14.098125,9.684375 13.707125,9.293375 L7.707125,3.293375 C7.316125,2.902375 6.684125,2.902375 6.293125,3.293375 C5.902125,3.684375 5.902125,4.316375 6.293125,4.707375 L11.586125,10.000375 L6.293125,15.293375 C5.902125,15.684375 5.902125,16.316375 6.293125,16.707375 C6.488125,16.902375 6.744125,17.000375 7.000125,17.000375 C7.256125,17.000375 7.512125,16.902375 7.707125,16.707375 Z"
            /></svg
        ></router-link>
        <router-link class="flex items-center pb-1" v-if="user" to="/profile"
          >Account
          <svg width="18" height="18" viewBox="0 0 20 20" class="pt-1">
            <path
              fill-rule="evenodd"
              d="M7.707125,16.707375 L13.707125,10.707375 C14.098125,10.316375 14.098125,9.684375 13.707125,9.293375 L7.707125,3.293375 C7.316125,2.902375 6.684125,2.902375 6.293125,3.293375 C5.902125,3.684375 5.902125,4.316375 6.293125,4.707375 L11.586125,10.000375 L6.293125,15.293375 C5.902125,15.684375 5.902125,16.316375 6.293125,16.707375 C6.488125,16.902375 6.744125,17.000375 7.000125,17.000375 C7.256125,17.000375 7.512125,16.902375 7.707125,16.707375 Z"
            /></svg
        ></router-link>
        <router-link to="/watchlist" class="flex items-center pb-1"
          >Watchlist
          <svg width="18" height="18" viewBox="0 0 20 20" class="pt-1">
            <path
              fill-rule="evenodd"
              d="M7.707125,16.707375 L13.707125,10.707375 C14.098125,10.316375 14.098125,9.684375 13.707125,9.293375 L7.707125,3.293375 C7.316125,2.902375 6.684125,2.902375 6.293125,3.293375 C5.902125,3.684375 5.902125,4.316375 6.293125,4.707375 L11.586125,10.000375 L6.293125,15.293375 C5.902125,15.684375 5.902125,16.316375 6.293125,16.707375 C6.488125,16.902375 6.744125,17.000375 7.000125,17.000375 C7.256125,17.000375 7.512125,16.902375 7.707125,16.707375 Z"
            /></svg
        ></router-link>
        <router-link to="/watched" class="flex items-center pb-1"
          >Watched
          <svg width="18" height="18" viewBox="0 0 20 20" class="pt-1">
            <path
              fill-rule="evenodd"
              d="M7.707125,16.707375 L13.707125,10.707375 C14.098125,10.316375 14.098125,9.684375 13.707125,9.293375 L7.707125,3.293375 C7.316125,2.902375 6.684125,2.902375 6.293125,3.293375 C5.902125,3.684375 5.902125,4.316375 6.293125,4.707375 L11.586125,10.000375 L6.293125,15.293375 C5.902125,15.684375 5.902125,16.316375 6.293125,16.707375 C6.488125,16.902375 6.744125,17.000375 7.000125,17.000375 C7.256125,17.000375 7.512125,16.902375 7.707125,16.707375 Z"
            /></svg
        ></router-link>
        <router-link to="/favorites" class="flex items-center pb-1"
          >Favorites
          <svg width="18" height="18" viewBox="0 0 20 20" class="pt-1">
            <path
              fill-rule="evenodd"
              d="M7.707125,16.707375 L13.707125,10.707375 C14.098125,10.316375 14.098125,9.684375 13.707125,9.293375 L7.707125,3.293375 C7.316125,2.902375 6.684125,2.902375 6.293125,3.293375 C5.902125,3.684375 5.902125,4.316375 6.293125,4.707375 L11.586125,10.000375 L6.293125,15.293375 C5.902125,15.684375 5.902125,16.316375 6.293125,16.707375 C6.488125,16.902375 6.744125,17.000375 7.000125,17.000375 C7.256125,17.000375 7.512125,16.902375 7.707125,16.707375 Z"
            /></svg
        ></router-link>
      </div>

      <div class="flex flex-col py-4 border-b border-gray-300">
        <h3 class="text-xl font-semibold pb-2">Discover</h3>
        <div class="flex flex-col text-lg">
          <router-link class="pb-1" to="/">Trending</router-link>
          <router-link class="pb-1" to="/top">Top Rated</router-link>
          <router-link class="pb-1" to="/upcoming">Upcoming</router-link>
        </div>
      </div>

      <div class="flex flex-col py-4 border-b border-gray-300">
        <h3 class="text-xl font-semibold pb-2">Categories</h3>
        <div class="flex flex-col text-lg">
          <router-link
            v-for="category in categories"
            :key="category.id"
            class="pb-1"
            :to="`/category/${category.id}`"
            >{{ category.name }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import movieCategories from "../api/movieCategories";

export default {
  name: "Navbar",
  data() {
    return {
      search: "",
      mobile: false,
      categories: movieCategories,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    submit() {
      this.$emit("inputData", this.busqueda);
      this.$router.push(`/search/` + this.search);
      this.search = "";
    },
  },
};
</script>

<style>
.margin {
  margin-left: 15rem;
}

@media (max-width: 768px) {
  .margin {
    margin-left: 0;
  }
}
</style>
