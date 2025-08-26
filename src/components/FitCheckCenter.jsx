import { useEffect, useState, useRef } from "react"
import { X } from "lucide-react"

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

function FitCheckCenter() {
  const [clips, setClips] = useState([])
  const [activeClip, setActiveClip] = useState(null)
  const scrollTrack = useRef(null)

  useEffect(() => {
    const loadClips = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=genz%20fashion&type=video&maxResults=12&key=${API_KEY}`
        )
        const data = await res.json()
        setClips(data.items || [])
      } catch (err) {
        console.warn("couldn’t fetch videos:", err)
      }
    }

    loadClips()
  }, [])

  
  useEffect(() => {
    const el = scrollTrack.current
    if (!el) return

    const timer = setInterval(() => {
      const atEnd =
        el.scrollLeft + el.clientWidth >= el.scrollWidth

      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        el.scrollBy({ left: 320, behavior: "smooth" })
      }
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full py-10 bg-[#1F1B2E]">
      <h2 className="text-xl font-bold text-white px-15 mb-8 mt-20">
        FIT CHECK <span className="text-[#FF4DA6]">CENTER</span>
      </h2>

      <div
        ref={scrollTrack}
        className="flex space-x-6 overflow-x-auto px-6 no-scrollbar snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {clips.map((clip, i) => (
          <div
            key={i}
            onClick={() => setActiveClip(clip.id.videoId)}
            className="relative flex-none w-[360px] aspect-video snap-center rounded-2xl overflow-hidden shadow-xl bg-black cursor-pointer hover:scale-105 transition-transform group"
          >
            <img
              src={clip.snippet.thumbnails.high.url}
              alt={clip.snippet.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-3">
              <h3 className="text-white text-sm font-semibold line-clamp-2">
                {clip.snippet.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {activeClip && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl bg-black rounded-2xl shadow-2xl">
            <button
              onClick={() => setActiveClip(null)}
              className="absolute top-3 right-3 text-white hover:text-red-400 transition"
            >
              <X size={28} />
            </button>
            <iframe
              className="w-full aspect-video rounded-2xl"
              src={`https://www.youtube.com/embed/${activeClip}?autoplay=1`}
              title="Selected clip"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default FitCheckCenter;