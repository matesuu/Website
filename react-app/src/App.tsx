import { useState, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLocationDot,
  faFileLines,
  faChevronDown,
  faBook,
  faPaperPlane,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedin,
  faGithub,
  faPython,
  faReact,
} from '@fortawesome/free-brands-svg-icons';
import './App.styles.css';

// ─── Types ───────────────────────────────────────────────────

type PageId = 'about' | 'resume' | 'projects' | 'achievements' | 'contact';

// ─── Data ────────────────────────────────────────────────────

const pages: { id: PageId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

const services = [
  {
    icon: faPython,
    title: 'Machine Learning Research',
    text: 'Developing methods for optimizing long-context tokenization strategies for LLMs, and designing efficient RAG/GraphRAG-based agent architectures for practical applications.',
  },
  {
    icon: faReact,
    title: 'Full-Stack AI Application Development',
    text: 'Creating modern, scalable web applications using TypeScript, React, and Node.js, and Python with a focus on integrating AI technologies with web frameworks for seamless UI/UX.',
  },
];

const education = [
  {
    degree: 'B.S. Computer Science',
    school: 'California State University, East Bay',
    gpa: '',
    dates: 'December 2026',
    coursework:
      'Advanced Data Structures and Algorithms, Computer Architecture, Operating Systems, Computer Networks, Machine Learning.',
  },
  {
    degree: 'A.S. Computer Science',
    school: 'Chabot College',
    gpa: '',
    dates: 'June 2024',
    coursework: 'Intro to CS, Calculus, Linear Algebra, Physics.',
  },
];

const experienceList = [
  {
    role: 'Machine Learning Research Intern',
    company: 'California State University, East Bay',
    dates: 'Jan 2026 — Present',
    bullets: [
      '• Designed and optimized long-context tokenization strategies for 128k-256k token LLM inputs, addressing scalability bottlenecks in extended context windows.',
      '• Engineered and implemented a GraphRAG-based agent architecture, reducing token usage by approximately 90% and achieving 2× lower inference latency on long-document QA benchmarks compared to baseline GPT-4o inference.',
    ],
  },
  {
    role: 'Teaching Assistant',
    company: 'California State University, East Bay',
    dates: 'January 2025 — December 2025',
    bullets: [
      '• Organized instructional sessions for 50+ students in Data Structures and Algorithms courses at California State University, East Bay.',
      '• Developed study materials and facilitating workshops on data structures resulting in a ~20% increase in overall class performance comapared to the previous semester.',
    ],
  },
  {
    role: 'Lead Program Mentor',
    company: 'CSU East Bay MESA',
    dates: 'January 2025 — December 2025',
    bullets: [
      '• Mentored a cohort of 4 Computer Science students, providing guidance on academic and career development in STEM fields.',
      '• Incrased student engagement and rentention by organizing workshops, coding sessions, and 1-on-1 mentoring, resulting in a 30% increase in student participation in MESA activities.',
    ],
  },
  {
    role: 'Open Source Contributor',
    company: 'Self-Employed',
    dates: 'August 2024 — Jan 2026',
    bullets: [
      '• Improved performance of Python and TypeScript backend systems by optimizing async I/O, request handling, and query patterns across 5 repositories.',
      '• Optimized development workflows and code integration processes reducing overall development cycle time by ~10%.',
    ],
  },
];

const skills = [
  { label: 'Languages', text: 'Python, C/C++, Java, TypeScript, SQL' },
  { label: 'ML & AI', text: 'PyTorch, RAG/GraphRAG, Long-Context Optimization (128k-256k)' },
  { label: 'Backend', text: 'Node.js, Flask, REST APIs, Distributed Systems, Cloudflare Workers' },
  { label: 'Database', text: 'PostgreSQL, MongoDB, Cloudflare D1' },
  { label: 'Tools', text: 'Docker, AWS, Git'},
];

const projectCategories = ['all', 'ai / ml', 'software', 'tools'] as const;
type Category = (typeof projectCategories)[number];

const projects = [
  {
    image: '/images/perplx.png',
    title: 'perplx - The Perplexity Coding Agent',
    category: 'ai / ml' as Category,
    tech: 'TypeScript, Web Workers, Cloudflare D1, Perplexity Agent API',
    link: 'https://perplx.net/',
  },
  {
    image: '/images/mylogin.png',
    title: 'Secure Authentication Encryption Serivce',
    category: 'software' as Category,
    tech: 'Python, Fernet, Symmetric Encryption, Crytography, CLI',
    link: 'https://github.com/matesuu/MYLogin',
  },
  {
    image: '/images/autogit.png',
    title: 'Git Automation Workflow Tool',
    category: 'tools' as Category,
    tech: 'C, Bash, Git Automation, Process Control, Embedded Systems',
    link: 'https://github.com/matesuu/autogit',
  },
  {
    image: '/images/CogniStudy.png',
    title: 'Real Time Learning Application',
    category: 'software' as Category,
    tech: 'Java, Socket Programming, UI Design, Software Engineering, Software Architecture',
    link: 'https://github.com/matesuu/CogniStudy',
  },
  {
    image: '/images/matrix.png',
    title: 'Math Library for Matrices',
    category: 'software' as Category,
    tech: 'C/C++, Linear Algebra, Numerical Methods',
    link: 'https://github.com/matesuu/MANA',
  },
];

const achievements = [
  {
    image: '/images/hackhayward.jpeg',
    category: 'HackHayward 2026',
    date: '2026',
    title: 'Winner for Best Use of Perplexity API',
    text: 'Awarded a recognition for innovative use of the Perplexity API in a coding agent project, demonstrating creativity and technical skill',
  },
  {
    image: '/images/mesa.png',
    category: 'MESA CSU East Bay',
    date: '2025',
    title: 'Lead Program Mentor',
    text: 'Selected as lead mentor for the MESA program, supporting STEM students through workshops and 1-on-1 mentoring.',
  },
];

// ─── Sidebar ─────────────────────────────────────────────────

function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className={`sidebar ${expanded ? 'sidebar--active' : ''}`}>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src="/images/headshot.jpeg" alt="Mateo Alado" />
        </figure>

        <div className="info-content">
          <h1 className="name">Mateo Alado</h1>
          <p className="title">Machine Learning Engineer</p>
        </div>

        <button className="info-more-btn" onClick={() => setExpanded(!expanded)}>
          <span>Show Contacts</span>
          <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />
        </button>
      </div>

      <div className="sidebar-info-more">
        <div className="separator" />

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <FontAwesomeIcon icon={faFileLines} />
            </div>
            <div className="contact-info">
              <p className="contact-title">Resume</p>
              <a href="/images/Mateo Alado - Resume.pdf" className="contact-link" target="_blank" rel="noopener noreferrer">
                Download
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href="mailto:aladomateo@gmail.com" className="contact-link">
                aladomateo@gmail.com
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>San Francisco Bay Area, CA</address>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
            <div className="contact-info">
              <p className="contact-title">LinkedIn</p>
              <a href="https://www.linkedin.com/in/mateoalado/" className="contact-link" target="_blank" rel="noopener noreferrer">
                mateoalado
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <FontAwesomeIcon icon={faGithub} />
            </div>
            <div className="contact-info">
              <p className="contact-title">GitHub</p>
              <a href="https://github.com/matesuu" className="contact-link" target="_blank" rel="noopener noreferrer">
                matesuu
              </a>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}

// ─── Navbar ──────────────────────────────────────────────────

function Navbar({
  activePage,
  onNavigate,
}: {
  activePage: PageId;
  onNavigate: (id: PageId) => void;
}) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {pages.map((p) => (
          <li className="navbar-item" key={p.id}>
            <button
              className={`navbar-link ${activePage === p.id ? 'navbar-link--active' : ''}`}
              onClick={() => onNavigate(p.id)}
            >
              {p.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── About Page ──────────────────────────────────────────────

function AboutPage() {
  return (
    <article className="article article--active">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text">
        <p>
          I'm a Computer Science student at California State University – East Bay, specializing in
          Machine Learning, AI, and scalable software systems. With a strong foundation in algorithms,
          web development, and ML frameworks/concepts, I turn bold ideas into functional and innovative technologies.
        </p>
        <p>
          My toolkit includes Python, C/C++, Java, TypeScript, React, and leading ML frameworks
          like PyTorch and RAG. I've built everything from encryption utilities to math libraries, always
          focusing on performance, usability, and innovation.
        </p>
      </section>

      <section className="service">
        <h3 className="h3 service-title">What I'm doing</h3>
        <ul className="service-list">
          {services.map((s, i) => (
            <li className="service-item" key={i}>
              <div className="service-icon-box">
                <span className="service-icon">
                  <FontAwesomeIcon icon={s.icon} />
                </span>
              </div>
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{s.title}</h4>
                <p className="service-item-text">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

// ─── Resume Page ─────────────────────────────────────────────

function ResumePage() {
  return (
    <article className="article article--active">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      {/* Education */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <FontAwesomeIcon icon={faBook} />
          </div>
          <h3 className="h3">Education</h3>
        </div>

        <ol className="timeline-list">
          {education.map((e, i) => (
            <li className="timeline-item" key={i}>
              <h4 className="h4 timeline-item-title place">{e.degree}</h4>
              <h4 className="h4 timeline-item-title place1">
                <em>{e.school}</em>
              </h4>
              {e.gpa && <span className="duration-gpa">{e.gpa}</span>}
              <span className="duration-gpa">{e.dates}</span>
              <p className="timeline-text">
                <strong>Relevant Coursework: </strong>
                {e.coursework}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Experience */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <FontAwesomeIcon icon={faBook} />
          </div>
          <h3 className="h3">Experience</h3>
        </div>

        <ol className="timeline-list">
          {experienceList.map((e, i) => (
            <li className="timeline-item" key={i}>
              <h4 className="h4 timeline-item-title place">{e.role}</h4>
              <h4 className="h4 timeline-item-title place1">
                <em>{e.company}</em>
              </h4>
              <span className="duration-gpa">{e.dates}</span>
              <ul className="timeline-text">
                {e.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section className="skill">
        <h3 className="h3 skills-title">My skills</h3>
        <ul className="skills-list content-card">
          {skills.map((s, i) => (
            <li className="skills-item" key={i}>
              <div className="title-wrapper">
                <h5 className="h5 skill-title">{s.label}:</h5>
                <span className="skill-text">{s.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

// ─── Projects Page ───────────────────────────────────────────

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [selectOpen, setSelectOpen] = useState(false);

  const filtered = projects.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  const handleFilter = (cat: Category) => {
    setActiveFilter(cat);
    setSelectOpen(false);
  };

  return (
    <article className="article article--active">
      <header>
        <h2 className="h2 article-title">Projects</h2>
      </header>

      <section>
        {/* Desktop filter */}
        <ul className="filter-list">
          {projectCategories.map((cat) => (
            <li className="filter-item" key={cat}>
              <button
                className={activeFilter === cat ? 'active' : ''}
                onClick={() => handleFilter(cat)}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile select */}
        <div className="filter-select-box">
          <button
            className={`filter-select ${selectOpen ? 'filter-select--active' : ''}`}
            onClick={() => setSelectOpen(!selectOpen)}
          >
            <span>{activeFilter === 'all' ? 'All' : activeFilter}</span>
            <span className="select-icon">
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </button>
          <ul className="select-list">
            {projectCategories.map((cat) => (
              <li className="select-item" key={cat}>
                <button onClick={() => handleFilter(cat)}>
                  {cat === 'all' ? 'All' : cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Grid */}
        <ul className="project-list">
          {filtered.map((p, i) => (
            <li className="project-item project-item--active" key={i}>
              <a href={p.link} target="_blank" rel="noopener noreferrer">
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                  <img src={p.image} alt={p.title} loading="lazy" />
                </figure>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-category">{p.tech}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

// ─── Achievements Page ───────────────────────────────────────

function AchievementsPage() {
  return (
    <article className="article article--active">
      <header>
        <h2 className="h2 article-title">Achievements</h2>
      </header>

      <section className="achievements-posts">
        <ul className="achievements-posts-list">
          {achievements.map((a, i) => (
            <li className="achievements-post-item" key={i}>
              <a href="#">
                <figure className="achievements-banner-box">
                  <img src={a.image} alt={a.title} loading="lazy" />
                </figure>
                <div className="achievements-content">
                  <div className="achievements-meta">
                    <p className="achievements-category">{a.category}</p>
                    <span className="dot" />
                    <time>{a.date}</time>
                  </div>
                  <h3 className="h4 achievements-item-title">{a.title}</h3>
                  <p className="achievements-text">{a.text}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

// ─── Contact Page ────────────────────────────────────────────

function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState('');
  const [formValid, setFormValid] = useState(false);

  const handleInput = useCallback(() => {
    setFormValid(formRef.current?.checkValidity() ?? false);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('Thanks for reaching out! I will get back to you soon.');
      formRef.current?.reset();
      setFormValid(false);
      setTimeout(() => setStatus(''), 4000);
    },
    []
  );

  return (
    <article className="article article--active">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="mapbox">
        <figure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d472244.646295437!2d-121.67409044507838!3d37.35972679412347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fcae48af93ff5%3A0xb99d8c0aca9f717b!2sSan%20Jose%2C%20CA!5e1!3m2!1sen!2sus!4v1748325762049!5m2!1sen!2sus"
            width="400"
            height="600"
            loading="lazy"
            title="Map"
          />
        </figure>
      </section>

      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>
        <form ref={formRef} className="form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              className="form-input"
              placeholder="Full name"
              required
              onInput={handleInput}
            />
            <input
              type="email"
              className="form-input"
              placeholder="Email address"
              required
              onInput={handleInput}
            />
          </div>
          <textarea
            className="form-input"
            placeholder="Your Message"
            required
            onInput={handleInput}
          />
          <button className="form-btn" type="submit" disabled={!formValid}>
            <FontAwesomeIcon icon={faPaperPlane} />
            <span>Send Message</span>
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </section>
    </article>
  );
}

// ─── App ─────────────────────────────────────────────────────

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('about');

  const handleNavigate = useCallback((id: PageId) => {
    setActivePage(id);
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar activePage={activePage} onNavigate={handleNavigate} />

        {activePage === 'about' && <AboutPage />}
        {activePage === 'resume' && <ResumePage />}
        {activePage === 'projects' && <ProjectsPage />}
        {activePage === 'achievements' && <AchievementsPage />}
        {activePage === 'contact' && <ContactPage />}
      </div>
    </main>
  );
}
