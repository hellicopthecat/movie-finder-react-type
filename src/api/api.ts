import {useQuery} from "react-query";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const movieApi = {
  latest: () =>
    fetch(`${BASE_URL}/movie/latest?api_key=${API_KEY}`)
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
    const [_, query] = queryKey;
    return await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=ko&page=1&region=kr`
    )
      .then((res) => res.json())
      .catch(console.log);
  },
};
export const tvApi = {
  latest: () =>
    fetch(`${BASE_URL}/tv/latest?api_key=${API_KEY}&language=ko`)
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
    const [_, query] = queryKey;
    return await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&language=ko&page=1&region=kr`
    )
      .then((res) => res.json())
      .catch(console.log);
  },
};

export const useTvApi = () => {
  const latest = useQuery(["tv", "tvLatest"], tvApi.latest);
  const airingToday = useQuery(["tv", "tvAiring"], tvApi.airingToday);
  const popular = useQuery(["tv", "tvPopular"], tvApi.popular);
  const topRate = useQuery(["tv", "tvTopRate"], tvApi.topRated);
  return [latest, airingToday, popular, topRate];
};