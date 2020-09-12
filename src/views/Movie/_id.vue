<template>
  <div class="">
    <Navbar />
    <Sidebar />
    <main
      v-if="!loading"
      class="margin sm:-mt-2 sm:py-2 lg:py-4 lg:pr-4 sm:w-full lg:w-4/5 overflow-x-hidden"
    >
      <div class="w-full sm:px-5 lg:px-8">
        <!-- Titulo, fecha y puntuaciones-->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <span class="font-bold text-2xl mr-4">{{ result.title }}</span>
            <span class="bg-gray-200 py-1 font-semibold rounded px-2">{{
              year
            }}</span>
          </div>
          <div class="flex items-center pr-1">
            <svg fill="#fdcb6e" width="20" height="20" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M9.25014117,13.199457 L4.75098818,13.199457 C4.172254,13.199457 3.81166856,12.5297992 4.10327594,11.9965644 L9.35228776,2.39819323 C9.73795402,1.69296185 10.7498588,1.9847727 10.7498588,2.80122165 L10.7498588,6.80054296 L15.2490118,6.80054296 C15.827746,6.80054296 16.1883314,7.47020082 15.8967241,8.00343564 L10.6477122,17.6018068 C10.262046,18.3070382 9.25014117,18.0152273 9.25014117,17.1987783 L9.25014117,13.199457 Z"
              />
            </svg>
            <span class="font-bold text-xl">{{ result.vote_average }}/10</span>
          </div>
        </div>
        <div class="pt-3">
          <p class="text-lg leading-7">
            {{ result.overview }}
            <span
              @click="details = !details"
              class="cursor-pointer text-blue-400"
              >More details.</span
            >
          </p>
        </div>
        <!-- Detalles -->
        <div v-if="details" class="pt-8">
          <div>
            <h4 class="mb-2 text-xs text-gray-500 uppercase tracking-wide">
              Director
            </h4>
            <span
              class="mt-3 bg-gray-200 text-gray-600 rounded text-sm py-1 px-2"
              >{{ crew.name }}</span
            >
          </div>
          <div>
            <h4 class="mt-8 mb-2 text-xs text-gray-500 uppercase tracking-wide">
              Cast
            </h4>
            <div class="">
              <span
                class="inline-block mr-3 bg-gray-200 text-gray-600 rounded text-sm py-1 px-2 mb-3"
                v-for="actor in cast"
                :key="actor.name"
                >{{ actor.name }}</span
              >
            </div>
          </div>
          <div>
            <h4 class="mt-6 mb-2 text-xs text-gray-500 uppercase tracking-wide">
              Categories
            </h4>
            <div class="">
              <router-link
                class="inline-block mr-3 bg-gray-200 text-gray-600 rounded text-sm py-1 px-2 mb-3"
                v-for="category in result.genres"
                :key="category.name"
                :to="`/category/${category.id}`"
                >{{ category.name }}</router-link
              >
            </div>
          </div>
        </div>
        <div class="mt-6 flex items-center">
          <!-- Estos botones se muestran segun la pelicula este guardada en alguna lista o no -->
          <div>
            <button
              v-if="!isFavorite"
              @click="addToFavorites"
              v-tooltip="'ADD TO FAVORITES'"
              class="bg-gray-200 px-3 py-2 mr-3 rounded"
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10,17 L3.4776,10.9651643 C2.5248,10.0839337 2,8.91025575 2,7.66035488 C2,6.410454 2.5248,5.23677608 3.4776,4.35476762 C5.2536,2.71130742 8.0416,2.56352822 10,3.90909668 C11.9584,2.56352822 14.7464,2.71130742 16.5224,4.35476762 C17.4752,5.23677608 18,6.410454 18,7.66035488 C18,8.91025575 17.4752,10.0839337 16.5224,10.9651643 L10,17 Z M15.1644068,9.49688149 C15.7122431,8.99019577 16,8.34661033 16,7.66035488 C16,6.97401158 15.7121435,6.33009141 15.164022,5.82269446 C14.0968452,4.83515921 12.3463176,4.72357959 11.1325823,5.55750721 L10,6.33567666 L8.86741768,5.55750721 C7.65368244,4.72357959 5.9031548,4.83515921 4.83623877,5.82245311 C4.28785653,6.33009141 4,6.97401158 4,7.66035488 C4,8.34661033 4.28775686,8.99019577 4.83587992,9.49714675 L10,14.275237 L15.1644068,9.49688149 Z"
                />
              </svg>
            </button>
            <button
              v-if="isFavorite"
              @click="removeFromFavorites"
              v-tooltip="'REMOVE FROM FAVORITES'"
              class="bg-red-500 px-3 py-2 mr-3 rounded"
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M10,17 L3.4776,10.9651643 C2.5248,10.0839337 2,8.91025575 2,7.66035488 C2,6.410454 2.5248,5.23677608 3.4776,4.35476762 C5.2536,2.71130742 8.0416,2.56352822 10,3.90909668 C11.9584,2.56352822 14.7464,2.71130742 16.5224,4.35476762 C17.4752,5.23677608 18,6.410454 18,7.66035488 C18,8.91025575 17.4752,10.0839337 16.5224,10.9651643 L10,17 Z M15.1644068,9.49688149 C15.7122431,8.99019577 16,8.34661033 16,7.66035488 C16,6.97401158 15.7121435,6.33009141 15.164022,5.82269446 C14.0968452,4.83515921 12.3463176,4.72357959 11.1325823,5.55750721 L10,6.33567666 L8.86741768,5.55750721 C7.65368244,4.72357959 5.9031548,4.83515921 4.83623877,5.82245311 C4.28785653,6.33009141 4,6.97401158 4,7.66035488 C4,8.34661033 4.28775686,8.99019577 4.83587992,9.49714675 L10,14.275237 L15.1644068,9.49688149 Z"
                />
              </svg>
            </button>
            <button
              v-if="!isWatched"
              @click="addToWatched"
              v-tooltip="'ADD TO WATCHED'"
              class="bg-gray-200 px-3 py-2 mr-3 rounded"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M12,4 C15.5878499,4 18.755364,6.43241398 21.5112563,11.1435135 L21.7171765,11.5011161 L22,12 L21.5112563,12.8564865 C18.755364,17.567586 15.5878499,20 12,20 C8.41215012,20 5.24463601,17.567586 2.48874372,12.8564865 L2.28282345,12.4988839 L2,12 L2.28282345,11.5011161 C5.08652302,6.55555493 8.32245387,4 12,4 Z M12,6 C9.29691839,6 6.72828619,7.91553708 4.30531955,12 C6.72828619,16.0844629 9.29691839,18 12,18 C14.6296758,18 17.1288735,16.1900714 19.4870502,12.3447155 L19.6947584,12.0001314 L19.4867171,11.6553327 C17.1248787,7.8076803 14.6258789,6 12,6 Z M12,9 C13.6568542,9 15,10.3431458 15,12 C15,13.6568542 13.6568542,15 12,15 C10.3431458,15 9,13.6568542 9,12 C9,10.3431458 10.3431458,9 12,9 Z"
                />
              </svg>
            </button>
            <button
              @click="removeFromWatched"
              v-if="isWatched"
              v-tooltip="'REMOVE FROM WATCHED'"
              class="bg-red-500 px-3 py-2 mr-3 rounded"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M12,4 C15.5878499,4 18.755364,6.43241398 21.5112563,11.1435135 L21.7171765,11.5011161 L22,12 L21.5112563,12.8564865 C18.755364,17.567586 15.5878499,20 12,20 C8.41215012,20 5.24463601,17.567586 2.48874372,12.8564865 L2.28282345,12.4988839 L2,12 L2.28282345,11.5011161 C5.08652302,6.55555493 8.32245387,4 12,4 Z M12,6 C9.29691839,6 6.72828619,7.91553708 4.30531955,12 C6.72828619,16.0844629 9.29691839,18 12,18 C14.6296758,18 17.1288735,16.1900714 19.4870502,12.3447155 L19.6947584,12.0001314 L19.4867171,11.6553327 C17.1248787,7.8076803 14.6258789,6 12,6 Z M12,9 C13.6568542,9 15,10.3431458 15,12 C15,13.6568542 13.6568542,15 12,15 C10.3431458,15 9,13.6568542 9,12 C9,10.3431458 10.3431458,9 12,9 Z"
                />
              </svg>
            </button>
            <button
              v-if="!isWatchlist"
              @click="addToWatchlist"
              v-tooltip="'ADD TO WATCHLIST'"
              class="bg-gray-200 px-3 py-2 mr-3 rounded"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M15.2928932,8.29289322 L10,13.5857864 L8.70710678,12.2928932 C8.31658249,11.9023689 7.68341751,11.9023689 7.29289322,12.2928932 C6.90236893,12.6834175 6.90236893,13.3165825 7.29289322,13.7071068 L9.29289322,15.7071068 C9.68341751,16.0976311 10.3165825,16.0976311 10.7071068,15.7071068 L16.7071068,9.70710678 C17.0976311,9.31658249 17.0976311,8.68341751 16.7071068,8.29289322 C16.3165825,7.90236893 15.6834175,7.90236893 15.2928932,8.29289322 Z"
                />
              </svg>
            </button>
            <button
              v-if="isWatchlist"
              @click="removeFromWatchlist"
              v-tooltip="'REMOVE FROM WATCHLIST'"
              class="bg-red-500 px-3 py-2 mr-3 rounded"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M15.2928932,8.29289322 L10,13.5857864 L8.70710678,12.2928932 C8.31658249,11.9023689 7.68341751,11.9023689 7.29289322,12.2928932 C6.90236893,12.6834175 6.90236893,13.3165825 7.29289322,13.7071068 L9.29289322,15.7071068 C9.68341751,16.0976311 10.3165825,16.0976311 10.7071068,15.7071068 L16.7071068,9.70710678 C17.0976311,9.31658249 17.0976311,8.68341751 16.7071068,8.29289322 C16.3165825,7.90236893 15.6834175,7.90236893 15.2928932,8.29289322 Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <!-- Iframe de trailer -->
        <div v-if="this.video != ''" class="mt-8 youtube">
          <iframe
            width="940"
            height="440"
            :src="this.video"
            frameborder="0"
          ></iframe>
        </div>
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
import Spinner from "@/components/Spinner.vue";
import axios from "axios";
import { db } from "@/Firebase.js";

export default {
  name: "MovieDetails",
  components: {
    Navbar,
    Sidebar,
    Spinner,
  },
  title: "What's next?",
  data() {
    return {
      isFavorite: null,
      isWatched: null,
      isWatchlist: null,
      loading: false,
      id: null,
      year: "",
      details: false,
      result: [],
      cast: [],
      crew: [],
      video: [],
      url_details: `https://api.themoviedb.org/3/movie/${this.$route.params.id}`,
      url_videos: `https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos`,
      url_credits: `https://api.themoviedb.org/3/movie/${this.$route.params.id}/credits`,
      url_recommendations: `https://api.themoviedb.org/3/movie/${this.$route.params.id}/recommendations`,
    };
  },
  methods: {
    async getDetails() {
      this.loading = true;
      try {
        const res = await axios.get(this.url_details, {
          params: {
            api_key: process.env.VUE_APP_TMDB_KEY,
            language: "en-US",
          },
        });
        this.result = res.data;
        this.year = res.data.release_date.substring(0, 4);
        this.id = res.data.id;
        this.loading = false;
      } catch (error) {
        this.$toast.error(error.message);
      } finally {
        this.loading = false;
      }
    },

    async getCredits() {
      try {
        const res = await axios.get(this.url_credits, {
          params: {
            api_key: process.env.VUE_APP_TMDB_KEY,
            language: "en-US",
          },
        });
        this.crew = res.data.crew.find((d) => d.job === "Director");
        this.cast = res.data.cast;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getVideos() {
      try {
        const res = await axios.get(this.url_videos, {
          params: {
            api_key: process.env.VUE_APP_TMDB_KEY,
            language: "en-US",
          },
        });
        this.video = `https://www.youtube.com/embed/${res.data.results[0].key}`;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async addToWatchlist() {
      try {
        await db
          .collection("users")
          .doc(this.$store.state.user.uid)
          .collection("watchlist")
          .doc()
          .set({
            id: `${this.$route.params.id}`,
            title: this.result.title,
            poster_path: this.result.poster_path,
            vote_average: this.result.vote_average,
          });
        this.isWatchlist = true;
        this.$toast.success("Added succesfully!");
      } catch (error) {
        this.$toast.error("You need to login");
      }
    },

    async removeFromWatchlist() {
      try {
        const query = await db
          .collection("users")
          .doc(this.$store.state.user.uid)
          .collection("watchlist")
          .where("id", "==", `${this.$route.params.id}`);
        // Para eliminar un documento primero necesito tenerlo referenciado
        // Por eso primero lo obtenemos y luego hacemos loop sobre el snapshot para borrarlo
        query.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });

        this.isWatchlist = false;
        this.$toast.success("Removed succesfully!");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async addToWatched() {
      try {
        await db
          .collection("users")
          .doc(this.$store.state.user.uid)
          .collection("watched")
          .doc()
          .set({
            id: `${this.$route.params.id}`,
            title: this.result.title,
            poster_path: this.result.poster_path,
            vote_average: this.result.vote_average,
          });
        this.isWatched = true;
        this.$toast.success("Added succesfully!");
      } catch (error) {
        this.$toast.error("You need to login");
      }
    },

    async removeFromWatched() {
      try {
        const query = await db
          .collection("users")
          .doc(this.$store.state.user.uid)
          .collection("watched")
          .where("id", "==", `${this.$route.params.id}`);
        // Para eliminar un documento primero necesito tenerlo referenciado
        // Por eso primero lo obtenemos y luego hacemos loop sobre el snapshot para borrarlo
        query.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });

        this.isWatched = false;
        this.$toast.success("Removed succesfully!");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async addToFavorites() {
      console.log("llego");
      try {
        await db
          .collection("users")
          .doc(this.$store.state.user.uid)
          .collection("favorites")
          .doc()
          .set({
            id: `${this.$route.params.id}`,
            title: this.result.title,
            poster_path: this.result.poster_path,
            vote_average: this.result.vote_average,
          });
        this.isFavorite = true;
        this.$toast.success("Added succesfully!");
      } catch (error) {
        this.$toast.error("You need to login");
      }
    },

    async removeFromFavorites() {
      try {
        const query = await db
          .collection("users")
          .doc(this.$store.state.user.uid)
          .collection("favorites")
          .where("id", "==", `${this.$route.params.id}`);
        // Para eliminar un documento primero necesito tenerlo referenciado
        // Por eso primero lo obtenemos y luego hacemos loop sobre el snapshot para borrarlo
        query.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });

        this.isFavorite = false;
        this.$toast.success("Removed succesfully!");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    // Metodo para checkear si la pelicula ya esta en la lista de favoritos
    async checkFavorite() {
      try {
        const doc = await db
          .collection("users")
          .doc(this.$store.state.user.uid)
          .collection("favorites")
          .where("id", "==", `${this.$route.params.id}`)
          .get();
        if (doc.docs.length > 0) {
          this.isFavorite = true;
        } else {
          this.isFavorite = false;
        }
      } catch (error) {
        this.isFavorite = false;
        //this.$toast.error(error.message);
      }
    },
    // Metodo para checkear si la pelicula ya esta en la lista de vistas
    async checkWatched() {
      try {
        const doc = await db
          .collection("users")
          .doc(this.$store.state.user.uid)
          .collection("watched")
          .where("id", "==", `${this.$route.params.id}`)
          .get();
        if (doc.docs.length > 0) {
          this.isWatched = true;
        } else {
          this.isWatched = false;
        }
      } catch (error) {
        this.isWatched = false;
        //this.$toast.error(error.message);
      }
    },
    // Metodo para checkear si la pelicula ya esta en la lista por ver
    async checkWatchlist() {
      try {
        const doc = await db
          .collection("users")
          .doc(this.$store.state.user.uid)
          .collection("watchlist")
          .where("id", "==", `${this.$route.params.id}`)
          .get();
        if (doc.docs.length > 0) {
          this.isWatchlist = true;
        } else {
          this.isWatchlist = false;
        }
      } catch (error) {
        //this.$toast.error(error.message);
        this.isWatchlist = false;
      }
    },
  },
  created() {
    this.getDetails();
    this.getCredits();
    this.getVideos();
    this.checkFavorite();
    this.checkWatched();
    this.checkWatchlist();
  },
};
</script>

<style>
.youtube {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}

.youtube iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>
