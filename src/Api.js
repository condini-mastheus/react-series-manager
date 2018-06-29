import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

const apis = {
  loadGenres: () => api.get('/genres'),
  saveSeries: (newSeries) => api.post('/series', newSeries),
  loadSeriesByGenre: (genre) => api.get('/series?genre=' + genre),
  deleteSeriesById: (id) => api.delete('/series/' + id),
  loadSeriesById: (id) => api.get('/series/' + id),
  updateSeriesById: (series) => api.put('/series/' + series.id, series),
}

export default apis