<template>
  <div
    class="sm:hidden md:hidden lg:block scroll width fixed top-0 left-0 pl-10 py-8 pb-10 pr-8 "
  >
    <div class="flex items-center py-3 mb-10">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M9.25014117,13.199457 L4.75098818,13.199457 C4.172254,13.199457 3.81166856,12.5297992 4.10327594,11.9965644 L9.35228776,2.39819323 C9.73795402,1.69296185 10.7498588,1.9847727 10.7498588,2.80122165 L10.7498588,6.80054296 L15.2490118,6.80054296 C15.827746,6.80054296 16.1883314,7.47020082 15.8967241,8.00343564 L10.6477122,17.6018068 C10.262046,18.3070382 9.25014117,18.0152273 9.25014117,17.1987783 L9.25014117,13.199457 Z"
        />
      </svg>
      <h1 class="tracking-wide uppercase text-xl font-black">What's next?</h1>
    </div>
    <div>
      <div
        @click="dropdown = !dropdown"
        class="border-b border-gray-400 pb-4 mb-4"
      >
        <div class="cursor-pointer flex items-center justify-between ">
          <h3 class="text-lg font-semibold">
            Discover
          </h3>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M12.2928932,5.29289322 C12.6834175,4.90236893 13.3165825,4.90236893 13.7071068,5.29289322 C14.0976311,5.68341751 14.0976311,6.31658249 13.7071068,6.70710678 L8.70710678,11.7071068 C8.31658249,12.0976311 7.68341751,12.0976311 7.29289322,11.7071068 L2.29289322,6.70710678 C1.90236893,6.31658249 1.90236893,5.68341751 2.29289322,5.29289322 C2.68341751,4.90236893 3.31658249,4.90236893 3.70710678,5.29289322 L8,9.58578644 L12.2928932,5.29289322 Z"
            />
          </svg>
        </div>
        <div v-if="dropdown" class="pt-3 flex flex-col">
          <router-link class="my-1" to="/">Trending</router-link>
          <router-link class="my-1" to="/top">Top Rated</router-link>
          <router-link class="my-1" to="/upcoming">Upcoming</router-link>
        </div>
      </div>
      <div
        @click="dropdownCat = !dropdownCat"
        class="border-b border-gray-400 pb-4"
      >
        <div class="cursor-pointer flex items-center justify-between ">
          <h3 class="text-lg font-semibold">
            Categories
          </h3>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M12.2928932,5.29289322 C12.6834175,4.90236893 13.3165825,4.90236893 13.7071068,5.29289322 C14.0976311,5.68341751 14.0976311,6.31658249 13.7071068,6.70710678 L8.70710678,11.7071068 C8.31658249,12.0976311 7.68341751,12.0976311 7.29289322,11.7071068 L2.29289322,6.70710678 C1.90236893,6.31658249 1.90236893,5.68341751 2.29289322,5.29289322 C2.68341751,4.90236893 3.31658249,4.90236893 3.70710678,5.29289322 L8,9.58578644 L12.2928932,5.29289322 Z"
            />
          </svg>
        </div>
        <div v-if="dropdownCat" class="pt-3 flex flex-col">
          <router-link
            class="my-1"
            v-for="category in categories"
            :key="category.id"
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
  name: "Sidebar",
  data() {
    return {
      dropdown: true,
      dropdownCat: true,
      categories: movieCategories,
    };
  },
};
</script>

<style scoped>
.width {
  width: 15rem;
}

.scroll::-webkit-scrollbar {
  display: none;
}

.scroll {
  -ms-overflow-style: none; /* IE and Edge */
  /*scrollbar-width: none; /* Firefox */
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  overflow-y: scroll;
}

.router-link-exact-active {
  border-left: 3px solid #74b9ff;
  padding-left: 5px;
}
</style>
