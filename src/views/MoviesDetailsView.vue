<script setup>
import { defineProps, onMounted, ref } from 'vue';
import api from '@/plugins/axios';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const movieDetails = ref(null);

onMounted(async () => {
  const response = await api.get(`movie/${props.id}`, {
    params: {
      language: 'pt-BR'
    }
  });
  movieDetails.value = response.data;
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR'); // Formato: dd/mm/ano
};
</script>

<template>

<div v-if="movieDetails">
    <h1>{{ movieDetails.title }}</h1>
    <img :src="`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`" alt="Poster do filme" width="20%"/>
    <p>{{ movieDetails.overview }}</p>
    <p><strong>Descrição:</strong> {{ movieDetails.overview }}</p>
    <p><strong>Lançamento:</strong> {{ formatDate(movieDetails.release_date) }}</p>
    <p><strong>Duração:</strong> {{ movieDetails.runtime }} minutos</p>
    <p><strong>Gêneros:</strong> {{ movieDetails.genres.map(genre => genre.name).join(', ') }}</p>
    <p><strong>Avaliação:</strong> {{ movieDetails.vote_average.toFixed(1) }}</p>
    <p><strong>Gêneros:</strong>
      {{ movieDetails.genres.map(genre => genre.name).join(', ') }}
    </p>
    </div>

    </template>

<style scoped>
.movie-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.movie-details h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.movie-details img {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Detalhes do filme */
.movie-details p {
  font-size: 1.1rem;
  margin: 10px 0;
  color: #444;
}

.movie-details p strong {
  color: #007bff;
  font-weight: 600;
}

</style>
