import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  const year = movie.releaseDate?.slice(0, 4) ?? "—";

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative block focus:outline-none"
    >
      <div className="relative aspect-2/3 overflow-hidden rounded-sm border border-ink/10 bg-surface">
        {/* Poster placeholder until real images come in */}
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-stone/30 to-ink/40">
          <span className="font-display text-2xl italic text-paper/70 px-4 text-center">
            {movie.title}
          </span>
        </div>

        {/* Torn-ticket corner detail */}
        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-paper" />

        {/* Rating stamp */}
        <div className="absolute bottom-2 left-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-amber bg-ink/80 font-body text-xs font-bold text-amber">
          {movie.voteAverage.toFixed(1)}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20 group-focus-visible:ring-2 group-focus-visible:ring-amber" />
      </div>

      <div className="mt-3">
        <h3 className="font-display text-base font-medium leading-tight text-ink line-clamp-1">
          {movie.title}
        </h3>
        <p className="mt-0.5 font-body text-sm text-stone">{year}</p>
      </div>
    </Link>
  );
}