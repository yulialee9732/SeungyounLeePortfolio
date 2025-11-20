'use client';

import { motion } from 'framer-motion';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    name: string;
    description: string;
    technologies: string[];
    github?: string;
  } | null;
}

export default function ProjectDetailModal({ isOpen, onClose, project }: ProjectDetailModalProps) {
  if (!isOpen || !project) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl z-50 w-11/12 md:w-3/4 max-h-[80vh] overflow-auto p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          ✕
        </button>

        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
        <p className="text-gray-600 mb-4">{project.description}</p>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Technologies:</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          View on GitHub →
        </a>
      </motion.div>
    </>
  );
}
