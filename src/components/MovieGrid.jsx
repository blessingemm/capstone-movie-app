import { useEffect, useRef, useState } from "react";

function MovieGrid({ selectedMood, apiKey }) {
  const [movies, setMovies] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(2);
  const [hasLoadedDefault, setHasLoadedDefault] = useState(false);

  const gridRef = useRef();

  const fetchMovies = async (query, pageNum = 1) => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie&page=${pageNum}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMaxPages(Math.ceil(data.totalResults / 10));
        return data.Search.map((m) => ({
          id: m.imdbID,
          title: m.Title,
          year: m.Year,
          poster:
            m.Poster !== "N/A" ? m.Poster : "/assets/posters/placeholder.jpg",
        }));
      }

      return [];
    } catch (err) {
      console.error("fetchMovies error:", err);
      return [];
    }
  };

  const loadDefault = async () => {
    const firstBatch = await fetchMovies("movie", 1);
    setMovies(firstBatch)
    setHasLoadedDefault(true)
    setFadeIn(true)
  };

  const loadByMood = async (pageNum = 1) => {
    if (!selectedMood) return;
    const batch = await fetchMovies(selectedMood, pageNum);

    setMovies((prev) => (pageNum === 1 ? batch : [...prev, ...batch]));

    
    setFadeIn(false);
    setTimeout(() => setFadeIn(true), 50);
  };

  useEffect(() => {
    if (!selectedMood && !hasLoadedDefault) {
      loadDefault()
    }
  }, [selectedMood, hasLoadedDefault]);

  useEffect(() => {
    if (selectedMood) {
      setPage(1)
      loadByMood(1)
    }
  }, [selectedMood, apiKey]);

  const handleLoadMore = () => {
    if (page < maxPages) {
      const next = page + 1
      setPage(next)
      loadByMood(next)
    }
  };

  return (
    <div
      ref={gridRef}
      className="w-full py-12 flex flex-col items-center px-6 bg-[#1F1B2E]"
    >
      <h2 className="text-xl font-bold text-white self-start mb-6 px-15">
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
                <div className="w-full aspect-[2/3] overflow-hidden flex items-center justify-center rounded-xl">
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
                  <p className="text-xs md:text-sm text-[#FF4DA6]">
                    {movie.year}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {page < maxPages && (
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
export default MovieGrid;