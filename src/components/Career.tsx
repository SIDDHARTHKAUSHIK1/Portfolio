import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer</h4>
                <h5>Aflix Infotech Private Limited</h5>
              </div>
              <h3>Aug 2026 - Present</h3>
            </div>
            <div className="career-details">
              <h5>Full-Stack & Software Development</h5>
              <ul>
                <li>Developing and maintaining full-stack web and software applications, writing clean, efficient, well-documented code across frontend and backend components.</li>
                <li>Debugging, testing, and optimizing production applications; collaborating with the development team via Git/GitHub through code reviews and daily stand-ups.</li>
              </ul>
            </div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Indian Army (509 Army Base Workshop)</h5>
              </div>
              <h3>Jun 2025 - May 2026</h3>
            </div>
            <div className="career-details">
              <h5>Offline GenAI Document-Intelligence System</h5>
              <ul>
                <li>Developed and maintained a Python backend for an offline GenAI document-intelligence system, integrating APIs and libraries (LangChain, FAISS, Ollama) into a production RAG pipeline.</li>
                <li>Debugged and troubleshot issues throughout development; used Git for version control while collaborating with cross-functional teams on testing and improvements.</li>
              </ul>
            </div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech - CSE</h4>
                <h5>AKTU University</h5>
              </div>
              <h3>2022 - 2026</h3>
            </div>
            <p>
              Reliance Foundation Scholar. NPTEL Certified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
