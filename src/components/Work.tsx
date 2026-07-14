import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { useCallback, useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

const PROJECTS = [
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
  const workSectionRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let translateX = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (!box.length) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding =
        parseInt(window.getComputedStyle(box[0]).padding, 10) / 2;
      translateX =
        rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const sectionEl = workSectionRef.current;
    sectionEl?.style.setProperty("--work-scroll-progress", "0");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
        onUpdate: (self) => {
          sectionEl?.style.setProperty(
            "--work-scroll-progress",
            String(self.progress)
          );
          const index = Math.round(self.progress * (PROJECTS.length - 1));
          setActiveIndex(index);
        },
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
      sectionEl?.style.removeProperty("--work-scroll-progress");
    };
  }, []);

  const seekScrollFromTrackClientX = useCallback((clientX: number) => {
    const track = scrollTrackRef.current;
    const st = ScrollTrigger.getById("work");
    if (!track || !st) return;
    const rect = track.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const targetScroll = st.start + (st.end - st.start) * p;
    gsap.to(window, {
      duration: 0.3,
      scrollTo: { y: targetScroll, autoKill: false },
      ease: "power2.out"
    });
  }, []);

  const onTrackPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      seekScrollFromTrackClientX(e.clientX);
      const track = scrollTrackRef.current;
      if (!track) return;
      track.setPointerCapture(e.pointerId);
      const onMove = (ev: PointerEvent) =>
        seekScrollFromTrackClientX(ev.clientX);
      const onUp = (ev: PointerEvent) => {
        track.releasePointerCapture(ev.pointerId);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [seekScrollFromTrackClientX]
  );

  const jumpToProject = useCallback((index: number) => {
    const st = ScrollTrigger.getById("work");
    if (!st || PROJECTS.length < 2) return;
    const p =
      PROJECTS.length <= 1 ? 0 : index / (PROJECTS.length - 1);
    
    // Use GSAP's scrollTo plugin for smooth navigation
    const targetScroll = st.start + (st.end - st.start) * p;
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: targetScroll, autoKill: false },
      ease: "power2.inOut"
    });
  }, []);

  const handleNext = useCallback(() => {
    const st = ScrollTrigger.getById("work");
    if (!st || PROJECTS.length < 2) return;
    const currentIndex = Math.round(st.progress * (PROJECTS.length - 1));
    const nextIndex = Math.min(currentIndex + 1, PROJECTS.length - 1);
    jumpToProject(nextIndex);
  }, [jumpToProject]);

  const handlePrev = useCallback(() => {
    const st = ScrollTrigger.getById("work");
    if (!st || PROJECTS.length < 2) return;
    const currentIndex = Math.round(st.progress * (PROJECTS.length - 1));
    const prevIndex = Math.max(currentIndex - 1, 0);
    jumpToProject(prevIndex);
  }, [jumpToProject]);

  return (
    <div className="work-section" id="work" ref={workSectionRef}>
      <div className="work-container section-container">
        <div className="work-header-container">
          <h2>
            My <span>Work</span>
          </h2>
          <div className="work-nav-arrows">
            <button 
              className={`work-arrow-btn prev-btn ${activeIndex === 0 ? "disabled" : ""}`} 
              onClick={handlePrev} 
              disabled={activeIndex === 0}
              aria-label="Previous Project"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              className={`work-arrow-btn next-btn ${activeIndex === PROJECTS.length - 1 ? "disabled" : ""}`} 
              onClick={handleNext} 
              disabled={activeIndex === PROJECTS.length - 1}
              aria-label="Next Project"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
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

        <div
          className="work-scroll-nav"
          aria-label="Browse projects: scroll the page, drag the bar, or use the shortcuts"
        >
          <div
            ref={scrollTrackRef}
            className="work-scroll-track"
            onPointerDown={onTrackPointerDown}
            role="presentation"
          >
            <div className="work-scroll-track-fill" />
          </div>
          <div className="work-scroll-jumps">
            {PROJECTS.map((project, index) => (
              <button
                key={project.link}
                type="button"
                className={`work-scroll-jump ${activeIndex === index ? "active" : ""}`}
                onClick={() => jumpToProject(index)}
              >
                <span className="work-scroll-jump-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="work-scroll-jump-name">{project.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
