import { Movie, MovieDetail } from "@/types/movie";

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Last Reel",
    overview: "A film projectionist uncovers a hidden message left in the final frames of a forgotten silent film.",
    posterPath: "https://image.tmdb.org/t/p/w500/placeholder1.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/placeholder1.jpg",
    releaseDate: "2023-09-15",
    voteAverage: 7.8,
    genres: ["Drama", "Mystery"],
  },
  {
    id: 2,
    title: "Midnight in Marrakech",
    overview: "Two strangers cross paths during a power outage in the old city, and spend one unforgettable night together.",
    posterPath: "https://image.tmdb.org/t/p/w500/placeholder2.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/placeholder2.jpg",
    releaseDate: "2022-11-03",
    voteAverage: 8.1,
    genres: ["Romance", "Drama"],
  },
  {
    id: 3,
    title: "Static",
    overview: "A radio host begins receiving broadcasts from a station that went dark thirty years ago.",
    posterPath: "https://image.tmdb.org/t/p/w500/placeholder3.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/placeholder3.jpg",
    releaseDate: "2024-02-20",
    voteAverage: 7.2,
    genres: ["Horror", "Thriller"],
  },
];

export const mockMovieDetail: MovieDetail = {
  ...mockMovies[0],
  runtime: 118,
  tagline: "Every frame tells a story. Some tell secrets.",
  cast: [
    { id: 1, name: "Elena Voss", character: "Margot Lane", profilePath: null },
    { id: 2, name: "Theo Brandt", character: "Walter Hayes", profilePath: null },
  ],
};