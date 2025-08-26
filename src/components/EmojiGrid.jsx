import happyEmoji from "../assets/emojis/happy.png";
import sadEmoji from "../assets/emojis/sad.png";
import angryEmoji from "../assets/emojis/angry.png";
import loveEmoji from "../assets/emojis/love.png";
import coolEmoji from "../assets/emojis/cool.png";
import surprisedEmoji from "../assets/emojis/surprised.png";
import cryingEmoji from "../assets/emojis/crying.png";
import thinkingEmoji from "../assets/emojis/thinking.png";
import funEmoji from "../assets/emojis/fun.png";
import laughEmoji from "../assets/emojis/laugh.png";
import heartbreakEmoji from "../assets/emojis/heartbreak.png";
import heartEmoji from "../assets/emojis/heart.png";

const emojis = [
  { src: happyEmoji, label: "Happy" },
  { src: sadEmoji, label: "Sad" },
  { src: angryEmoji, label: "Angry" },
  { src: loveEmoji, label: "Love" },
  { src: coolEmoji, label: "Cool" },
  { src: cryingEmoji, label: "Crying" },
  { src: thinkingEmoji, label: "Thinking" },
  { src: funEmoji, label: "fun" },
  { src: laughEmoji, label: "laugh" },
  { src: heartbreakEmoji, label: "heartbreak" },
  { src: surprisedEmoji, label: "surprised" },
  { src: heartEmoji, label: "heart" },
];

export default function EmojiGrid({ onEmojiClick }) {
  return (
    <div className="w-full py-12 flex flex-col items-center">
      <h2 className="text-xl md:text-3xl font-bold text-white mb-2 mt-5">
        Mood check → Let’s match the energy
      </h2>
      <p className="text-sm md:text-base mb-6">
        Feelin’ something? Tap your vibe and get the bangers.
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-6 gap-10 mt-18">
        {emojis.map((emoji, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-[#2C2C3B] p-2 rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onEmojiClick(emoji.label)}
          >
            <img src={emoji.src} alt={emoji.label} className="w-12 h-12" />
            <p className="mt-1 text-xs text-gray-300">{emoji.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
