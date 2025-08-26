import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const CinemaFit = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false);

const fetchMovies = async (pageNum) => {
  try {
    setLoading(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${pageNum}`
    );
    const data = await res.json();
    setMovies((prev) => {
    const combined = [...prev, ...data.results];
    const unique = Array.from(new Map(combined.map((m) => [m.id, m])).values());
    return unique;
  });

  } catch (err) {
    console.error("Error fetching movies:", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchMovies(page);
  }, [page]);

  const fetchMovieDetails = async (movie) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      const trailer = data.results.find((vid) => vid.type === "Trailer");

      setSelectedMovie({
        ...movie,
        trailerKey: trailer ? trailer.key : null,
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-[#1F1B2E] min-h-screen text-white">
      <h1 className="text-3xl font-bold text-white self-start mb-15">
        Big Screen <span className="text-[#FF4DA6]">Vibez</span>
      </h1>
      {selectedMovie && (
        <div className="bg-gradient-to-br from-[#1F1B2E] to-[#2A243D] text-white p-6 rounded-xl shadow-lg shadow-black/70 max-w-6xl mx-auto mt-10 border border-[#2A253D] mb-10 flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center w-full md:w-[300px] flex-shrink-0">
            <img
              src={`${IMAGE_BASE_URL}${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="rounded-xl shadow-lg w-full"
            />
            <h2 className="text-2xl font-semibold mt-4 text-center">
              {selectedMovie.title}
            </h2>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <div className="w-full aspect-video">
              {selectedMovie.trailerKey ? (
                <iframe
                  className="w-full h-full rounded-xl shadow-lg"
                  src={`https://www.youtube.com/embed/${selectedMovie.trailerKey}`}
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white rounded-xl shadow-lg bg-[#1F1B2E]">
                  No trailer available.
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                {selectedMovie.overview || "No description available."}
              </p>
              <p className="text-yellow-400 font-medium">
                Rating: {selectedMovie.vote_average}
              </p>
              <p className="text-gray-400">{selectedMovie.release_date}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer transform hover:scale-105 transition"
            onClick={() => fetchMovieDetails(movie)}
          >
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="rounded-xl shadow-lg"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
          className="px-6 py-2 bg-[#FF4DA6] text-white rounded-lg shadow-md hover:bg-pink-600 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default CinemaFit;
