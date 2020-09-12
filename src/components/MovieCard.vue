<template>
  <div>
    <!--card-->
    <div
      class="floating bg-cover relative ancho sm:h-64 lg:h-64 rounded-lg shadow mb-3 text-white"
      :style="style"
    >
      <div class="flex justify-between p-3 text-sm">
        <div>
          <div class="flex items-center">
            <svg fill="#fdcb6e" width="20" height="20" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M9.25014117,13.199457 L4.75098818,13.199457 C4.172254,13.199457 3.81166856,12.5297992 4.10327594,11.9965644 L9.35228776,2.39819323 C9.73795402,1.69296185 10.7498588,1.9847727 10.7498588,2.80122165 L10.7498588,6.80054296 L15.2490118,6.80054296 C15.827746,6.80054296 16.1883314,7.47020082 15.8967241,8.00343564 L10.6477122,17.6018068 C10.262046,18.3070382 9.25014117,18.0152273 9.25014117,17.1987783 L9.25014117,13.199457 Z"
              />
            </svg>
            <span class="text-base">{{ rate }}</span>
          </div>
        </div>
        <div>{{ newYear }}</div>
      </div>
      <div class="w-full text-center text-base absolute bottom-0 pb-2 px-2">
        <span class="font-bold">{{ title }}</span>
      </div>
    </div>
    <!-- end of card -->
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    rate: {
      type: Number,
      default: "",
    },
    year: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      url: "https://image.tmdb.org/t/p/w342",
    };
  },
  computed: {
    style() {
      return "background-image: url(" + this.url + this.image + ")";
    },
    newYear() {
      return this.year.substring(0, 4);
    },
  },
};
</script>

<style scoped>
.floating {
  transition: ease-in 0.1s;
}

.floating:hover {
  transform: translateY(-4px);
}

.ancho {
  width: 11.5rem;
}

@media (max-width: 500px) {
  .ancho {
    width: 11rem;
  }
}
</style>
