<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useRouter } from 'vue-router';

const popularMovies = ref([]);
const popularTvShows = ref([]);

const fetchPopularMovies = async () => {
  const response = await api.get('movie/popular', {
    params: { language: 'pt-BR' },
  });
  popularMovies.value = response.data.results.slice(0, 10); // Pegando os 10 primeiros
};

const fetchPopularTvShows = async () => {
  const response = await api.get('tv/popular', {
    params: { language: 'pt-BR' },
  });
  popularTvShows.value = response.data.results.slice(0, 10); // Pegando os 10 primeiros
};

const router = useRouter();
const goToDetails = (type, id) => {
  router.push({ name: 'Details', params: { type, id } });
};

onMounted(() => {
  fetchPopularMovies();
  fetchPopularTvShows();
});
</script>

<template>
  <div class="home-container">
    <h1>HOME</h1>

    <!-- Carrossel de Principais Filmes -->
    <section>
      <div class="principal">
        <h2>PRINCIPAIS FILMES</h2>
        <hr />
    </div>
      <div class="carousel">
        <button class="carousel-button left" @click="scrollCarousel('movies', 'left')">‹</button>
        <div class="carousel-track no-scrollbar" id="movies-carousel">
          <div
            v-for="movie in popularMovies"
            :key="movie.id"
            class="carousel-item"
            @click="goToDetails('movie', movie.id)"
          >
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
            <p>{{ movie.title }}</p>
          </div>
        </div>
        <button class="carousel-button right" @click="scrollCarousel('movies', 'right')">›</button>
      </div>
    </section>

    <!-- Carrossel de Principais Programas de TV -->
    <section>
      <div class="principal">
        <h2>PRINCIPAIS PROGRAMAS DE TV</h2>
        <hr />
      </div>
      <div class="carousel">
        <button class="carousel-button left" @click="scrollCarousel('tv', 'left')">‹</button>
        <div class="carousel-track no-scrollbar" id="tv-carousel">
          <div
            v-for="tv in popularTvShows"
            :key="tv.id"
            class="carousel-item"
            @click="goToDetails('tv', tv.id)"
          >
            <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.name" />
            <p>{{ tv.name }}</p>
          </div>
        </div>
        <button class="carousel-button right" @click="scrollCarousel('tv', 'right')">›</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  background-color: #1c1c1c;
  color: white;
  padding: 1rem;
}

h1 {
  text-align: center;
  margin: 2rem 0;
}

section {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

hr {
  width: 20%;
  opacity: 0.4;

}

.carousel {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 4%;

}

.carousel-track {
  display: flex;
  gap: 1rem;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.carousel-item {
  flex: 0 0 15rem;
  text-align: center;
  cursor: pointer;
}

.carousel-item img {
  width: 100%;

}

.carousel-item p {
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 10;
}

.carousel-button.left {
  left: 0;
}

.carousel-button.right {
  right: 0;
}

.principal{
  margin-left: 4%;
  margin-bottom: 2%;
}
</style>

<script>
function scrollCarousel(id, direction) {
  const carousel = document.getElementById(`${id}-carousel`);
  const scrollAmount = carousel.offsetWidth;
  carousel.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth',
  });
}
</script>
