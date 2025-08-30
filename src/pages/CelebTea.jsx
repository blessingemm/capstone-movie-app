import { useParams, useNavigate } from "react-router-dom";
import { celebs } from "../data/CelebDetails";
import { useState } from "react";

function CelebTea() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const celeb = celebs.find((c) => c.id === parseInt(id));

  if (!id) {
    const filteredCelebs = celebs.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1F1B2E] p-6 text-white">
        <div className="max-w-3xl w-full bg-[#2A2340] rounded-2xl shadow-2xl p-6 border border-[#3A3355]">
          <h1 className="text-2xl font-bold mb-4 text-[#E9E4FF]">
            Peep A Celeb
          </h1>
          <input
            type="text"
            placeholder="Type a celeb name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#352C4C] border border-[#3A3355] focus:outline-none focus:ring-2 focus:ring-[#C084FC] text-white placeholder-gray-400"
          />

          <ul className="mt-6 grid sm:grid-cols-2 gap-4">
            {filteredCelebs.map((c) => (
              <li
                key={c.id}
                onClick={() => navigate(`/celeb-tea/${c.id}`)}
                className="cursor-pointer p-4 bg-[#352C4C] rounded-lg border border-[#3A3355] hover:bg-[#3F335A] transition">
                <div className="flex items-center gap-3">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-12 h-12 object-cover rounded-lg border border-[#3A3355]"
                  />
                  <span className="font-semibold">{c.name}</span>
                </div>
              </li>
            ))}
            {filteredCelebs.length === 0 && (
              <p className="text-gray-400 col-span-2">No celebrities found.</p>
            )}
          </ul>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1F1B2E] p-6 text-white">
      <div className="max-w-3xl w-full bg-[#2A2340] rounded-2xl shadow-2xl p-6 border border-[#3A3355]">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 rounded-xl bg-[#352C4C] hover:bg-[#3F335A] border border-[#3A3355] text-sm font-medium transition">
          &#8592; Back
        </button>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={celeb.image}
            alt={celeb.name}
            className="w-48 h-48 object-cover rounded-xl shadow-lg border border-[#3A3355]"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#E9E4FF]">
              {celeb.name}
            </h1>
            <p className="mt-3 text-gray-300 leading-relaxed">{celeb.bio}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold border-b border-[#3A3355] pb-2 text-[#C084FC]">
            Featured Movies
          </h2>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {celeb.movies.map((movie, index) => (
              <li
                key={index}
                className="p-3 bg-[#352C4C] rounded-lg border border-[#3A3355] shadow hover:bg-[#3F335A] transition">
                &#127902; {movie}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default CelebTea;