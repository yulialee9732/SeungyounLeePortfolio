'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Typewriter from '@/components/Typewriter';
import ResumeModal from '@/components/ResumeModal';

const mockProjects = [];

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeProjectTab, setActiveProjectTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [dragStart, setDragStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const projects = [
    { 
      id: 0, 
      name: 'UT Classroom Finder', 
      logo: '/capstone/logo.png',
      duration: '09/2025 - 12/2025',
      team: 'Senior Capstone Project - Collaborated with 2 other seniors',
      description: 'Indoor navigation app for the University of Toledo that provides real-time AR directional guidance. Using augmented reality navigation, Dijkstra\'s Algorithm path finding, 3D map integration, 3D virtual coordinate mapping, this app streamlines indoor navigation, enabling users to reach their destinations quickly and efficiently.',
      technologies: ['Swift', 'Augmented Reality', 'Dijkstra\'s Algorithm', '3D Mapping', 'Virtual Coordinate System'],
      github: 'https://github.com/RyuSanghak/Capstone_',
      pdf: '/capstone/Capstone Presentation.pdf'
    },
    { 
      id: 1, 
      name: 'Project 2', 
      description: 'Coming soon!',
      content: 'Coming soon!' 
    },
    { 
      id: 2, 
      name: 'Project 3', 
      description: 'Coming soon!',
      content: 'Coming soon!' 
    },
    { 
      id: 3, 
      name: 'Project 4', 
      description: 'Coming soon!',
      content: 'Coming soon!' 
    },
    { 
      id: 4, 
      name: 'Project 5', 
      description: 'Coming soon!',
      content: 'Coming soon!' 
    },
    { 
      id: 5, 
      name: 'Project 6', 
      description: 'Coming soon!',
      content: 'Coming soon!' 
    },
  ];

  const handleTabClick = (projectId: number) => {
    setActiveProjectTab(projectId);
    setCurrentSlide(0); // Reset slide when switching projects
    const contentElement = document.getElementById('project-content');
    if (contentElement) {
      const yOffset = -140; // Account for sticky tabs height
      const y = contentElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'auto' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'notes', 'contact'];
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
        sections={['About', 'Projects', 'Notes', 'Contact']}
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

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 scroll-down-indicator">
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
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-20 px-[200px] bg-gray-50 flex items-center justify-center">
        <div className="w-full text-center">
          {/* Profile Photo Placeholder */}
          <div className="flex justify-center mb-8">
            <div className="w-48 h-48 rounded-full border-4 border-white shadow-lg overflow-hidden">
              <img 
                src="/profile.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8">About me</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            I'm a software engineer with experience in building full-stack applications for 5 years. 
            I specialize in JavaScript, TypeScript, and React. When I'm not coding, I enjoy 
            exploring new technologies like headphones and audio equipment. 
            Currently working as a server at a restaurant to gain interpersonal skills, and in my free time, I am focusing on learning 
            programming languages and frameworks to enhance my development capabilities, as well as, exploring new AI tools that can be implemented to my projects.
            Outside of web development, I am also interested in robotics and AI development.
            I'm based in Cary, North Carolina, I'm always eager to take on new challenges and contribute to exciting projects.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div className="text-left">
              <h3 className="font-bold mb-4 text-xl">Skills</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Programming Languages</h4>
                  <p className="text-gray-600">Python, Java, C, JavaScript, TypeScript</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Web Technologies</h4>
                  <p className="text-gray-600">React, HTML, CSS, Web Development</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Tools & Databases</h4>
                  <p className="text-gray-600">MySQL, GitHub, Microsoft Excel</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Technical Skills</h4>
                  <p className="text-gray-600">Embedded Systems Programming, Algorithm Design, GUI Programming, Object-Oriented Design, Event-Driven Architecture, Performance Optimization</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Soft Skills</h4>
                  <p className="text-gray-600">Problem Solving, Cross-Functional Collaboration, Technical Communication</p>
                </div>
              </div>
            </div>
            <div className="text-left">
              <h3 className="font-bold mb-4 text-xl">Education</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800">The University of Toledo</h4>
                <p className="text-gray-600">B.S. in Computer Science Engineering & Technology</p>
                <p className="text-gray-600">GPA: 3.87/4.00</p>
              </div>
              
              <h3 className="font-bold mb-4 text-xl mt-8">Work Experience</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Server</h4>
                  <p className="text-gray-600 text-sm">Ajumma Restaurant • Cary, NC</p>
                  <p className="text-gray-600 text-sm">08/2025 - Present</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Web Developer</h4>
                  <p className="text-gray-600 text-sm">KT Telecop • Remote, Seoul</p>
                  <p className="text-gray-600 text-sm">08/2020 - Present</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Technology Support Assistant</h4>
                  <p className="text-gray-600 text-sm">The University of Toledo</p>
                  <p className="text-gray-600 text-sm">08/2023 - 12/2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery Section */}
      <section id="projects" className="min-h-screen py-20 px-[200px] flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-5xl font-bold mb-16 text-center">Project Gallery</h2>
        
        <div className="relative w-full px-[200px] h-[550px] flex items-center justify-center">
          {/* Previous Button - Left Side */}
          <button
            onClick={() => setActiveProjectTab((prev) => (prev === 0 ? projects.length - 1 : prev - 1))}
            className="absolute left-0 z-20 w-12 h-12 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div 
            className="relative w-full max-w-4xl h-full flex items-center justify-center"
            style={{ perspective: '2000px' }}
            onMouseDown={(e) => {
              setIsDragging(true);
              setDragStart(e.clientX);
            }}
            onMouseMove={(e) => {
              if (isDragging) {
                const diff = e.clientX - dragStart;
                if (Math.abs(diff) > 100) {
                  if (diff > 0) {
                    setActiveProjectTab((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
                  } else {
                    setActiveProjectTab((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
                  }
                  setDragStart(e.clientX);
                }
              }
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={(e) => {
              setIsDragging(true);
              setDragStart(e.touches[0].clientX);
            }}
            onTouchMove={(e) => {
              if (isDragging) {
                const diff = e.touches[0].clientX - dragStart;
                if (Math.abs(diff) > 100) {
                  if (diff > 0) {
                    setActiveProjectTab((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
                  } else {
                    setActiveProjectTab((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
                  }
                  setDragStart(e.touches[0].clientX);
                }
              }
            }}
            onTouchEnd={() => setIsDragging(false)}
          >
          {projects.map((project, index) => {
            // Calculate position relative to active tab
            let position = index - activeProjectTab;
            
            // Wrap around to create circular loop
            if (position > projects.length / 2) {
              position -= projects.length;
            } else if (position < -projects.length / 2) {
              position += projects.length;
            }
            
            // Only show 2 cards on each side + center card
            const shouldShow = Math.abs(position) <= 2;
            
            if (!shouldShow) return null;
            
            // 3D carousel calculations
            const angle = position * -35; // Rotation angle in degrees (negative for opposite direction)
            const translateZ = position === 0 ? 0 : -200; // Push side cards back
            const zIndex = 10 - Math.abs(position); // Higher z-index for closer cards
            const opacity = position === 0 ? 1 : 0.7; // Slightly fade side cards
            
            // Height adjustments: center is taller, sides are shorter
            let height = 400; // Default for far sides (position ±2)
            if (position === 0) {
              height = 550; // Center (displaying project) - taller
            } else if (Math.abs(position) === 1) {
              height = 500; // First sides - little shorter
            } else if (Math.abs(position) === 2) {
              height = 380; // Second sides - more shorter
            }
            
            const isActive = position === 0;
            
            return (
              <div
                key={project.id}
                className="absolute w-[500px] bg-white shadow-xl transition-all duration-500 cursor-pointer select-none"
                style={{
                  height: `${height}px`,
                  transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                  transformStyle: 'preserve-3d',
                  zIndex: zIndex,
                  opacity: opacity,
                }}
                onClick={() => !isDragging && setActiveProjectTab(index)}
              >
                <div className="w-full h-full p-8 flex flex-col items-center justify-center">
                  {/* Project Icon/Image Placeholder */}
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                    {project.logo ? (
                      <img src={project.logo} alt={project.name} className="w-20 h-20 object-contain" />
                    ) : (
                      <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  
                  {isActive && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">Click to view the detail</p>
                    </div>
                  )}
                  
                  {/* Project Title */}
                  <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                  
                  {/* Programming Languages */}
                  {project.technologies && (
                    <p className="text-sm text-gray-600 mb-4">
                      {project.technologies.slice(0, 3).join(', ')}
                    </p>
                  )}
                  
                  {/* Description */}
                  {project.description && (
                    <p className="text-sm text-gray-600 text-center line-clamp-3">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          </div>

          {/* Next Button - Right Side */}
          <button
            onClick={() => setActiveProjectTab((prev) => (prev === projects.length - 1 ? 0 : prev + 1))}
            className="absolute right-0 z-20 w-12 h-12 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Page Indicators */}
        <div className="flex gap-2 mt-8 justify-center">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveProjectTab(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeProjectTab
                  ? 'bg-gray-800 w-8'
                  : 'bg-gray-400 w-2'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Study Notes Section */}
      <section id="notes" className="min-h-screen py-20 px-[200px] flex items-center justify-center bg-gray-50">
        <div className="w-full">
          <h2 className="text-5xl font-bold mb-4 text-center">My study notes</h2>
          <p className="text-sm text-gray-600 text-center mb-12">You will be directed to my notes on Notion. Have fun :)</p>
          <div className="flex flex-wrap gap-x-9 gap-y-9 justify-center max-w-[900px] mx-auto">
            {/* Subject 1 - JavaScript */}
            <a
              href="https://rain-kangaroo-4d5.notion.site/Subject-1-JS-2a96a245aebc805fbca7f1cb1bbfbab9?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="book-container">
                {/* Page 1 (bottom) */}
                <div className="book-page"></div>
                {/* Page 2 (middle) */}
                <div className="book-page book-page-2"></div>
                {/* Book Cover (top) */}
                <div
                  className="book-cover overflow-hidden"
                  style={{
                    background: '#fff0bdff',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <div className="flex-1 flex items-center justify-center">
                      <img 
                        src="/js.png"
                        alt="JavaScript"
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold text-center text-black">JavaScript</h3>
            </a>

            {/* Subject 2 - TypeScript */}
            <a
              href="https://rain-kangaroo-4d5.notion.site/TypeScript-2a96a245aebc8063b179e096984b1e70?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="book-container">
                <div className="book-page"></div>
                <div className="book-page book-page-2"></div>
                <div
                  className="book-cover overflow-hidden"
                  style={{
                    background: '#bfe4ffff',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <div className="flex-1 flex items-center justify-center">
                      <img 
                        src="/typescript.png"
                        alt="TypeScript"
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold text-center text-black">TypeScript</h3>
            </a>

            {/* Subject 3 - Python */}
            <a
              href="https://rain-kangaroo-4d5.notion.site/Python-2a96a245aebc80fca8c1fc16251e7f18"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="book-container">
                <div className="book-page"></div>
                <div className="book-page book-page-2"></div>
                <div
                  className="book-cover overflow-hidden"
                  style={{
                    background: '#7da6e9ff',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <div className="flex-1 flex items-center justify-center">
                      <img 
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 255'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='12.959%25' y1='12.039%25' x2='79.639%25' y2='78.201%25'%3E%3Cstop offset='0%25' stop-color='%23387EB8'/%3E%3Cstop offset='100%25' stop-color='%23366994'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='19.128%25' y1='20.579%25' x2='90.742%25' y2='88.429%25'%3E%3Cstop offset='0%25' stop-color='%23FFE052'/%3E%3Cstop offset='100%25' stop-color='%23FFC331'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23a)' d='M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z'/%3E%3Cpath fill='url(%23b)' d='M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z'/%3E%3C/svg%3E"
                        alt="Python"
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold text-center text-black">Python</h3>
            </a>

            {/* Subject 4 - C++ */}
            <a
              href="https://rain-kangaroo-4d5.notion.site/C-2a96a245aebc8077a799cd4e1bb3e0c2?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="book-container">
                <div className="book-page"></div>
                <div className="book-page book-page-2"></div>
                <div
                  className="book-cover overflow-hidden"
                  style={{
                    background: '#7cc1e9ff',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <div className="flex-1 flex items-center justify-center">
                      <img 
                        src="/c-.png"
                        alt="C++"
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold text-center text-black">C++</h3>
            </a>

            {/* Subject 5 - React */}
            <a
              href="https://rain-kangaroo-4d5.notion.site/React-2a96a245aebc80eaa473f6e898e5f8b4?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="book-container">
                <div className="book-page"></div>
                <div className="book-page book-page-2"></div>
                <div
                  className="book-cover overflow-hidden"
                  style={{
                    background: '#788182ff',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <div className="flex-1 flex items-center justify-center">
                      <img 
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-11.5 -10.23174 23 20.46348'%3E%3Ccircle r='2.05' fill='%2361dafb'/%3E%3Cg stroke='%2361dafb' fill='none'%3E%3Cellipse rx='11' ry='4.2'/%3E%3Cellipse rx='11' ry='4.2' transform='rotate(60)'/%3E%3Cellipse rx='11' ry='4.2' transform='rotate(120)'/%3E%3C/g%3E%3C/svg%3E"
                        alt="React"
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold text-center text-black">React</h3>
            </a>

            {/* Subject 6 - Angular */}
            <a
              href="https://rain-kangaroo-4d5.notion.site/Angular-2a96a245aebc80079d06dc108f6dc93d?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="book-container">
                <div className="book-page"></div>
                <div className="book-page book-page-2"></div>
                <div
                  className="book-cover overflow-hidden"
                  style={{
                    background: '#f5acb7ff',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <div className="flex-1 flex items-center justify-center">
                      <img 
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 272'%3E%3Cpath fill='%23DD0031' d='M.1 45.522L125.908.697l129.196 44.028-20.919 166.45-108.277 59.966-106.583-59.169L.1 45.522z'/%3E%3Cpath fill='%23C3002F' d='M255.104 44.725L125.908.697v270.444l108.277-59.866 20.919-166.55z'/%3E%3Cpath fill='%23FFF' d='M126.107 32.274L47.714 206.693l29.285-.498 15.739-39.347h70.325l17.233 39.845 27.99.498-82.179-174.917zm.2 55.882l26.496 55.383h-49.806l23.31-55.383z'/%3E%3C/svg%3E"
                        alt="Angular"
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold text-center text-black">Angular</h3>
            </a>

            {/* Subject 7 - Node.js */}
            <a
              href="https://rain-kangaroo-4d5.notion.site/Node-js-2a96a245aebc8068a8c1f63264a67104?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="book-container">
                <div className="book-page"></div>
                <div className="book-page book-page-2"></div>
                <div
                  className="book-cover overflow-hidden"
                  style={{
                    background: '#ace7b1ff',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <div className="flex-1 flex items-center justify-center">
                      <img 
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 289'%3E%3Cpath fill='%2368A063' d='M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.156.796-.53 1.856-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915l-105.74-60.953c-1.06-.53-2.385-.53-3.18 0L20.405 80.166c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.636 7.95 25.44-1.325 25.44-10.6V93.68c0-1.59 1.326-3.18 3.181-3.18h13.516c1.59 0 3.18 1.326 3.18 3.18v120.58c0 20.936-11.396 33.126-31.272 33.126-6.095 0-10.865 0-24.38-6.625l-27.827-15.9C4.24 220.885 0 213.465 0 205.515V83.346C0 75.396 4.24 67.976 11.13 64L116.87 2.783c6.625-3.71 15.635-3.71 22.26 0L244.87 64C251.76 67.975 256 75.395 256 83.346v122.17c0 7.95-4.24 15.37-11.13 19.345L139.13 286.08c-3.445 1.59-7.42 2.385-11.13 2.385zm32.596-84.009c-46.377 0-55.917-21.2-55.917-39.221 0-1.59 1.325-3.18 3.18-3.18h13.78c1.59 0 2.916 1.06 2.916 2.65 2.12 14.045 8.215 20.936 36.306 20.936 22.26 0 31.802-5.035 31.802-16.96 0-6.891-2.65-11.926-37.367-15.372-28.887-2.915-46.907-9.275-46.907-32.33 0-21.467 18.02-34.187 48.232-34.187 33.921 0 50.617 11.66 52.737 37.101 0 .795-.265 1.59-.795 2.385-.53.53-1.325 1.06-2.12 1.06h-13.78c-1.326 0-2.65-1.06-2.916-2.385-3.18-14.575-11.395-19.345-33.126-19.345-24.38 0-27.296 8.48-27.296 14.84 0 7.686 3.445 10.07 36.306 14.31 32.597 4.24 47.967 10.336 47.967 33.127-.265 23.321-19.345 36.571-53.002 36.571z'/%3E%3C/svg%3E"
                        alt="Node.js"
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold text-center text-black">Node.js</h3>
            </a>

            {/* Coming Soon subjects - 5 more to make 12 total (2 rows of 6) */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i + 8}
                className="flex flex-col items-center gap-3"
              >
                <div className="book-container">
                  <div className="book-page"></div>
                  <div className="book-page book-page-2"></div>
                  <div className="book-cover overflow-hidden bg-gray-200 flex items-center justify-center">
                    <p className="text-xs font-medium text-gray-400">Coming Soon</p>
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/10"></div>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-center text-black invisible">Placeholder</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 px-[200px] bg-gray-50 flex items-center justify-center">
        <div className="w-full flex items-center justify-between gap-16">
          {/* Left side - Floating illustration */}
          <div className="flex-1 flex justify-center">
            <img 
              src="/contactme.png" 
              alt="Contact illustration" 
              className="w-full h-auto max-w-sm animate-float"
            />
          </div>
          
          {/* Right side - Contact content */}
          <div className="flex-1">
            <h2 className="text-5xl font-bold mb-8">Contact me!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Feel free to reach out for collaborations or just a friendly hello!
            </p>
            
            {/* Contact Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 mb-8">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition disabled:opacity-50"
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus === 'success' && (
                <p className="text-green-600 text-center">Message sent successfully!</p>
              )}
              {formStatus === 'error' && (
                <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
              )}
            </form>

            {/* Email Contact */}
            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-3">Or email me directly:</p>
              <a href="mailto:leeyulia150@gmail.com" className="flex items-center gap-2 text-gray-800 hover:text-black transition">
                <i className="fas fa-envelope text-xl"></i>
                <span className="text-base">leeyulia150@gmail.com</span>
              </a>
            </div>
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
    </main>
  );
}
