# Portfolio

This is a portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- **Animated Hero Section**: Typewriter effect that cycles through different titles every 5 seconds
- **Navigation Bar**: Fixed navbar with smooth scrolling to different sections and social media links
- **Resume Modal**: Click to view/download/print your resume with zoom in/out functionality
- **Project Gallery**: Swipe-enabled gallery with snap scrolling to browse projects
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Smooth Animations**: Uses Framer Motion for smooth transitions and animations

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Navbar.tsx        # Navigation component
│   ├── Typewriter.tsx    # Typewriter effect component
│   ├── ProjectGallery.tsx # Project gallery with swipe
│   ├── ResumeModal.tsx   # Resume modal with zoom
│   └── ProjectDetailModal.tsx # Project detail modal
```

## Customization

### Update Resume Image
Replace the placeholder resume image URL in `src/app/page.tsx`:

```typescript
<ResumeModal
  isOpen={resumeOpen}
  onClose={() => setResumeOpen(false)}
  resumeImage="your-resume-url-here"
/>
```

### Update Projects
Edit the `mockProjects` array in `src/app/page.tsx` with your actual projects.

### Update Social Links
Update the social media links in `src/components/Navbar.tsx`.

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React** - UI library

## License

# SeungyounLeePortfolio
# SeungyounLeePortfolio
# SeungyounLeePortfolio
# SeungyounLeePortfolio
