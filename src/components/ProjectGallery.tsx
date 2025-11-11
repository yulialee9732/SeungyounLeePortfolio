'use client';

import { useState, useRef, useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
  tags: string[];
}

interface ProjectGalleryProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export default function ProjectGallery({ projects, onProjectClick }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = dragStart - clientX;

    if (diff > 50) {
      // Swiped left, go to next
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    } else if (diff < -50) {
      // Swiped right, go to previous
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }

    setIsDragging(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      const itemWidth = containerRef.current.children[0]?.clientWidth || 0;
      containerRef.current.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  return (
    <div className="w-full">
      {/* Gallery */}
      <div
        ref={containerRef}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 pb-4"
        style={{
          scrollBehavior: 'smooth',
          userSelect: 'none',
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-full md:w-2/3 snap-center cursor-pointer group"
            onClick={() => onProjectClick(project)}
          >
            <div className="bg-gray-200 rounded-lg overflow-hidden h-96 relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <p className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-black w-8'
                : 'bg-gray-400 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
