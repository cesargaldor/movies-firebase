<template>
  <div>
    <Navbar />
    <Sidebar />
    <main
      class="margin py-4 sm:px-2 lg:pr-6 sm:w-full lg:w-4/5 overflow-x-hidden"
    >
      <div
        v-if="results.length > 0"
        class="grid sm:grid-cols-2 lg:grid-cols-5 gap-2"
      >
        <router-link
          v-for="movie in results"
          :key="movie.title"
          :to="`/movie/` + movie.id"
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
          What else do you want to watch? Add it to your watchlist.
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
  name: "Watchlist",
  title: "Watchlist - What's next?",
  data() {
    return {
      currentUser: this.$store.state.user.uid,
      results: [],
    };
  },
  components: {
    Navbar,
    Sidebar,
    MovieCard,
  },
  methods: {
    async getWatchlist() {
      try {
        const snapshot = await db
          .collection("users")
          .doc(this.currentUser)
          .collection("watchlist")
          .get();
        this.results = snapshot.docs.map((doc) => doc.data());
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
  created() {
    this.getWatchlist();
  },
};
</script>

<style scoped></style>
