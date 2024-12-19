<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useRouter } from 'vue-router';

const genres = ref([]);

onMounted(async () => {
  const response = await api.get('genre/tv/list?language=pt-BR');
  genres.value = response.data.genres;
});

const tvShows = ref([]);

const listTvShows = async (genreId) => {
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  tvShows.value = response.data.results;
};

// Redirecionando para a página de detalhes
const router = useRouter();
const goToTvShowDetails = (tvShowId) => {
  router.push({ name: 'Details', params: { id: tvShowId } });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

const getGenresByIds = (genreIds) => {
  return genreIds
    .map((id) => {
      const genre = genres.value.find((g) => g.id === id);
      return genre ? genre.name : '';
    }).join(', ');
};

const selectedGenre = ref(null);

onMounted(async () => {
  const genresResponse = await api.get('genre/tv/list?language=pt-BR');
  genres.value = genresResponse.data.genres;

  const dramaGenre = genres.value.find((genre) => genre.name === 'Drama');
  selectedGenre.value = dramaGenre ? dramaGenre.id : genres.value[0].id;

  listTvShows(selectedGenre.value);
});

const handleGenreChange = () => {
  listTvShows(selectedGenre.value);
};
</script>

<template>
  <h1>Programas de TV</h1>

  <div class="select">
    <!-- Select para gêneros -->
    <p><strong>Gênero</strong></p>
    <select v-model="selectedGenre" @change="handleGenreChange">
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>
  </div>

  <!-- Lista dos programas de tv -->
  <div class="tv-show-list">
    <div v-for="tvShow in tvShows" :key="tvShow.id" class="tv-show-card" @click="goToTvShowDetails(tvShow.id)">
      <img
        :src="`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`"
        :alt="tvShow.name"
      />
      <div class="tv-show-details">
        <p class="tv-show-title">{{ tvShow.name }}</p>
        <p class="tv-show-release-date">{{ formatDate(tvShow.first_air_date) }}</p>
        <p class="tv-show-genres">{{ getGenresByIds(tvShow.genre_ids) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-style: bold;
  text-align: center;
}

.select {
  display: flex;
  flex-direction: row;
  margin-left: 3%;
}

select {
  background-color: #232629de;
  border-color: rgba(255, 255, 255, 0.479);
  border-radius: 0%;
  padding: 0.2%;
  margin-left: 0.5%;
  margin-bottom: 1.5%;
}

.tv-show-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-left: 3%;
}

.tv-show-card {
  width: 15rem;
  height: 30rem;
  border: 0.5px solid rgba(255, 255, 255, 0.11);
}

.tv-show-card img {
  width: 100%;
  height: 20rem;
}

.tv-show-details {
  padding: 0 0.5rem;
}

.tv-show-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}
</style>


