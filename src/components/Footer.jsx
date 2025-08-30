import React from "react";

function MovieAppFooter() {
  return (
    <footer className="text-white bg-[#1F1B2E] py-12 px-6 mt-[25px]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-4">Big Screen Vibez</h3>
          <p className="text-gray-400 mb-4">
            Catch the freshest flicks, peep the trailers, and vibe with cinema magic.
          </p>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-[#FF4DA6] transition">Home</a></li>
            <li><a href="/cinema-fit" className="hover:text-[#FF4DA6] transition">Cinema Fit</a></li>
            <li><a href="/celeb-tea" className="hover:text-[#FF4DA6] transition">Celeb Tea</a></li>
            <li><a href="/watch-list" className="hover:text-[#FF4DA6] transition">Watch List</a></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl font-bold mb-4">Let's Vibe Together</h3>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Hit us with your @"
              className="flex-1 px-4 bg-[#2A243D] py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF4DA6]"
            />
            <textarea
              placeholder="Spill the tea"
              className="flex-1 px-4 bg-[#2A243D] py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF4DA6]">
            </textarea>
            <button
              type="submit"
              className="bg-[#FF4DA6] px-6 py-2 rounded-lg hover:bg-pink-600 transition">
              Let's gooo
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[#FF4DA6] mt-12 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Big Screen Vibez. All rights reserved.
      </div>
    </footer>
  );
}
export default MovieAppFooter;