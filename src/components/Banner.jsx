import bannerImage from "../assets/banner.jpg";
import { MdPlayArrow } from "react-icons/md";

function Banner() {
  return (
    <div className="relative h-[100vh] w-full flex items-center justify-center text-center text-white bg-black overflow-hidden">
      <img
        src={bannerImage}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/85"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Where Soft Life Meets Screen Time
        </h1>
        <p className="text-lg md:text-2xl mb-6">Only The Finest, Darling</p>
        <button className="bg-[#FF4DA6] hover:bg-pink-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
          <MdPlayArrow size={20} />
          Watch Teaser
        </button>
      </div>
    </div>
  );
}

export default Banner;
