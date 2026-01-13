# Note-Taking App

A modern, beautiful note-taking web application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✨ **Glassmorphism Design** - Beautiful blurred glass effects with modern UI
- 📝 **Markdown Support** - Write notes in Markdown with real-time preview
- 🔍 **Search Functionality** - Quickly find notes by title or content
- 💾 **Auto-save** - Automatically saves your notes to local storage
- 📱 **Responsive Layout** - Works beautifully on all screen sizes
- 🎨 **Dark Mode Support** - Automatically adapts to your system preferences

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **react-markdown** - Markdown rendering
- **Local Storage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ehlalthaehpaltha-glitch/my-note-app.git
cd my-note-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Netlify

This app is configured for easy deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. The `netlify.toml` file is already configured
3. Netlify will automatically build and deploy your app

The app uses the `@netlify/plugin-nextjs` plugin for optimal Next.js support.

## Project Structure

```
note_app/
├── app/              # Next.js app directory
│   ├── globals.css   # Global styles
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Main page
├── components/       # React components
│   ├── Editor.tsx    # Markdown editor with preview
│   ├── Sidebar.tsx   # Notes list sidebar
│   └── SearchBar.tsx # Search functionality
└── netlify.toml      # Netlify configuration
```

## License

MIT
