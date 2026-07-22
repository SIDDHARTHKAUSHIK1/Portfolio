import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { useCallback, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdGridView, MdClose, MdArrowOutward, MdSearch, MdArrowForward } from "react-icons/md";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const flexContainerRef = useRef<HTMLDivElement>(null);

  const jumpToProject = useCallback((index: number) => {
    const container = flexContainerRef.current;
    if (!container) return;
    const boxes = container.querySelectorAll(".work-box");
    if (boxes[index]) {
      boxes[index].scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  }, []);

  const handleNext = useCallback(() => {
    const nextIndex = Math.min(activeIndex + 1, PROJECTS.length - 1);
    jumpToProject(nextIndex);
  }, [activeIndex, jumpToProject]);

  const handlePrev = useCallback(() => {
    const prevIndex = Math.max(activeIndex - 1, 0);
    jumpToProject(prevIndex);
  }, [activeIndex, jumpToProject]);

  const handleScroll = () => {
    const container = flexContainerRef.current;
    if (!container) return;
    const boxes = container.querySelectorAll(".work-box");
    const containerLeft = container.getBoundingClientRect().left;
    let closestIndex = 0;
    let minDiff = Infinity;
    boxes.forEach((box, index) => {
      const diff = Math.abs(box.getBoundingClientRect().left - containerLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });
    setActiveIndex(closestIndex);
  };

  const handleSelectProjectFromModal = (index: number) => {
    setIsModalOpen(false);
    setTimeout(() => {
      jumpToProject(index);
    }, 150);
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
    <div className="work-section" id="work">
      <div className="work-container section-container">
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
              className={`work-arrow-btn prev-btn ${activeIndex === 0 ? "disabled" : ""}`}
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous Project"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className={`work-arrow-btn next-btn ${activeIndex === PROJECTS.length - 1 ? "disabled" : ""}`}
              onClick={handleNext}
              disabled={activeIndex === PROJECTS.length - 1}
              aria-label="Next Project"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="work-flex-container"
          ref={flexContainerRef}
          onScroll={handleScroll}
        >
          <div className="work-flex">
            {PROJECTS.map((project, index) => (
              <div className="work-box" key={project.link}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>{String(index + 1).padStart(2, "0")}</h3>

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
