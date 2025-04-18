<template xmlns="http://www.w3.org/1999/html">
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
    <div class="max-w-5xl mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-6 text-center">🎬 ScreenPairs</h1>
      <p class="text-center text-lg mb-12">
        Find movies where two actors shared the screen.
      </p>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
        <!-- Search Inputs -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label class="block mb-2 font-semibold text-sm" for="actor1">Actor 1</label>
            <div class="relative">
              <input
                  id="actor1"
                  v-model="actor1"
                  @input="searchActors(actor1, 'actor1')"
                  type="text"
                  class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex : Brad Pitt"
              />
              <ul v-if="suggestions1.length" class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                <li
                    v-for="suggestion in suggestions1"
                    :key="suggestion.id"
                    @click="selectActor(suggestion.name, 'actor1')"
                    class="px-4 py-2 cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-600 flex items-center justify-between gap-3"
                >
                  <span class="text-base font-medium truncate">{{ suggestion.name }}</span>
                  <img
                      v-if="suggestion.profile_path"
                      :src="`https://image.tmdb.org/t/p/w92${suggestion.profile_path}`"
                      alt="photo"
                      class="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <img
                      v-else
                      src="https://placehold.co/40x40?text=?"
                      alt="photo"
                      class="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-gray-200 dark:bg-gray-500"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div>
            <label class="block mb-2 font-semibold text-sm" for="actor2">Actor 2</label>
            <div class="relative">
              <input
                  id="actor2"
                  v-model="actor2"
                  @input="searchActors(actor2, 'actor2')"
                  type="text"
                  class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex : Angelina Jolie"
              />
              <ul v-if="suggestions2.length" class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                <li
                    v-for="suggestion in suggestions2"
                    :key="suggestion.id"
                    @click="selectActor(suggestion.name, 'actor2')"
                    class="px-4 py-2 cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-600 flex items-center justify-between gap-3"
                >
                  <span class="text-base font-medium truncate">{{ suggestion.name }}</span>
                  <img
                      v-if="suggestion.profile_path"
                      :src="`https://image.tmdb.org/t/p/w92${suggestion.profile_path}`"
                      alt="photo"
                      class="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <img
                      v-else
                      src="https://placehold.co/40x40?text=?"
                      alt="photo"
                      class="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-gray-200 dark:bg-gray-500"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Search Button -->
        <button
            @click="searchMovies"
            :disabled="!actor1 || !actor2 || loading"
            class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Searching...</span>
          <span v-else>Find common movies</span>
        </button>

        <!-- Loading Indicator -->
        <div v-if="loading" class="mt-8 text-center text-gray-500 dark:text-gray-400">
          <svg class="animate-spin h-6 w-6 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading...</p>
        </div>

        <div v-if="actorImages.actor1 || actorImages.actor2" class="flex justify-center gap-12 mt-8 mb-8">
          <div v-if="actorImages.actor1" class="text-center">
            <a v-if="actorLinks.actor1" :href="actorLinks.actor1" target="_blank" rel="noopener">
              <img
                  :src="`https://image.tmdb.org/t/p/w185${actorImages.actor1}`"
                  alt="Portrait acteur 1"
                  class="rounded-full w-28 h-28 object-cover mx-auto mb-2 ring-2 ring-indigo-500 dark:ring-indigo-300 transition hover:scale-105 hover:brightness-110 duration-150"
              />
            </a>
            <img
                v-else
                :src="`https://image.tmdb.org/t/p/w185${actorImages.actor1}`"
                alt="Portrait acteur 1"
                class="rounded-full w-28 h-28 object-cover mx-auto mb-2 shadow-lg"
            />
            <p class="font-medium">{{ actor1 }}</p>
          </div>

          <div v-if="actorImages.actor2" class="text-center">
            <a v-if="actorLinks.actor2" :href="actorLinks.actor2" target="_blank" rel="noopener">
              <img
                  :src="`https://image.tmdb.org/t/p/w185${actorImages.actor2}`"
                  alt="Portrait acteur 2"
                  class="rounded-full w-28 h-28 object-cover mx-auto mb-2 ring-2 ring-indigo-500 dark:ring-indigo-300 transition hover:scale-105 hover:brightness-110 duration-150"
              />
            </a>
            <img
                v-else
                :src="`https://image.tmdb.org/t/p/w185${actorImages.actor2}`"
                alt="Portrait acteur 1"
                class="rounded-full w-28 h-28 object-cover mx-auto mb-2 shadow-lg"
            />
            <p class="font-medium">{{ actor2 }}</p>
          </div>

        </div>

        <!-- Results Section -->
        <div v-if="results.length && !loading" class="mt-10 space-y-10">

          <div v-if="regularMovies.length" class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800 p-5 rounded-lg border-l-4 border-indigo-500 dark:border-indigo-400 shadow-md">
            <h2 class="text-2xl font-bold mb-5 pb-2 border-b border-indigo-200 dark:border-indigo-700 flex items-center gap-2 text-indigo-800 dark:text-indigo-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
              <span>Movies</span>
            </h2>
            <ul class="space-y-6">
              <li v-for="movie in regularMovies" :key="movie.id" class="flex items-start gap-4 border-b border-indigo-100 dark:border-indigo-800 pb-4 last:border-b-0 last:pb-0">
                <a v-if="movie.imdb_url" :href="movie.imdb_url" target="_blank" rel="noopener" class="flex-shrink-0">
                  <img :src="getPoster(movie.poster_path)" :alt="`Affiche de ${movie.title}`" class="w-20 sm:w-24 rounded-md shadow-md hover:opacity-80 transition-opacity" />
                </a>
                <img v-else :src="getPoster(movie.poster_path)" :alt="`Affiche de ${movie.title}`" class="w-20 sm:w-24 rounded-md shadow-md flex-shrink-0" />
                <div class="flex-grow">
                  <h3 class="text-lg sm:text-xl font-semibold mb-1">
                    <a
                        :href="movie.imdb_url"
                        target="_blank"
                        rel="noopener"
                        class="text-indigo-700 dark:text-indigo-300 hover:underline font-semibold inline-flex items-center gap-1 transition"
                    >
                      {{ movie.title }}
                    </a>

                    <span class="text-gray-500 dark:text-gray-400 font-normal text-base"> ({{ movie.release_year }})</span>
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Director(s) : {{ movie.directors.join(', ') || 'N/A' }}</p>
                  <p class="text-sm text-gray-700 dark:text-gray-200"><strong class="font-medium">{{ actor1 }}</strong> : {{ movie.characters[actor1] || 'Role unspecified' }}</p>
                  <p class="text-sm text-gray-700 dark:text-gray-200"><strong class="font-medium">{{ actor2 }}</strong> : {{ movie.characters[actor2] || 'Role unspecified' }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Documentaries Section -->
          <div v-if="documentaries.length" class="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-gray-700 dark:to-gray-800 p-5 rounded-lg border-l-4 border-yellow-400 dark:border-yellow-500 shadow-md">
            <h2 class="text-2xl font-bold mb-5 pb-2 border-b border-yellow-200 dark:border-yellow-700 flex items-center gap-2 text-amber-800 dark:text-yellow-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Documentaries</span>
            </h2>
            <ul class="space-y-6">
              <li v-for="movie in documentaries" :key="movie.id" class="flex items-start gap-4 border-b border-yellow-100 dark:border-gray-600 pb-4 last:border-b-0 last:pb-0">
                <a v-if="movie.imdb_url" :href="movie.imdb_url" target="_blank" rel="noopener" class="flex-shrink-0">
                  <img :src="getPoster(movie.poster_path)" :alt="`Affiche de ${movie.title}`" class="w-20 sm:w-24 rounded-md shadow-md hover:opacity-80 transition-opacity" />
                </a>
                <img v-else :src="getPoster(movie.poster_path)" :alt="`Affiche de ${movie.title}`" class="w-20 sm:w-24 rounded-md shadow-md flex-shrink-0" />
                <div class="flex-grow">
                  <h3 class="text-lg sm:text-xl font-semibold mb-1">
                    <template v-if="movie.imdb_url">
                      <a
                          :href="movie.imdb_url"
                          target="_blank"
                          rel="noopener"
                          class="text-yellow-700 dark:text-yellow-300 hover:underline font-semibold inline-flex items-center gap-1 transition"
                      >
                        {{ movie.title }}
                      </a>
                    </template>
                    <template v-else>
                      <span class="text-gray-700 dark:text-gray-300">{{ movie.title }}</span>
                    </template>
                    <span class="text-gray-500 dark:text-gray-400 font-normal text-base"> ({{ movie.release_year }})</span>
                  </h3>

                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Director(s) : {{ movie.directors.join(', ') || 'N/A' }}</p>
                  <p class="text-sm text-gray-700 dark:text-gray-200"><strong class="font-medium">{{ actor1 }}</strong> : {{ movie.characters[actor1] || 'Appearance' }}</p>
                  <p class="text-sm text-gray-700 dark:text-gray-200"><strong class="font-medium">{{ actor2 }}</strong> : {{ movie.characters[actor2] || 'Appearance' }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- No Results Message -->
        <div v-else-if="!loading && actor1 && actor2 && searchAttempted" class="mt-10 text-center py-8 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p class="text-lg text-gray-600 dark:text-gray-300">
            No common movie or documentary found between <strong class="text-indigo-600 dark:text-indigo-400">{{ actor1 }}</strong> and <strong class="text-indigo-600 dark:text-indigo-400">{{ actor2 }}</strong>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      actor1: '',
      actor2: '',
      suggestions1: [],
      suggestions2: [],
      results: [],
      loading: false,
      actorImages: {
        actor1: '',
        actor2: '',
      },
      actorLinks: {
        actor1: '',
        actor2: '',
      },
    };
  },
  computed: {
    regularMovies() {
      return this.results
          .filter(movie => !movie.genres?.some(g => g.id === 99))
          .sort((a, b) => parseInt(b.release_year) - parseInt(a.release_year));
    },
    documentaries() {
      return this.results
          .filter(movie => movie.genres?.some(g => g.id === 99))
          .sort((a, b) => parseInt(b.release_year) - parseInt(a.release_year));
    },
  },
  methods: {
    async searchActors(query, target) {
      const suggestionsKey = target === 'actor1' ? 'suggestions1' : 'suggestions2';

      if (!query) {
        this[suggestionsKey] = [];
        return;
      }

      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/actor-autocomplete/`, {
          params: { query },
        });
        this[suggestionsKey] = res.data.results;
      } catch (error) {
        console.error('Erreur autocomplétion :', error);
      }
    },

    selectActor(name, target) {
      this[target] = name;
      this[target === 'actor1' ? 'suggestions1' : 'suggestions2'] = [];

      if (this.actor1 && this.actor2) {
        this.searchMovies();
      }
    },

    async searchMovies() {
      if (!this.actor1 || !this.actor2) return;

      this.loading = true;
      this.results = [];
      this.actorImages = { actor1: '', actor2: '' };

      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/common-movies/`, {
          params: { actor1: this.actor1, actor2: this.actor2 },
        });

        this.results = res.data.results;
        this.actorImages.actor1 = res.data.actor1_image || '';
        this.actorImages.actor2 = res.data.actor2_image || '';
        this.actorLinks.actor1 = res.data.actor1_imdb || '';
        this.actorLinks.actor2 = res.data.actor2_imdb || '';
      } catch (error) {
        console.error('Erreur recherche films :', error);
      } finally {
        this.loading = false;
      }
    },

    getPoster(path) {
      return path
          ? `https://image.tmdb.org/t/p/w200${path}`
          : 'https://placehold.co/200x300?text=No+Image';
    },
    async fetchPopularDuos() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/popular-duos/');
        this.popularDuos = res.data.results.map(duo => {
          const filteredMovies = (duo.common_movies || []).filter(movie => {
            const genres = movie.genres || [];
            return !genres.some(g => g.id === 99);
          });

          return {
            ...duo,
            common_movies: filteredMovies,
            common_movies_count: filteredMovies.length,
          };
        });
      } catch (error) {
        console.error('Erreur récupération duos populaires :', error);
      }
    }

  },
};
</script>


<style scoped>
input:focus {
  outline: none;
}

.max-h-60::-webkit-scrollbar {
  width: 6px;
}
.max-h-60::-webkit-scrollbar-track {
  background: transparent;
}
.max-h-60::-webkit-scrollbar-thumb {
  background-color: rgba(160, 160, 160, 0.5);
  border-radius: 3px;
}
.dark .max-h-60::-webkit-scrollbar-thumb {
  background-color: rgba(90, 90, 90, 0.7);
}
</style>