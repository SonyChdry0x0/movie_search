import { mockMovieDetail } from "@/lib/mock-movies";
import Link from "next/link";

export default function MovieDetailPage() {
  const movie = mockMovieDetail;

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
        <Link
          href="/"
          className="font-body text-sm text-stone hover:text-ink"
        >
          ← Back to archive
        </Link>

        <div className="mt-8 flex flex-col gap-8 sm:flex-row">
          {/* Poster placeholder */}
          <div className="aspect-2/3 w-full max-w-xs shrink-0 rounded-sm border border-ink/10 bg-linear-to-br from-stone/30 to-ink/40 flex items-center justify-center">
            <span className="font-display text-2xl italic text-paper/70 px-4 text-center">
              {movie.title}
            </span>
          </div>

          {/* Details */}
          <div className="flex-1">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-stone">
              {movie.releaseDate.slice(0, 4)} · {movie.runtime} min
            </p>
            <h1 className="mt-2 font-display text-4xl font-medium italic text-ink">
              {movie.title}
            </h1>
            <p className="mt-2 font-display text-lg italic text-amber">
              {movie.tagline}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber bg-ink font-body text-sm font-bold text-amber">
                {movie.voteAverage.toFixed(1)}
              </div>
              <div className="flex gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-ink/15 px-3 py-1 font-body text-xs text-stone"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 font-body text-base leading-relaxed text-ink/80">
              {movie.overview}
            </p>

            <div className="mt-8">
              <h2 className="font-display text-lg font-medium text-ink">
                Cast
              </h2>
              <div className="mt-3 flex flex-wrap gap-4">
                {movie.cast.map((member) => (
                  <div key={member.id} className="text-sm">
                    <p className="font-body font-medium text-ink">
                      {member.name}
                    </p>
                    <p className="font-body text-stone">
                      {member.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}