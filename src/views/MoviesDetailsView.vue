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

<div v-if="movieDetails" class="movie-details">
    <img :src="`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`" alt="Poster do filme" width="383px"/>
   
    <div class="info">

      <div id="title">
        <h1>{{ movieDetails.title }}</h1>
        <p>{{ formatDate(movieDetails.release_date) }}</p> <p> {{ movieDetails.runtime }} minutos</p>
      </div>

      <p> {{ movieDetails.overview }}</p>

      <div id="genres">
        <p>Gêneros:</p>
        <hr>
        <div id="genres-blocks">
          <p> {{ movieDetails.genres.map(genre => genre.name).join(', ') }} </p>
        </div>
    </div>
    
  </div>
</div>

    </template>

<style scoped>
.movie-details{
  display: flex;
  flex-direction: row;
}
#title{
  margin-top: 10%;
  margin-bottom: 3%;
}

img{
  margin-left: 12%;
  margin-top: 5%;
  margin-bottom: 10%;
}

.info{
  margin-left: 5%;
}

#genres{
  margin-top: 10%;
}

#genres-blocks{
  margin-top: 1.5%;
}

hr{
  width: 80%;
  opacity: 0.4;
}

</style>
