import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faDatabase,
  faCode,
  faUpRightFromSquare,
  faPaperPlane,
  faBars,
  faXmark,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedin,
  faSquareGithub,
} from '@fortawesome/free-brands-svg-icons';
import './App.styles.css';

// ─── Data ────────────────────────────────────────────────────────────
const skills = [
  {
    icon: faCheck,
    title: 'Open Source Development',
    description:
      'Worked on collaborative projects on sites such as CodeTriage ranging from web applications to systems programming scripts.',
  },
  {
    icon: faDatabase,
    title: 'Backend Security & Testing',
    description:
      'Experience with symmetric and asymmetric encryption, as well as knowledge of multiple backend APIs.',
  },
  {
    icon: faCode,
    title: 'Web Design',
    description:
      'Experience designing, developing, and implementing websites using modern frameworks like React and TypeScript.',
  },
];

const projects = [
  {
    image: '/images/secure.jpeg',
    title: 'User Login Credential Encryption Engine',
    description:
      'MYLogin is a lightweight security utility written in Python for convenient storage and retrieval of login information with multi-layered encryption.',
    link: 'https://github.com/matesuu/MYLogin',
  },
  {
    image: '/images/matrix.png',
    title: 'Math Library for Matrices and Linear Algebra',
    description:
      'A portable and compact math library written in C/C++ for working with matrices and numerical algorithms.',
    link: 'https://github.com/matesuu/MANA',
  },
  {
    image: '/images/git.png',
    title: 'Git Workflow Automation Tool',
    description: 'An automation tool for Git workflows and GitHub written in C and Bash.',
    link: 'https://github.com/matesuu/autogit',
  },
  {
    image: '/images/flashcards.png',
    title: 'Real-Time Learning Application',
    description:
      'A robust Java app that curates user-generated content and study sets to accommodate personalized learning pathways.',
    link: 'https://github.com/matesuu/CogniStudy',
  },
];

type TabId = 'skills' | 'experience' | 'education';

const tabData: Record<TabId, { label: string; items: { span: string; text: string }[] }> = {
  skills: {
    label: 'Skills',
    items: [
      { span: 'Programming Languages', text: 'Python, C/C++, Java, Go, TypeScript, JavaScript, SQL' },
      { span: 'ML and AI Systems', text: 'PyTorch, RAG, GraphRAG, Multithreading' },
      { span: 'Backend and Database', text: 'Node.js, Flask, Django, REST APIs, Docker, AWS, MongoDB' },
      { span: 'Frontend', text: 'React, React Native, Tailwind' },
      { span: 'Developer Tools', text: 'Git, GitHub, GitLab' },
    ],
  },
  experience: {
    label: 'Experience',
    items: [
      { span: 'Jan 2026 – Present', text: 'Machine Learning Research Intern at California State University, East Bay' },
      { span: 'Sep 2025 – Present', text: 'Lead Program Mentor at MESA CSU East Bay' },
      { span: 'Aug 2025 – Present', text: 'Teaching Assistant at California State University, East Bay' },
      { span: 'Aug 2024 – Present', text: 'Freelance Software Engineer' },
    ],
  },
  education: {
    label: 'Education',
    items: [
      { span: 'December 2026', text: 'B.S. Computer Science – California State University, East Bay' },
      { span: 'June 2024', text: 'A.S. Computer Science – Chabot College' },
    ],
  },
};

// ─── Components ──────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#hero" className="navbar__logo">
        <span>m</span>ateo
      </a>
      <button className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
      </button>
      <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        {['hero', 'projects', 'about', 'contact'].map((id) => (
          <li key={id}>
            <a href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {id === 'hero' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg" />
      <div className="hero__content">
        <p className="hero__label">Open Source Software Engineer</p>
        <h1 className="hero__title">
          Hi, I'm <span className="accent">Mateo</span>.
          <br />I Study Computer Science at
          <br />
          <span className="accent">Cal State East Bay</span>
        </h1>
        <a href="#projects" className="hero__scroll">
          <FontAwesomeIcon icon={faArrowDown} />
        </a>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills-section" className="section">
      <div className="container">
        <h2 className="section__title">Skills</h2>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div key={i} className="skill-card">
              <FontAwesomeIcon icon={s.icon} className="skill-card__icon" />
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section__title">My Work</h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <a
              key={i}
              className="project-card"
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="project-card__img-wrap">
                <img src={p.image} alt={p.title} />
              </div>
              <div className="project-card__body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="project-card__link">
                  View Project <FontAwesomeIcon icon={faUpRightFromSquare} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const [activeTab, setActiveTab] = useState<TabId>('skills');

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about__image">
            <img src="/images/headshot.jpeg" alt="Mateo Alado" />
          </div>
          <div className="about__text">
            <h2 className="section__title">About Me</h2>
            <p>
              🚀 Hi there! My name is Mateo Alado.
            </p>
            <p>
              As a highly driven fourth-year studying Computer Science at Cal State East Bay, I am
              deeply passionate about the rapidly evolving world of Artificial Intelligence and
              Software Engineering.
            </p>
            <p>
              My completed coursework includes Data Structures and Algorithms, Object Oriented
              Design, Operating Systems, and Computer Networking. I aspire to break into the AI and
              Web Development sphere as a software engineer and develop innovative solutions to
              real-world problems.
            </p>

            <div className="tabs">
              {(Object.keys(tabData) as TabId[]).map((id) => (
                <button
                  key={id}
                  className={`tabs__btn ${activeTab === id ? 'tabs__btn--active' : ''}`}
                  onClick={() => setActiveTab(id)}
                >
                  {tabData[id].label}
                </button>
              ))}
            </div>

            <ul className="tab-list">
              {tabData[activeTab].items.map((item, i) => (
                <li key={i}>
                  <span className="tab-list__label">{item.span}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Thanks for reaching out! I will get back to you soon.');
    formRef.current?.reset();
    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact__info">
            <h2 className="section__title">Get In Touch</h2>
            <p className="contact__email">
              <FontAwesomeIcon icon={faPaperPlane} className="accent" /> aladomateo@gmail.com
            </p>
            <div className="contact__socials">
              <a href="https://www.linkedin.com/in/mateoalado/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://github.com/matesuu" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faSquareGithub} />
              </a>
            </div>
          </div>
          <form ref={formRef} className="contact__form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea rows={6} placeholder="Your Message" required />
            <div className="contact__actions">
              <button type="submit" className="btn btn--filled">Send Message</button>
              <a href="/images/Mateo Alado - Resume.pdf" download className="btn btn--outline">
                Download Resume
              </a>
            </div>
            {status && <p className="contact__status">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Mateo Alado. Built with React & TypeScript.</p>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
