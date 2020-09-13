<template>
  <div class="">
    <Navbar />
    <Sidebar />
    <main
      class="margin sm:px-3 sm:pb-4 lg:pt-1 lg:pb-5 lg:pr-2 sm:w-full lg:w-4/5 overflow-x-hidden"
    >
      <h1 class="sm:pl-2 lg:pl-1 text-2xl font-semibold sm:mb-4 lg:mb-6">
        Resultados de: {{ this.$route.params.name }}
      </h1>
      <div class="grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-0 lg:gap-1">
        <router-link
          v-for="movie in results"
          :key="movie.id"
          :to="`/movie/` + movie.id"
          class="flex justify-center px-2"
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
  name: "Search",
  title: `Search - What's next?`,
  components: {
    Navbar,
    Sidebar,
    MovieCard,
  },
  data() {
    return {
      url: "https://api.themoviedb.org/3/search/movie",
      results: [],
    };
  },
  methods: {
    async getSearch() {
      try {
        const res = await axios.get(this.url, {
          params: {
            api_key: process.env.VUE_APP_TMDB_KEY,
            language: "en-US",
            query: this.$route.params.name,
            page: 1,
          },
        });
        this.results = res.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  created() {
    this.getSearch();
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
