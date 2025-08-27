import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import logo from "../assets/logo.png"
import SearchBox from "./SearchBox";
function NavBar(){
  const [isOpen, setIsOpen] = useState(false);
  return(
      <nav className="sticky top-0 z-50 w-full bg-[#1F1B2E] px-6 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>
          <div className="hidden md:flex space-x-6 text-lg items-center">
            <Link to="/" className="hover:text-[#FF4DA6] transition">Home</Link>
            <Link to="/cinema-fit" className="hover:text-[#FF4DA6] transition">Cinema Fit</Link>
            <Link to="/celeb-tea" className="hover:text-[#FF4DA6] transition">Celeb Tea</Link>
            <Link to="/watch-list" className="hover:text-[#FF4DA6] transition">Watch List</Link>
            <SearchBox />
          </div>

          <div className="hidden md:flex space-x-4">
            <button className="text-sm px-4 py-2 rounded-lg bg-[#2A243D] font-semibold hover:bg-[#FF4DA6] transition">Log me in</button>
            <button className="text-sm px-4 py-2 rounded-lg border border-[#FF4DA6] font-semibold hover:bg-[#FF4DA6] hover:text-black transition">Join the squad</button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        </div>

        {isOpen && (
        <div className="md:hidden mt-3 space-y-4 bg-[#1F1B2E] p-4 rounded-lg shadow-lg">
          <Link to="/" className="block hover:text-[#FF4DA6] transition">Home</Link>
          <Link to="/cinema-fit" className="block hover:text-[#FF4DA6] transition">Cinema Fit</Link>
          <Link to="/celeb-tea" className="block hover:text-[#FF4DA6] transition">Celeb Tea</Link>
          <Link to="/watch-list" className="block hover:text-[#FF4DA6] transition">Watch List</Link>
          
          <button className="flex items-center space-x-2 hover:text-[#FF4DA6] transition">
            <Search size={22} /> <span>Search</span>
          </button>

          <div className="flex space-x-3 pt-3 border-t border-white">
            <button className="flex-1 px-4 py-2 rounded-xl bg-black text-white font-semibold hover:bg-[#FF4DA6] transition">
              Sign In
            </button>
            <button className="flex-1 px-4 py-2 rounded-xl border border-[#FF4DA6] font-semibold hover:bg-[#FF4DA6] hover:text-black transition">
              Sign Out
            </button>
          </div>
        </div>
      )}
      </nav>
  );
}

export default NavBar;