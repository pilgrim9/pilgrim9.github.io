# Manuel Gorostiaga - Personal Website

A minimal, static personal website built with Vite and TypeScript.

## Features

- **Clean Design**: Minimalist layout inspired by modern personal sites
- **Medium Integration**: Automatically fetches and displays latest articles from Medium RSS
- **Media Tracking**: JSON-based media library with automatic cover image fetching
  - Books (Google Books API)
  - Anime/Manga (AniList API)
  - Movies, Series, Games, Albums (requires API keys)

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Editing Content

### Adding Media Items

Edit `public/media.json`:

```json
[
  {
    "title": "Your Movie Title",
    "year": 2024,
    "category": "movie"
  },
  {
    "title": "Your Book Title",
    "category": "book"
  }
]
```

**Categories**: `movie`, `series`, `game`, `manga`, `anime`, `album`, `book`

### Medium Articles

Articles are automatically fetched from `https://medium.com/@gorostiagamanuel`. To change the Medium username, edit `src/medium.ts`.

## Adding API Keys

For movies, games, and albums image fetching:

1. **TMDB** (movies/series): https://www.themoviedb.org/settings/api
2. **IGDB** (games): https://api.igdb.com/
3. **Last.fm** (albums): https://www.last.fm/api

Add keys in `src/media.ts`.

## Deployment

Deploy the `dist` folder after running `npm run build` to:
- Netlify
- Vercel  
- GitHub Pages
- Cloudflare Pages

## Tech Stack

- Vite
- TypeScript
- Vanilla HTML/CSS/JS
- RSS2JSON API (Medium)
- Google Books API
- AniList GraphQL API
