<script setup>
import { ref, onMounted } from 'vue';
  import api from './plugins/axios';

  const moviesGenres = ref([]);
  const TVGenres = ref([]);

  onMounted(async () => {
    let response = await api.get('genre/movie/list?language=pt-BR');
    moviesGenres.value = response.data.genres;
    response = await api.get('genre/tv/list?language=pt-BR');
    TVGenres.value = response.data.genres;
  });
</script>

<template>
   <header>
    <nav>
      <router-link to="/">HOME</router-link>
      <router-link to="/filmes" class="hover">FILMES</router-link>
      <router-link to="/tv">PROGRAMAS DE TV</router-link>
      <router-link to="/brb">BARBIE</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>

header {
  height: 5rem;
  display: flex;
  background-color: black;
  color: #ffffff94;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  padding-left: 2rem;
}

nav {
  margin-left: 50vw;
  column-gap: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #fff;
}

main{
  background-color: #12161af6;
}

</style>



