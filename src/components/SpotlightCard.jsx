import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function WhatsPoppin() {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrendingMovie = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        const trendingRes = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );
        const trendingData = await trendingRes.json();
        const topMovie = trendingData.results[0];
        setMovie(topMovie);

        const movieDetailsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${topMovie.id}?api_key=${apiKey}&append_to_response=videos`
        );
        const movieDetailsData = await movieDetailsRes.json();

        const trailer = movieDetailsData.videos.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error("Error fetching TMDB data:", error);
      }
    };

    fetchTrendingMovie();
  }, []);

  if (!movie) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="relative bg-gradient-to-br from-[#1F1B2E] to-[#2A243D] text-white p-6 rounded-xl shadow-lg shadow-black/70 max-w-6xl mx-auto mt-10 border border-[#2A253D]">
      <div className="flex flex-row">
        <h2 className="text-xl md:text-xl font-bold text-white self-start px-4 mb-6">
        WHAT'S <span className="text-[#FF4DA6]">POPPIN'</span>
      </h2>

      <div className="absolute top-4 right-4">
        <Link
          to="/cinema-fit"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#1F1B2E] shadow-lg hover:bg-gray-200 transition">
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
      
    <div className="flex flex-col md:flex-row gap-6 items-start mt-8">
      <div className="flex flex-col items-center w-full md:w-[300px] flex-shrink-0">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl shadow-lg w-full"
        />
        <div className="flex flex-row justify-between items-between mt-4 text-sm">
          <h2>{movie.title}</h2>
        <h2 className="text-[#FF4DA6] ml-50">{movie.release_date?.slice(0, 4)}</h2>
        </div>
      </div>

      <div className="w-full aspect-video">
        {trailerKey ? (
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title={`${movie.title} Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
    ) : (
      <div className="w-full h-full flex items-center justify-center text-white rounded-xl shadow-lg bg-[#1F1B2E]">
        Trailer not available
      </div>
    )}
  </div>
</div>
</div>
  );
}
export default WhatsPoppin;