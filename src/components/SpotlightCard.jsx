import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function WhatsPoppin() {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrendingMovie = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        // Fetch trending movies
        const trendingRes = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );
        const trendingData = await trendingRes.json();
        const topMovie = trendingData.results[0];
        setMovie(topMovie);

        // Fetch movie details including videos/trailers
        const movieDetailsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${topMovie.id}?api_key=${apiKey}&append_to_response=videos`
        );
        const movieDetailsData = await movieDetailsRes.json();

        // Find the first YouTube trailer
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
    <div className="relative bg-[#2C2C3B] bg-opacity-40 text-white p-6 rounded-2xl shadow-xl max-w-6xl mx-auto mt-10">
      {/* Arrow button */}
      <div className="flex flex-row">
        <h2 className="text-xl md:text-xl font-bold text-white self-start px-4 mb-6">
        WHAT'S <span className="text-[#FF4DA6]">POPPIN'</span>
      </h2>

      <div className="absolute top-4 right-4">
        <Link
          to="/cinemaFit"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-900 shadow-lg hover:bg-gray-200 transition"
        >
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
      

      {/* Grid container */}
      <div className="flex flex-col md:flex-row gap-6 items-start mt-8">
        <div className="flex flex-col items-center w-full md:w-[300px] flex-shrink-0">
          <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl shadow-lg w-full"
        />
        <h2 className="mt-4 text-xl font-bold text-center">
          {movie.title} ({movie.release_date?.slice(0, 4)})
        </h2>
      </div>

      <div className="w-full aspect-video">
        {trailerKey ? (
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title={`${movie.title} Trailer`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
      ></iframe>
    ) : (
      <div className="w-full h-full flex items-center justify-center text-white rounded-xl shadow-lg bg-gray-800">
        Trailer not available
      </div>
    )}
  </div>
</div>
</div>
  );
}
