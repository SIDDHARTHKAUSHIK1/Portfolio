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
                <h4>Software Engineering Intern</h4>
                <h5>509 Army Base Workshop</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built an AI-powered File Content Tracker using Next.js + Electron. Integrated Ollama (local LLM) for offline intelligent search. Gathered requirements as a business analyst. Shipped a{" "}
              <a
                href="https://drone-detection-tracking.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="career-external-link"
              >
                Drone Detection &amp; Tracking dashboard
              </a>{" "}
              for real-time monitoring and visualization (deployed on Vercel).
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech CSE</h4>
                <h5>Eshan College of Engineering</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              AKTU University. Reliance Foundation Scholar. NPTEL Certified.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Class XII (PCM)</h4>
                <h5>University Model School, Agra</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              CBSE Board
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
