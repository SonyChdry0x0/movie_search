const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = process.env.TMDB_API_KEY;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

export async function getTrending() {
  const res = await fetch(`${BASE_URL}/trending/movie/week`, {
    headers, next: { revalidate: 3600 },
  });
  const data = await res.json();
  const todayStr = new Date().toISOString().slice(0, 10);
  return data.results.filter((m: any) => m.release_date <= todayStr);
}

export async function getNowPlaying() {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?region=US&language=en-US`,
    { headers, next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const todayStr = new Date().toISOString().slice(0, 10);
  return data.results
    .filter((m: any) => m.release_date && m.release_date <= todayStr)
    .sort((a: any, b: any) => b.release_date.localeCompare(a.release_date));
}

export async function getTopRated() {
  const res = await fetch(`${BASE_URL}/movie/top_rated`, {
    headers, next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.results;
}

export async function searchMovies(query: string) {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    { headers }
  );
  const data = await res.json();
  return data.results;
}

export async function getMovieDetail(id: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?append_to_response=credits`,
    { headers, next: { revalidate: 3600 } }
  );
  return res.json();
}

export async function getBollywood() {
  const res = await fetch(
    `${BASE_URL}/discover/movie?with_original_language=hi&sort_by=popularity.desc&region=IN`,
    { headers, next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const todayStr = new Date().toISOString().slice(0, 10);
  return data.results.filter((m: any) => m.release_date <= todayStr);
}

export async function getKorean() {
  const res = await fetch(
    `${BASE_URL}/discover/movie?with_original_language=ko&sort_by=popularity.desc`,
    { headers, next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const todayStr = new Date().toISOString().slice(0, 10);
  return data.results.filter((m: any) => m.release_date <= todayStr);
}

export async function getTrendingTV() {
  const res = await fetch(`${BASE_URL}/trending/tv/week`, {
    headers, next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.results;
}

export async function getPopularTV() {
  const res = await fetch(`${BASE_URL}/tv/popular`, {
    headers, next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.results;
}

export async function getNepali() {
  const res = await fetch(
    `${BASE_URL}/discover/movie?with_original_language=ne&sort_by=popularity.desc`,
    { headers, next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data.results;
}
export async function getHindiTV() {
  const res = await fetch(
    `${BASE_URL}/discover/tv?with_original_language=hi&sort_by=popularity.desc`,
    { headers, next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data.results;
}

export async function getKDrama() {
  const res = await fetch(
    `${BASE_URL}/discover/tv?with_original_language=ko&sort_by=popularity.desc`,
    { headers, next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data.results;
}

export async function getNepaliTV() {
  const res = await fetch(
    `${BASE_URL}/discover/tv?with_original_language=ne&sort_by=popularity.desc`,
    { headers, next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data.results;
}