'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  titles: string[];
  interval?: number;
}

export default function Typewriter({ titles, interval = 3000 }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout: NodeJS.Timeout;

    if (charIndex < currentTitle.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 50);
    } else if (charIndex === currentTitle.length) {
      // Finished typing current title, wait before moving to next
      timeout = setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % titles.length);
        setCharIndex(0);
        setDisplayText('');
      }, interval);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, titleIndex, titles, interval]);

  return (
    <h1 className="text-4xl md:text-6xl font-bold text-black text-left">
      <style>{`
        .typewriter-animated {
          color: var(--main-theme);
        }
        .typewriter-cursor {
          background-color: var(--main-theme);
        }
      `}</style>
      Hi.<br />
      I'm Seungyoun,<br />
      <span className="typewriter-animated">{displayText}</span>
      <span className="inline-block w-[2px] h-[1em] typewriter-cursor animate-pulse"></span>
    </h1>
  );
}
