<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useRouter } from 'vue-router';

const barbieMovies = ref([]);

// Função para listar os filmes da Barbie
const listBarbieMovies = async () => {
  const response = await api.get('search/movie', {
    params: {
      query: 'Barbie',
      language: 'pt-BR'
    }
  });
  barbieMovies.value = response.data.results;
};

// Redirecionando para a página de detalhes
const router = useRouter();
const goToMovieDetails = (movieId) => {
  router.push({ name: 'Details', params: { id: movieId } });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR'); // Formato: dd/mm/ano
};

onMounted(() => {
  listBarbieMovies();
});
</script>

<template>
  <h1>Filmes da Barbie</h1>

  <!-- Lista de filmes da Barbie -->
  <div class="movie-list">
    <div v-for="movie in barbieMovies" :key="movie.id" class="movie-card" @click="goToMovieDetails(movie.id)">
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
      />
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-style: bold;
  text-align: center;
  margin-bottom: 1.5%;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-left: 3%;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  overflow: hidden;
  border: 0.5px solid rgba(255, 255, 255, 0.11);
}

.movie-card img {
  width: 100%;
  height: 20rem;
}

.movie-details {
  padding: 0 0.5rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}
</style>

