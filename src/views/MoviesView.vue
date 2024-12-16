<script setup>
  import { ref, onMounted } from 'vue';
  import api from '@/plugins/axios';
  import { useRouter } from 'vue-router';

  const genres = ref([]);

  onMounted(async () => {
    const response = await api.get('genre/movie/list?language=pt-BR');
    genres.value = response.data.genres;
  });

  const movies = ref([]);

  const listMovies = async (genreId) => {
      const response = await api.get('discover/movie', {
          params: {
              with_genres: genreId,
              language: 'pt-BR'
          }
      });
      movies.value = response.data.results
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

const getGenresByIds = (genreIds) => {
  return genreIds
    .map((id) => {
      const genre = genres.value.find((g) => g.id === id);
      return genre ? genre.name : '';
    }).join(', ');
};

const selectedGenre = ref(null); // Gênero selecionado

onMounted(async () => {
  const genresResponse = await api.get('genre/movie/list?language=pt-BR');
  genres.value = genresResponse.data.genres;

  // Configurar o gênero padrão (Thriller)
  const thrillerGenre = genres.value.find((genre) => genre.name === 'Thriller');
  selectedGenre.value = thrillerGenre ? thrillerGenre.id : genres.value[0].id;

  // Listar os filmes do gênero padrão
  listMovies(selectedGenre.value);
});

const handleGenreChange = () => {
  listMovies(selectedGenre.value);
};
</script>

<template>
  <h1>Filmes</h1>
  
  <div>
  <!-- Select para gêneros -->
  <select v-model="selectedGenre" @change="handleGenreChange">
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>
  </div>

  <div class="movie-list">
  <div v-for="movie in movies" :key="movie.id" class="movie-card" @click="goToMovieDetails(movie.id)">

    <img
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      :alt="movie.title"
    />
    <div class="movie-details">
      <p class="movie-title">{{ movie.title }}</p>
      <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
      <p class="movie-genres">{{ getGenresByIds(movie.genre_ids) }}</p>

    </div>

  </div>
</div>
</template>

<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
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


