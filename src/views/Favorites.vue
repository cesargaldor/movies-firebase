<template>
  <div>
    <Navbar />
    <Sidebar />
    <main
      class="margin sm:px-3 sm:pt-2 sm:pb-4 lg:py-4 lg:pr-2 sm:w-full lg:w-4/5 overflow-x-hidden"
    >
      <div
        v-if="results.length > 0"
        class="grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-0 lg:gap-1"
      >
        <router-link
          v-for="movie in results"
          :key="movie.title"
          :to="`/movie/` + movie.id"
          class="flex justify-center"
        >
          <MovieCard
            :title="movie.title"
            :rate="movie.vote_average"
            :year="movie.release_date"
            :image="movie.poster_path"
          />
        </router-link>
      </div>
      <div v-else>
        <h1 class="text-2xl text-gray-600 text-center">
          Add something to your list of favorites movies.
        </h1>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import MovieCard from "@/components/MovieCard.vue";

import { db } from "@/Firebase.js";
export default {
  name: "Favorites",
  title: "Favorites - What's next?",
  components: {
    Navbar,
    Sidebar,
    MovieCard,
  },
  data() {
    return {
      results: [],
      currentUser: this.$store.state.user.uid,
    };
  },
  methods: {
    async getFavorites() {
      try {
        const snapshot = await db
          .collection("users")
          .doc(this.currentUser)
          .collection("favorites")
          .get();
        this.results = snapshot.docs.map((doc) => doc.data());
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
  created() {
    this.getFavorites();
  },
};
</script>

<style scoped></style>
