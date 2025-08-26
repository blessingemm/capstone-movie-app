import { useEffect, useRef, useState } from "react";

export default function MovieGrid({ selectedMood, apiKey }) {
  const [movies, setMovies] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [fetchedDefault, setFetchedDefault] = useState(false);

  const gridRef = useRef();

  const fetchMovies = async (query, page = 1) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie&page=${page}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setTotalPages(Math.ceil(data.totalResults / 10));
        return data.Search.map((movie) => ({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster:
            movie.Poster !== "N/A"
              ? movie.Poster
              : "/assets/posters/placeholder.jpg",
        }));
      } else {
        return [];
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      return [];
    }
  };

  const loadDefaultMovies = async () => {
    const moviesPage1 = await fetchMovies("movie", 1);
    setMovies(moviesPage1);
    setFetchedDefault(true);
    setFadeIn(true);
  };

  const loadMoodMovies = async (page = 1) => {
    if (!selectedMood) return;

    const moodMovies = await fetchMovies(selectedMood, page);
    setMovies((prev) => (page === 1 ? moodMovies : [...prev, ...moodMovies]));

    setFadeIn(false);
    setTimeout(() => setFadeIn(true), 50);
  };

  useEffect(() => {
    if (!selectedMood && !fetchedDefault) {
      loadDefaultMovies();
    }
  }, [selectedMood, fetchedDefault]);

  useEffect(() => {
    if (selectedMood) {
      setCurrentPage(1);
      loadMoodMovies(1);
    }
  }, [selectedMood, apiKey]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadMoodMovies(nextPage);
    }
  };

  return (
    <div
      ref={gridRef}
      className="w-full py-12 flex flex-col items-center px-6 bg-[#1F1B2E]"
    >
      <h2 className="text-xl font-bold text-white self-start px-18 mb-6">
        SERVING <span className="text-[#FF4DA6]">FEEL</span>
      </h2>

      {movies.length === 0 ? (
        <p className="text-gray-400">Loading movies...</p>
      ) : (
        <>
          <div
            className={`grid grid-cols-2 sm:grid-cols-5 gap-6 transition-opacity duration-700 ${
              fadeIn ? "opacity-100" : "opacity-0"
            } max-w-[1200px] mx-auto`}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="flex flex-col items-center p-2">
                <div className="w-full aspect-[2/3] overflow-hidden flex items-center justify-center">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between mt-2 w-full">
                  <h3 className="text-xs md:text-sm font-semibold text-white truncate">
                    {movie.title}
                  </h3>
                  <p className="text-xs md:text-sm mt-1 text-[#FF4DA6]">
                    {movie.year}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {currentPage < totalPages && (
            <button
              onClick={handleLoadMore}
              className="mt-8 px-6 py-2 bg-[#FF4DA6] text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
}
