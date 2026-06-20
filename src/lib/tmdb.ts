const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = process.env.TMDB_API_KEY;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

export async function getTrending() {
  const res = await fetch(`${BASE_URL}/trending/movie/week`, {
    headers,
    next: { revalidate: 3600 },
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