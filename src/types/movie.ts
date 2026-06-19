export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  genres: string[];
}

export interface MovieDetail extends Movie {
  runtime: number;
  tagline: string;
  cast: CastMember[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
}