# Capstone Movie App(Genz Movie App)

A modern, Gen-Z–styled **movie discovery app** that ensures a user picks a mood (emoji) and get instant movie suggestions, browse trending movies with trailers, explore celebrity profiles, and watch Gen-Z fashion videos in the **Fit Check Center**.

---

## Important Sections

1. **Home Page** → Banner + *What’s Poppin* section.  
2. **EmojiGrid** → Click an emoji → MovieGrid updates with mood-based suggestions.  
3. **Fit Check Center** → Horizontally scroll trending Gen-Z fashion videos (YouTube embeds).  
4. **What’s Poppin → Arrow** → Navigate to `CinemaFit` (trending page).  
5. **CinemaFit** → Click a movie poster → Details + trailer appear at the top.  
6. **Celeb Tea** → Click a celeb card → Open detail page (bio + movies).  


---

## Key Features

- **Mood-based Movie Suggestions** — EmojiGrid → OMDb API queries.  
- **What’s Poppin (Spotlight)** — Featured trending movie + trailer (TMDB + YouTube).  
- **MovieGrid** — Reusable poster grid with:
  - Lazy-load on scroll  
  - Mood-based fetches (OMDb)  
  - Pagination with **“More Vibez”** button  
  - Smooth fade-in animations  
- **Fit Check Center** — Horizontally scrollable Gen-Z fashion videos (YouTube API).  
- **Celeb Tea** — Celeb cards → Detail page with static bio + TMDB credits.  
- **Routing & Navigation** — React Router with sticky navbar.

---

## Tech Stack

- **React (Vite)** — framework  
- **Tailwind CSS** — styling  
- **Lucide-React** — icons  
- **OMDb API** — mood/search-based movies  
- **TMDB API** — trending, movie details, trailers, celebrity credits  
- **YouTube Data API** — Gen-Z fashion videos  
- Local assets: logo, emojis, celeb headshots  

---

## Getting Started (Development)

**Prerequisites:**
- Node.js (v16+)  
- npm or yarn  

**Setup:**

```bash
# 1. Clone
git clone https://github.com/blessingemm/capstone-movie-app.git
cd capstone-movie-app

# 2. Install dependencies
npm install

# 3. Add environment variables
touch .env   # then add API keys

# 4. Run dev server
npm run dev

# Environmental Variables

Create a `.env` file in the project root:

```env
VITE_OMDB_API_KEY=your_omdb_key
VITE_TMDB_API_KEY=your_tmdb_key
VITE_YOUTUBE_API_KEY=your_youtube_key

````

* **OMDb** → mood-based movie search
* **TMDB** → trending, details, trailers, credits
* **YouTube** → Gen-Z fashion videos

✅ Ensure `.env` is in `.gitignore`.

---

# Architecture & Data Flow

### Emoji → Mood Flow

* User clicks emoji → `selectedMood` state updates.

* `MovieGrid` fetches OMDb results:

  ```
  https://www.omdbapi.com/?apikey=VITE_OMDB_API_KEY&s=<mood>&type=movie&page=<n>
  ```

* Grid renders results; defaults to lazy-load movies on first scroll.

---

### Trending & Trailers (TMDB + YouTube)

* `WhatsPoppin` → `/trending/movie/week` from TMDB → spotlight + trailer fetch.
* Embed trailers:

  ```
  https://www.youtube.com/embed/<TRAILER_KEY>
  ```

---

### CinemaFit

* TMDB trending grid.
* Clicking poster → details + trailer shown in top panel.

---

### Celeb Tea

* Local celeb data → TMDB `person/{id}/movie_credits`.
* Optional YouTube fetch for interviews.

---

### Fit Check Center

* YouTube API search → `genz fashion`.
* Render as horizontal scroll of video embeds.
---

# Project Structure

```
src/
├── App.jsx
├── main.jsx
├── assets/ (logo, banner, celebs/)
├── components/
│   ├── NavBar.jsx
│   ├── Banner.jsx
│   ├── EmojiGrid.jsx
│   ├── MovieGrid.jsx
│   ├── SpotlightCard.jsx
│   ├── WhatsPoppin.jsx
│   ├── CelebCard.jsx
│   └── FitCheckCenter.jsx
├── data/CelebDetails.js
├── pages/
│   ├── Home.jsx
│   ├── CinemaFit.jsx
│   ├── CelebTea.jsx
│   └── WatchList.jsx
└── index.css
```

---

# Component Responsibilities

* **EmojiGrid** → Emojis for mood → triggers fetch
* **MovieGrid** → Handles OMDb fetch + rendering
* **WhatsPoppin** → Spotlight + trending → `/cinema-fit`
* **CinemaFit** → Full trending page + detail panel
* **CelebTea** → Celeb cards + bio + TMDB credits
* **FitCheckCenter** → Horizontal Gen-Z fashion YouTube embeds

---

# Known Issues

* OMDb max = 10 results/page
* Some TMDB movies have no trailers
* YouTube API quota limits may cause failures
* Minor responsive inconsistencies across devices

---

# Author

**Blessing Avoswahi Emmanuel**
Frontend Developer — React, Tailwind
*ALX Capstone Project*

---


