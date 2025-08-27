import { useState } from "react";
import Banner from "../components/Banner";
import EmojiGrid from "../components/EmojiGrid";
import MovieGrid from "../components/MovieGrid";
import WhatsPoppin from "../components/SpotlightCard";
import FitCheckCenter from "../components/FitCheckCenter";
import CelebGrid from "../components/CelebGrid";

function Home() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [movies, setMovies] = useState([]); 

  const handleEmojiClick = async (mood) => {
    setSelectedMood(mood);

  };

  return (
    <div>
      <Banner />
      <EmojiGrid onEmojiClick={handleEmojiClick} />
      <MovieGrid
        selectedMood={selectedMood}
        apiKey={import.meta.env.VITE_OMDB_API_KEY}
      />
      <WhatsPoppin />
      <FitCheckCenter />
      <CelebGrid />
    </div>
  );
}

export default Home;
