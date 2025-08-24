import { useState } from "react";
import { Search } from "lucide-react";

function SearchBox(){
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return(
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="hover:text-[#FF4DA6] transition mt-2">
        <Search size={22} />
      </button>

      {open && (
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies..." className="absolute left-8 bottom-1 mt-2 bg-gray-800 text-white px-3 py-1 rounded-lg focus:outline-none"/>
      )}
    </div>
  );
}

export default SearchBox;