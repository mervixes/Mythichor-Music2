# 🎵 Liquid Music — Liquid Glass Player

A stunning Android-style music player with liquid glass UI, iOS 26 spring animations, and full local file support.

## What This App Does

- **Play your own music** — pick folders on your device and play audio files (MP3, FLAC, AAC, OGG, WAV, Opus, WMA)
- **Beautiful liquid glass UI** — frosted panels, animated blobs, iOS-26 spring buttons, glassmorphic controls
- **Edit song metadata** — change title, artist, album, and cover art via the 3-dot menu
- **Create playlists** — organize your songs into custom playlists
- **Like songs** — heart icon persists favorites across sessions
- **Fullscreen player** — immersive now-playing with album art blur background
- **Volume pop slider** — clean vertical slider with no visible circle/ball
- **File info** — see format, bitrate, and size for every song
- **Play counts** — quick picks are ordered by your most-listened tracks

## 🚀 Run on Web (for testing)

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser. The web version uses `<input webkitdirectory>` to let you pick a folder of audio files.

---

## 📱 Turn This Into a Real Mobile App

### Prerequisites

Install the Capacitor CLI and Android SDK on your machine:

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Also install the Filesystem and Media plugins if you want native file browsing
npm install @capacitor/filesystem @capacitor-community/media
```

### Step 1 — Initialize Capacitor

```bash
npx cap init "Liquid Music" com.liquid.music --web-dir=dist
```

This creates `capacitor.config.ts` (already in the project) and an Android/iOS configuration.

### Step 2 — Add Android Platform

```bash
npx cap add android
```

This creates an `android/` folder with a full Android project.

### Step 3 — Build & Sync

```bash
npm run build
npx cap sync
```

### Step 4 — Open in Android Studio

```bash
npx cap open android
```

Android Studio will open. From there:
1. Wait for the Gradle sync to finish
2. Connect your Android phone via USB (with USB debugging enabled)
3. Click the green ▶ Run button

**The app will install and launch on your phone!**

### Step 5 (Optional) — Native Folder Picker

The web fallback uses `<input webkitdirectory>` which works on Android WebView. For the true native **Storage Access Framework (SAF)** experience, replace the body of `pickLocalFolders()` in `src/lib/folderScanner.ts` with:

```ts
// After installing @capacitor-community/media:
import { Media } from '@capacitor-community/media';
import { Filesystem, Directory } from '@capacitor/filesystem';

const permissions = await Filesystem.requestPermissions();
const files = await Media.query({
  directory: '/Music',
  filter: { mimeType: 'audio/*' },
});
```

### Build an APK (for sharing)

In Android Studio:
1. Go to **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Find the APK at `android/app/build/outputs/apk/debug/app-debug.apk`
3. Share it with anyone — no Play Store needed

---

## Project Structure

```
src/
├── App.tsx                 # Main app — navigation, state, modals
├── index.css               # Tailwind + liquid glass + iOS animations
├── hooks/
│   └── usePlayer.ts        # Audio playback, local songs, playlists
├── lib/
│   └── folderScanner.ts    # File picker + metadata extraction
├── components/
│   ├── Sidebar.tsx         # Desktop sidebar navigation
│   ├── MobileNav.tsx       # Mobile bottom navigation bar
│   ├── TopBar.tsx          # Top bar with back/forward, search, settings
│   ├── HomeView.tsx        # Home — greeting, quick picks, file info
│   ├── SearchView.tsx      # Full-text search across songs
│   ├── LibraryView.tsx     # Library — playlists + all songs + edit/delete
│   ├── LikedSongsView.tsx  # Favorites collection
│   ├── FolderPickerView.tsx / LocalSongsView.tsx  # Folder picker + local file browser
│   ├── NowPlaying.tsx      # Fullscreen player with controls
│   ├── PlayerBar.tsx       # Bottom player bar
│   ├── SettingsView.tsx    # Editable profile with avatar upload
│   ├── EditSongModal.tsx   # Edit title/artist/album/cover
│   ├── CreatePlaylistModal.tsx  # Create playlists
│   └── Background.tsx      # Animated liquid background blobs
```

## Tech Stack

- **React 19** + TypeScript
- **Vite** (single-file build for mobile)
- **Tailwind CSS 4**
- **HTML5 Audio API**
- **Capacitor** (for Android packaging)
- **localStorage** (likes, profile, play counts, playlists persist)
