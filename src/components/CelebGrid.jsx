import { celebs } from "../data/CelebDetails";
import { Link } from "react-router-dom";

export default function CelebGrid() {
  return (
    <div className="p-15">
      <h2 className="text-xl font-bold text-white mb-8 px-4 sm:px-0">
        THE TEA OF YOUR <span className="text-[#FF4DA6]">FAVES</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {celebs.map((celeb) => (
          <Link
            key={celeb.id}
            to={`/celeb-tea/${celeb.id}`}>
            <div className="bg-gradient-to-br from-[#1F1B2E] to-[#2A243D] text-white p-6 rounded-xl shadow-lg shadow-black/70 flex flex-col items-center cursor-pointer hover:scale-105 transition">
              <img
                src={celeb.image}
                alt={celeb.name}
                className="rounded-full w-[100px] h-[140px] object-cover mb-2"
              />
              <h3 className="text-white font-semibold text-center">{celeb.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
