<template>
  <div class="">
    <Navbar />
    <Sidebar />
    <main
      class="margin sm:pt-2 sm:pb-4 lg:py-4 sm:pl-5 lg:pr-1 lg:pl-6 sm:w-full lg:w-4/5 overflow-x-hidden"
    >
      <div class="grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-0 lg:gap-1">
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
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import MovieCard from "@/components/MovieCard.vue";
import axios from "axios";

export default {
  name: "Trending",
  components: {
    Navbar,
    Sidebar,
    MovieCard,
  },
  title() {
    return `Trending - What's next?`;
  },
  data() {
    return {
      page: 1,
      url: "https://api.themoviedb.org/3/trending/movie/week",
      results: [],
    };
  },
  methods: {
    async getTrending() {
      try {
        const res = await axios.get(this.url, {
          params: {
            api_key: process.env.VUE_APP_TMDB_KEY,
            language: "en-US",
            page: this.page,
          },
        });
        this.results = res.data.results;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
  created() {
    this.getTrending();
  },
};
</script>

<style scoped>
.margin {
  margin-left: 15rem;
}

@media (max-width: 768px) {
  .margin {
    margin-left: 0;
  }
}
</style>
