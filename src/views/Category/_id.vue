<template>
  <div class="">
    <Navbar />
    <Sidebar />
    <main
      v-if="!loading"
      class="margin sm:px-3 sm:pt-2 sm:pb-4 lg:py-4 lg:pr-2 sm:w-full lg:w-4/5 overflow-x-hidden"
    >
      <div class="grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-0 lg:gap-1">
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
      <div class="w-full flex justify-center mt-6">
        <button
          class="rounded bg-blue-500 text-white py-1 px-3 hover:bg-blue-700 focus:outline-none"
        >
          Load more
        </button>
      </div>
    </main>
    <div v-else class="margin h-screen flex items-center justify-center">
      <Spinner />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import MovieCard from "@/components/MovieCard.vue";
import Spinner from "@/components/Spinner.vue";
import axios from "axios";

export default {
  name: "Category",
  title() {
    return `What's next?`;
  },
  components: {
    Navbar,
    Sidebar,
    MovieCard,
    Spinner,
  },
  data() {
    return {
      loading: false,
      page: 1,
      url: "https://api.themoviedb.org/3/discover/movie",
      results: [],
    };
  },
  methods: {
    async orderPopularity() {
      this.loading = true;
      try {
        const res = await axios.get(this.url, {
          params: {
            api_key: process.env.VUE_APP_TMDB_KEY,
            language: "en-US",
            page: this.page,
            sort_by: "popularity.desc",
            with_genres: this.$route.params.id,
          },
        });
        this.results = res.data.results;
        this.loading = false;
      } catch (error) {
        this.$toast.error(error.message);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.orderPopularity();
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
