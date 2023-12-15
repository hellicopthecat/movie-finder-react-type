const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const movieApi = {
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=kr`
    )
      .then((res) => res.json())
      .catch(console.log),
  topRated: () =>
    fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko&page=1&region=kr`
    )
      .then((res) => res.json())
      .catch(console.log),
  upcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=1&region=kr`
    )
      .then((res) => res.json())
      .catch(console.log),
  search: async ({queryKey}: any) => {
    const [, , query] = queryKey;
    return await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=ko&page=1&region=kr`
    )
      .then((res) => res.json())
      .catch(console.log);
  },
};
export const tvApi = {
  onTheAir: () =>
    fetch(
      `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=ko&page=1&timezone=week`
    )
      .then((res) => res.json())
      .catch(console.log),
  airingToday: () =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko&page=1&timezone=week`
    )
      .then((res) => res.json())
      .catch(console.log),
  popular: () =>
    fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko&page=1`)
      .then((res) => res.json())
      .catch(console.log),
  topRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko&page=1`)
      .then((res) => res.json())
      .catch(console.log),
  search: async ({queryKey}: any) => {
    const [, , query] = queryKey;
    return await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&language=ko&page=1&region=kr`
    )
      .then((res) => res.json())
      .catch(console.log);
  },
};
