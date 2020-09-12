<template>
  <div id="app">
    <!-- Este key hace que el router view tenga en cuenta el path completo del router
    para recargar la vista cuando pinchamos en diferentes categorias-->
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Barlow", sans-serif;
}

#app {
  min-height: 100vh;
}
</style>
