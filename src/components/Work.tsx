import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdChevronLeft, MdChevronRight, MdGridView, MdClose, MdArrowOutward, MdSearch, MdArrowForward } from "react-icons/md";

const PROJECTS = [
  {
    name: "LabelLens AI",
    category: "Multi-Annotator Dataset Quality & IAA Audit Platform",
    tools: "Python, Streamlit, Scikit-learn, Pandas, SciPy, Plotly, SQLite",
    image: "/images/labellens-ai-preview.png",
    link: "https://labellens-ai.streamlit.app/",
  },
  {
    name: "Playbook AI",
    category: "AI-Powered Incident Response & Portfolio Risk Platform",
    tools: "React, TypeScript, Tailwind CSS, Radix UI, Zustand",
    image: "/images/playbook-ai-preview.png",
    link: "https://play-book-ai.vercel.app/",
  },
  {
    name: "Smart Parking Detection System",
    category: "Computer Vision & Data Analysis",
    tools: "Python, OpenCV, Contour Analysis",
    image: "/images/parking-space-preview.png",
    link: "https://parking-space-ltqyupmudjjdz7eva4xepb.streamlit.app/",
  },
  {
    name: "AI-Powered File Content Tracker",
    category: "Cross-platform Desktop App",
    tools: "Next.js, Electron, TypeScript, Ollama (AI), Node.js",
    image: "/images/file-content-preview.png",
    link: "https://file-content.vercel.app",
  },
  {
    name: "Drone Detection & Tracking Dashboard",
    category: "Computer Vision & Real-time Monitoring",
    tools: "Next.js, TypeScript, React, Vercel",
    image: "/images/drone-detection-preview.png",
    link: "https://drone-detection-tracking.vercel.app/",
  },
  {
    name: "AI-Powered Crime Detection & Surveillance Dashboard",
    category: "Real-time Geocoded Surveillance Map & Detection Pipeline",
    tools: "React.js, Vite, FastAPI, TensorFlow, OpenCV, Docker, CI/CD, Vercel, Render",
    image: "/images/crime-detection-preview.png",
    link: "https://crime-ranking.vercel.app/",
  },
] as const;

const Work = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const animationRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  const duplicatedProjects = [...PROJECTS, ...PROJECTS];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const animate = () => {
      // Pause auto-scroll when hovered, actively scrolling via controls, or when modal is open
      if (!isHovered && !isScrolling && !isModalOpen) {
        const speed = 0.8; // Butter-smooth continuous scroll speed
        let nextScroll = slider.scrollLeft + speed;
        const halfWidth = slider.scrollWidth / 2;

        if (nextScroll >= halfWidth) {
          nextScroll = nextScroll - halfWidth;
        }
        slider.scrollLeft = nextScroll;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, isScrolling, isModalOpen]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      // Resume auto-scroll after 3 seconds of inactivity
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 3000);

      const slider = sliderRef.current;
      const halfWidth = slider.scrollWidth / 2;

      // Infinite wrapping check to prevent boundary hits
      if (direction === "left" && slider.scrollLeft <= 5) {
        slider.scrollLeft = halfWidth;
      } else if (direction === "right" && slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        slider.scrollLeft = slider.scrollLeft - halfWidth;
      }

      const card = slider.querySelector(".work-box");
      const cardWidth = card ? card.getBoundingClientRect().width : 450;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

      slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleSelectProjectFromModal = (index: number) => {
    setIsModalOpen(false);
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const cards = slider.querySelectorAll(".work-box");
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: "smooth",
          inline: "start",
          block: "nearest",
        });
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const filteredProjects = PROJECTS.map((proj, originalIndex) => ({
    ...proj,
    originalIndex,
  })).filter(
    (proj) =>
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tools.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="work-section section-container" id="work">
      <div className="work-header-container">
        <div className="work-title-group">
          <h2>
            My <span>Work</span>
          </h2>
          <button
            className="view-all-header-btn"
            onClick={() => setIsModalOpen(true)}
            aria-label="View All Projects"
          >
            <MdGridView className="btn-icon" />
            <span>View All ({PROJECTS.length})</span>
          </button>
        </div>

        <div className="work-nav-arrows">
          <button
            className="work-arrow-btn prev-btn"
            onClick={() => scroll("left")}
            aria-label="Previous Projects"
          >
            <MdChevronLeft />
          </button>
          <button
            className="work-arrow-btn next-btn"
            onClick={() => scroll("right")}
            aria-label="Next Projects"
          >
            <MdChevronRight />
          </button>
        </div>
      </div>

      <div
        className="work-slider-container"
        ref={sliderRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="work-track">
          {duplicatedProjects.map((project, index) => (
            <div className="work-box" key={`${project.link}-${index}`}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{String((index % PROJECTS.length) + 1).padStart(2, "0")}</h3>

                  <div>
                    <h4>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-title-link"
                      >
                        {project.name}
                      </a>
                    </h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen &&
        createPortal(
          <div className="projects-modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <div
              className="projects-modal-content"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="all-projects-title"
            >
              <div className="projects-modal-header">
                <div>
                  <h3 id="all-projects-title">
                    All <span>Projects</span>
                  </h3>
                  <p>Browse through my complete portfolio of work ({PROJECTS.length} projects)</p>
                </div>
                <button
                  className="projects-modal-close-btn"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close Modal"
                >
                  <MdClose />
                </button>
              </div>

              <div className="projects-modal-search-wrapper">
                <MdSearch className="search-icon" />
                <input
                  type="text"
                  className="projects-modal-search-input"
                  placeholder="Search projects by name, category, or tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    className="search-clear-btn"
                    onClick={() => setSearchQuery("")}
                  >
                    <MdClose />
                  </button>
                )}
              </div>

              <div className="projects-modal-grid">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <div className="project-modal-card" key={project.link}>
                      <div className="project-modal-card-image-wrap">
                        <img src={project.image} alt={project.name} />
                        <span className="project-modal-card-num">
                          {String(project.originalIndex + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="project-modal-card-info">
                        <h4>{project.name}</h4>
                        <p className="project-modal-card-category">{project.category}</p>
                        <p className="project-modal-card-tools">
                          <strong>Tools:</strong> {project.tools}
                        </p>
                      </div>

                      <div className="project-modal-card-actions">
                        <button
                          className="project-modal-jump-btn"
                          onClick={() => handleSelectProjectFromModal(project.originalIndex)}
                        >
                          <span>Go to Slide</span>
                          <MdArrowForward />
                        </button>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-modal-live-btn"
                        >
                          <span>Live Demo</span>
                          <MdArrowOutward />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="projects-modal-empty">
                    <p>No projects match "{searchQuery}"</p>
                    <button onClick={() => setSearchQuery("")}>Reset Search</button>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Work;
