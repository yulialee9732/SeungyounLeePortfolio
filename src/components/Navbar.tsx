'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  sections: string[];
  onResumeClick: () => void;
  activeSection: string;
}

export default function Navbar({ sections, onResumeClick, activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Determine background based on active section
  const isHomeSection = activeSection === 'home';
  const navBgClass = isHomeSection 
    ? 'bg-transparent backdrop-blur-sm' 
    : 'bg-white backdrop-blur-sm';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 ${navBgClass} transition-colors duration-300`}>
      <div className="px-[200px]">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation Links - Desktop */}
          <div className="hidden md:flex gap-4 items-center">
            <button
              onClick={() => handleScroll('home')}
              className="flex-shrink-0 font-bold text-2xl cursor-pointer hover:opacity-75 transition"
            >
              SL
            </button>
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleScroll(section.toLowerCase())}
                className={`nav-link text-sm font-medium transition-colors ${
                  activeSection === section.toLowerCase()
                    ? 'active text-black'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Social Links & Resume */}
          <div className="hidden md:flex gap-4 items-center">
            <Link href="https://github.com/yulialee9732" target="_blank" className="text-black hover:text-gray-600 transition">
              <i className="fab fa-github text-2xl"></i>
            </Link>
            <Link href="https://www.linkedin.com/in/leeseung217" target="_blank" className="text-black hover:text-gray-600 transition">
              <i className="fab fa-linkedin text-2xl"></i>
            </Link>
            <Link href="https://www.instagram.com/dlyulya/" target="_blank" className="text-black hover:text-gray-600 transition">
              <i className="fab fa-instagram text-2xl"></i>
            </Link>
            <Link href="mailto:leeyulia150@gmail.com" className="text-black hover:text-gray-600 transition">
              <i className="fas fa-envelope text-2xl"></i>
            </Link>
            <button
              onClick={onResumeClick}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Resume
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleScroll(section.toLowerCase())}
                className="block w-full text-left px-2 py-2 text-sm text-gray-600 hover:text-black transition"
              >
                {section}
              </button>
            ))}
            <div className="flex gap-2 px-2 py-2 text-sm">
              <Link href="https://github.com/yulialee9732" target="_blank" className="nav-social-icon transition">
                <i className="fi fi-brands-github text-lg"></i>
              </Link>
              <Link href="https://www.linkedin.com/in/leeseung217" target="_blank" className="nav-social-icon transition">
                <i className="fab fa-linkedin text-lg"></i>
              </Link>
              <Link href="https://www.instagram.com/dlyulya/" target="_blank" className="nav-social-icon transition">
                <i className="fi fi-brands-instagram text-lg"></i>
              </Link>
              <Link href="mailto:leeyulia150@gmail.com" className="nav-social-icon transition">
                <i className="fas fa-envelope text-lg"></i>
              </Link>
            </div>
            <button
              onClick={onResumeClick}
              className="block w-full px-2 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition"
            >
              Resume
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
