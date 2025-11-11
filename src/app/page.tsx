'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Typewriter from '@/components/Typewriter';
import ProjectGallery from '@/components/ProjectGallery';
import ResumeModal from '@/components/ResumeModal';
import ProjectDetailModal from '@/components/ProjectDetailModal';

const mockProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB.',
    image: 'https://via.placeholder.com/600x400?text=E-Commerce+Platform',
    github: 'https://github.com',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  },
  {
    id: 2,
    title: 'AI Chat Application',
    description: 'Real-time chat application with AI integration using OpenAI API.',
    image: 'https://via.placeholder.com/600x400?text=AI+Chat+App',
    github: 'https://github.com',
    tags: ['Next.js', 'OpenAI', 'Socket.io', 'PostgreSQL'],
  },
  {
    id: 3,
    title: 'Task Management Tool',
    description: 'Collaborative task management tool with real-time updates.',
    image: 'https://via.placeholder.com/600x400?text=Task+Manager',
    github: 'https://github.com',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
  },
];

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'experience', 'notes', 'contact'];
      let current = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 100) {
          current = section;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-white text-black">
      <Navbar
        sections={['About', 'Projects', 'Experience', 'Notes', 'Contact']}
        onResumeClick={() => setResumeOpen(true)}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-between px-[200px] pb-12 pt-20"
        style={{
          background: 'linear-gradient(135deg, #fcdacaff 0%, #fac2d2ff 25%, #E8D5F2 50%, #afd1eaff 75%, #E0F4D9 100%)'
        }}
      >
        <div className="flex flex-1 items-center justify-between w-full gap-12">
          <div className="flex flex-col items-start justify-center flex-1">
          <Typewriter
            titles={['a robotics engineer', 'a full-stack developer', 'a software engineer']}
            interval={3000}
          />
          <p className="mt-8 text-gray-600 text-lg md:text-xl">
            Crafting solutions to complex problems.
          </p>
          <div className="mt-12 flex gap-6">
            <button className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition">
              View My Work
            </button>
            <button className="px-6 py-3 border-2 border-black text-black rounded hover:bg-black hover:text-white transition">
              Get in Touch
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <img
            src="/designme.png"
            alt="Profile illustration"
            className="w-full h-auto max-w-sm"
          />
        </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 scroll-down-indicator z-20">
        <p className="text-sm text-gray-600">Scroll to explore</p>
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* About Section */}
      <section id="about" className="min-h-screen py-20 px-[200px] bg-gray-50 flex items-center justify-center">
        <div className="w-full text-center">
          <h2 className="text-5xl font-bold mb-8">About me</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            I'm a passionate software engineer with experience in building full-stack applications. 
            I specialize in React, Node.js, and cloud technologies. When I'm not coding, I enjoy 
            exploring new technologies and contributing to open-source projects.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="font-bold mb-2">Skills</h3>
              <p className="text-gray-600">React, Next.js, TypeScript, Node.js, Python, MongoDB</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Experience</h3>
              <p className="text-gray-600">5+ years in full-stack development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 px-[200px] flex items-center justify-center">
        <div className="w-full">
          <h2 className="text-5xl font-bold mb-12 text-center">Projects</h2>
          <ProjectGallery
            projects={mockProjects}
            onProjectClick={setSelectedProject}
          />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen py-20 px-[200px] bg-gray-50 flex items-center justify-center">
        <div className="w-full text-center">
          <h2 className="text-5xl font-bold mb-12">Experience</h2>
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="border-l-4 border-black pl-6 py-2 text-left">
              <h3 className="text-2xl font-bold">Senior Developer</h3>
              <p className="text-gray-600">Tech Company • 2022 - Present</p>
              <p className="mt-2 text-gray-700">Leading development of core platform features</p>
            </div>
            <div className="border-l-4 border-gray-300 pl-6 py-2 text-left">
              <h3 className="text-2xl font-bold">Full-Stack Developer</h3>
              <p className="text-gray-600">Startup • 2020 - 2022</p>
              <p className="mt-2 text-gray-700">Built and maintained multiple applications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Study Notes Section */}
      <section id="notes" className="min-h-screen py-20 px-[200px] flex items-center justify-center">
        <div className="w-full">
          <h2 className="text-5xl font-bold mb-12 text-center">My study notes!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 h-48 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition"
              >
                <span className="text-gray-400">Subject {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 px-[200px] bg-gray-50 flex items-center justify-center">
        <div className="w-full text-center">
          <h2 className="text-5xl font-bold mb-8">Contact me!</h2>
          <p className="text-lg text-gray-600 mb-12">
            Feel free to reach out for collaborations or just a friendly hello!
          </p>
          <div className="flex justify-center gap-6">
            <a href="mailto:your@email.com" className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition">
              Email
            </a>
            <a href="https://linkedin.com" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              LinkedIn
            </a>
            <a href="https://github.com" className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-black transition">
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        resumeImage="/seungyounLeeResume.png"
        resumePdf="/seungyounLeeResume.pdf"
      />
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
