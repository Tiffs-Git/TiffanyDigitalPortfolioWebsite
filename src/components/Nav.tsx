import { useState, useEffect } from 'react';
import { Menu, X, FileText, Linkedin, Github } from 'lucide-react';

// TODO: Replace placeholders with real URLs before pushing to GitHub
const RESUME_URL = '/resume.pdf'; // drop your resume PDF into the public/ folder
const LINKEDIN_URL = 'https://www.linkedin.com/in/tiffany-castro-00679a1a1';
const GITHUB_URL = 'https://github.com/TiffOnTour83';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-900/95 backdrop-blur-md border-b border-teal-800/40 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#top"
          className="font-display text-lg text-gold-300 tracking-wider hover:text-gold-200 transition-colors"
        >
          TC
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 nav-link"
          >
            <FileText size={14} />
            Resume
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 nav-link"
          >
            <Linkedin size={14} />
            LinkedIn
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 nav-link"
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href="#contact"
            className="ml-2 px-5 py-2 border border-gold-500 text-gold-300 text-sm tracking-widest uppercase font-medium rounded hover:bg-gold-500/10 transition-all duration-200"
          >
            Let's Connect
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-warm-200 hover:text-gold-300 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-teal-800/30 px-6 py-6 flex flex-col gap-5">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 nav-link text-base"
            onClick={() => setMenuOpen(false)}
          >
            <FileText size={14} />
            Resume
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 nav-link text-base"
            onClick={() => setMenuOpen(false)}
          >
            <Linkedin size={14} />
            LinkedIn
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 nav-link text-base"
            onClick={() => setMenuOpen(false)}
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href="#contact"
            className="inline-block mt-2 px-5 py-2 border border-gold-500 text-gold-300 text-sm tracking-widest uppercase font-medium rounded text-center hover:bg-gold-500/10 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Let's Connect
          </a>
        </div>
      )}
    </nav>
  );
}
