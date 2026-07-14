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
                <h4>GenAI Systems Intern</h4>
                <h5>Indian Army (509 Army Base Workshop)</h5>
              </div>
              <h3>2025 - Present</h3>
            </div>
            <div className="career-details">
              <h5>Offline GenAI Document-Intelligence System</h5>
              <ul>
                <li>Built and continue to maintain – over 1 full year – an offline GenAI document-intelligence system using Ollama and LangChain RAG to retrieve, reason over, and summarise defence documents.</li>
                <li>Designed multi-step LLM workflows with vector-store and buffer memory, tool integration, and ReAct-style reasoning for accurate, grounded responses in a mission-critical setting.</li>
                <li>Containerised and shipped the application with Docker and GitHub Actions CI/CD entirely inside a secure, air-gapped, no-internet defence environment.</li>
                <li>Sustained, year-long ownership of the system from prototype to a production tool used by workshop personnel.</li>
              </ul>
            </div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech - CSE</h4>
                <h5>Eshan College of Engineering (AKTU)</h5>
              </div>
              <h3>2022 - 2026</h3>
            </div>
            <p>
              Reliance Foundation Scholar. <br />
              NPTEL Certified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
