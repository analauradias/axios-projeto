import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTZlNGI0YzExYjA5NjUzOTFkZjFhMDE2MjY2YjYyOSIsIm5iZiI6MTczMTk1NjE0OS4yNTc5NzYsInN1YiI6IjY3M2I4YjJmYTk5Y2Q3M2RiZDAzMWNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HXmFQWVbXuHsSLka7BVh75KnAtpyl31gwwy-T3DSQ6g',
  },
});

export default api;
