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
    <div>
      <img src="/src/assets/Letter.png" alt="">
    </div>
    <nav>
      <router-link class="nav" to="/">HOME</router-link>
      <router-link class="nav" to="/filmes">FILMES</router-link>
      <router-link class="nav" to="/tv">PROGRAMAS DE TV</router-link>
      <router-link class="nav" to="/brb">BARBIE</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>

  <footer>
    <div class="img-footer">
      <img src="/src/assets/Footer.png" alt="">
    </div>
    <div class="footer">
      <h1 class="footer">© 2024 Lettermovie. Todos os direitos reservados</h1>
    </div>
  </footer>
</template>

<style scoped>

*{
    background-color: #232629de;
}

header {
  background-color: black;
  height: 5rem;
  display: flex;
  color: #ffffff94;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  padding-left: 2rem;
}

nav {
  background-color: black;
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

.nav{
  background-color: black;
}

main{
  background-color: #12161af6;
}

img{
  width: 9.3vw;
}

footer{
  background-color: #2C3440;
  display: flex;
  flex-direction: row;
}

.footer{
  background-color: #2C3440;
  color: #fff;
  font-size: 1.5rem;
}

</style>



