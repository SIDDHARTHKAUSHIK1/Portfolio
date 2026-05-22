import { useRef, useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./styles/Certifications.css";

const CERTIFICATES = [
  { id: 1, name: "Artificial Intelligence", link: "https://drive.google.com/file/d/17CkK5qMYc3iF-GHnlcM1KTSKqSL5JTko/view", image: "https://drive.google.com/thumbnail?id=17CkK5qMYc3iF-GHnlcM1KTSKqSL5JTko&sz=w800" },
  { id: 2, name: "Certificate", link: "https://drive.google.com/file/d/1VaxO8u9qO0r41tr_1AVFheSCCDNjBepV/view", image: "https://drive.google.com/thumbnail?id=1VaxO8u9qO0r41tr_1AVFheSCCDNjBepV&sz=w800" },
  { id: 3, name: "Cyber Security", link: "https://drive.google.com/file/d/1Zt4vzfGp92-N1EjLLrIXD3xZUDbv46vm/view", image: "https://drive.google.com/thumbnail?id=1Zt4vzfGp92-N1EjLLrIXD3xZUDbv46vm&sz=w800" },
  { id: 4, name: "Developing Soft Skills", link: "https://drive.google.com/file/d/1gTjxgkHxRwWt477gwlYEzB5Xh9Abw2tn/view", image: "https://drive.google.com/thumbnail?id=1gTjxgkHxRwWt477gwlYEzB5Xh9Abw2tn&sz=w800" },
  { id: 5, name: "Emotional Intelligence", link: "https://drive.google.com/file/d/1tkD1ftjUP8yunCggVnEuJvNbyRFH_ir4/view", image: "https://drive.google.com/thumbnail?id=1tkD1ftjUP8yunCggVnEuJvNbyRFH_ir4&sz=w800" },
  { id: 6, name: "Enhancing Soft Skills", link: "https://drive.google.com/file/d/11hsose5nuSBml4ihGIa3Y_j4Re2mPLT4/view", image: "https://drive.google.com/thumbnail?id=11hsose5nuSBml4ihGIa3Y_j4Re2mPLT4&sz=w800" },
  { id: 7, name: "Excel Udemy Certificate", link: "https://drive.google.com/file/d/1TRO_u4321vk44FkkdC0hymvZcLayLgiF/view", image: "https://drive.google.com/thumbnail?id=1TRO_u4321vk44FkkdC0hymvZcLayLgiF&sz=w800" },
  { id: 8, name: "Forage Software Engineering 1", link: "https://drive.google.com/file/d/1SuEBIcurYZt913rEIfgHW_iKabTqW-RW/view", image: "https://drive.google.com/thumbnail?id=1SuEBIcurYZt913rEIfgHW_iKabTqW-RW&sz=w800" },
  { id: 9, name: "Forage Software Engineering", link: "https://drive.google.com/file/d/17Z_YYw5-60M_ruD9B7nprKGMMEH0sv6i/view", image: "https://drive.google.com/thumbnail?id=17Z_YYw5-60M_ruD9B7nprKGMMEH0sv6i&sz=w800" },
  { id: 10, name: "Full Stack Python Dev", link: "https://drive.google.com/file/d/1HyR94llutAsDQFmzDi8QpjgG_Ef9WcLd/view", image: "https://drive.google.com/thumbnail?id=1HyR94llutAsDQFmzDi8QpjgG_Ef9WcLd&sz=w800" },
  { id: 11, name: "HTML Beginners Udemy", link: "https://drive.google.com/file/d/1smSm1zPqDu81Yyppui82EHIQffteJlD-/view", image: "https://drive.google.com/thumbnail?id=1smSm1zPqDu81Yyppui82EHIQffteJlD-&sz=w800" },
  { id: 12, name: "Intro to Internet of Things", link: "https://drive.google.com/file/d/1KOdrOj4YMxivkYm-D2aQGxWuhY2BXw3f/view", image: "https://drive.google.com/thumbnail?id=1KOdrOj4YMxivkYm-D2aQGxWuhY2BXw3f&sz=w800" },
  { id: 31, name: "Introduction to Industry 4.0 and Industrial Internet of Things", link: "https://drive.google.com/file/d/1EXdhDHEZkSEbhsmnKTV4YxvyWDGLij0_/view", image: "https://drive.google.com/thumbnail?id=1EXdhDHEZkSEbhsmnKTV4YxvyWDGLij0_&sz=w800" },
  { id: 13, name: "Java Coding Ninja", link: "https://drive.google.com/file/d/1ZQLrG6MonU1BvqcetHUOCpWiN4gMMzCe/view", image: "https://drive.google.com/thumbnail?id=1ZQLrG6MonU1BvqcetHUOCpWiN4gMMzCe&sz=w800" },
  { id: 14, name: "Java Coding Ninja PDF", link: "https://drive.google.com/file/d/14kIkpMcF74QT4mqK9hEq0Js8bvkhH2aJ/view", image: "https://drive.google.com/thumbnail?id=14kIkpMcF74QT4mqK9hEq0Js8bvkhH2aJ&sz=w800" },
  { id: 15, name: "Java Real-World Dev", link: "https://drive.google.com/file/d/1Ip1vzSLuH4NKc4VR7Py90wm7oU_QWVgn/view", image: "https://drive.google.com/thumbnail?id=1Ip1vzSLuH4NKc4VR7Py90wm7oU_QWVgn&sz=w800" },
  { id: 32, name: "Manufacturing Process Technology I & II", link: "https://drive.google.com/file/d/1MXvzEZr-LOy4sE9hEx0LjicuxsuPTmB7/view", image: "https://drive.google.com/thumbnail?id=1MXvzEZr-LOy4sE9hEx0LjicuxsuPTmB7&sz=w800" },
  { id: 16, name: "Oracle AI Foundations", link: "https://drive.google.com/file/d/11N14dXxIxtsJg7yD2pwvhI7JnAmWJVrR/view", image: "https://drive.google.com/thumbnail?id=11N14dXxIxtsJg7yD2pwvhI7JnAmWJVrR&sz=w800" },
  { id: 17, name: "Oracle Cloud Foundations", link: "https://drive.google.com/file/d/1Y4FkKrWKjnG7SDKAsU4dvdLkKr20RLu6/view", image: "https://drive.google.com/thumbnail?id=1Y4FkKrWKjnG7SDKAsU4dvdLkKr20RLu6&sz=w800" },
  { id: 18, name: "Oracle Cloud Infrastructure", link: "https://drive.google.com/file/d/1U18qrhfzlp62aNpTAzQ3K5-QZPV_8CqQ/view", image: "https://drive.google.com/thumbnail?id=1U18qrhfzlp62aNpTAzQ3K5-QZPV_8CqQ&sz=w800" },
  { id: 19, name: "Oracle Generative AI", link: "https://drive.google.com/file/d/1nPayAFz1a94egCg1NC4bE1RNDB0APDnz/view", image: "https://drive.google.com/thumbnail?id=1nPayAFz1a94egCg1NC4bE1RNDB0APDnz&sz=w800" },
  { id: 20, name: "Oracle Multicloud Architect", link: "https://drive.google.com/file/d/1t4_mP6n5m4NkjnL-jAdz8JQBpOi32csf/view", image: "https://drive.google.com/thumbnail?id=1t4_mP6n5m4NkjnL-jAdz8JQBpOi32csf&sz=w800" },
  { id: 21, name: "Oracle AI Foundations Assoc.", link: "https://drive.google.com/file/d/1Iwk6bRgcNCI4DY7tj25b2vGyx6Uyt56Q/view", image: "https://drive.google.com/thumbnail?id=1Iwk6bRgcNCI4DY7tj25b2vGyx6Uyt56Q&sz=w800" },
  { id: 22, name: "Oracle Foundations Assoc.", link: "https://drive.google.com/file/d/1qsLhZmmxhHumbK6lYQdoZn8rdtngam49/view", image: "https://drive.google.com/thumbnail?id=1qsLhZmmxhHumbK6lYQdoZn8rdtngam49&sz=w800" },
  { id: 23, name: "Oracle Generative AI Prof.", link: "https://drive.google.com/file/d/1mrAeK_SzfXEnoxyEjazMob4sBZrOedWN/view", image: "https://drive.google.com/thumbnail?id=1mrAeK_SzfXEnoxyEjazMob4sBZrOedWN&sz=w800" },
  { id: 24, name: "Oracle Multicloud Prof.", link: "https://drive.google.com/file/d/1Ceg-tDVv2xYxT0fq4ubSHfAAY6zlRteh/view", image: "https://drive.google.com/thumbnail?id=1Ceg-tDVv2xYxT0fq4ubSHfAAY6zlRteh&sz=w800" },
  { id: 25, name: "Oracle Data Platform", link: "https://drive.google.com/file/d/1PKgwpN6GjV9EHkHQ134k6RVaEVxMci0d/view", image: "https://drive.google.com/thumbnail?id=1PKgwpN6GjV9EHkHQ134k6RVaEVxMci0d&sz=w800" },
  { id: 26, name: "Patent Law for Engineers", link: "https://drive.google.com/file/d/1hOwtndLMOrNK77kNISVTpkl-mE_yGqI3/view", image: "https://drive.google.com/thumbnail?id=1hOwtndLMOrNK77kNISVTpkl-mE_yGqI3&sz=w800" },
  { id: 27, name: "Python Beginner Udemy", link: "https://drive.google.com/file/d/19bOHwDWZryA6hG2MSmVgwT04H8ltfed5/view", image: "https://drive.google.com/thumbnail?id=19bOHwDWZryA6hG2MSmVgwT04H8ltfed5&sz=w800" },
  { id: 28, name: "Reliance Foundation DIY", link: "https://drive.google.com/file/d/1wahx9jTDOSJAfxxisEHh6girXaKU39jG/view", image: "https://drive.google.com/thumbnail?id=1wahx9jTDOSJAfxxisEHh6girXaKU39jG&sz=w800" },
  { id: 29, name: "Speaking Effectively", link: "https://drive.google.com/file/d/1CXloPEA0uw4SoCkY67BZGVsUhvz1F93e/view", image: "https://drive.google.com/thumbnail?id=1CXloPEA0uw4SoCkY67BZGVsUhvz1F93e&sz=w800" },
  { id: 30, name: "Tata Certificate", link: "https://drive.google.com/file/d/1j5sfc2iAnCt49uKbwSBco9w51bC4HqQA/view", image: "https://drive.google.com/thumbnail?id=1j5sfc2iAnCt49uKbwSBco9w51bC4HqQA&sz=w800" },
];

const Certifications = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const animationRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  const duplicatedCertificates = [...CERTIFICATES, ...CERTIFICATES];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const animate = () => {
      if (!isHovered && !isScrolling) {
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
  }, [isHovered, isScrolling]);

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

      // Infinite wrapping check to prevent hitting boundary
      if (direction === "left" && slider.scrollLeft <= 5) {
        slider.scrollLeft = halfWidth;
      } else if (direction === "right" && slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        slider.scrollLeft = slider.scrollLeft - halfWidth;
      }

      const card = slider.querySelector(".cert-card");
      const cardWidth = card ? card.getBoundingClientRect().width + 50 : 450;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      
      slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="certifications-section section-container" id="certifications">
      <div className="certifications-header">
        <h2>
          My <span>Certifications</span>
        </h2>
        <div className="certifications-controls">
          <button 
            className="control-btn prev" 
            onClick={() => scroll("left")}
            aria-label="Previous Certificates"
          >
            <MdChevronLeft />
          </button>
          <button 
            className="control-btn next" 
            onClick={() => scroll("right")}
            aria-label="Next Certificates"
          >
            <MdChevronRight />
          </button>
        </div>
      </div>
      
      <div 
        className="certifications-slider-container" 
        ref={sliderRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="certifications-track">
          {duplicatedCertificates.map((cert, index) => (
            <div 
              className="cert-card" 
              key={`${cert.id}-${index}`}
              onClick={() => window.open(cert.link, "_blank", "noopener,noreferrer")}
              title={`View ${cert.name}`}
            >
              <div className="cert-image-container">
                <img src={cert.image} alt={cert.name} draggable="false" loading="lazy" />
              </div>
              <div className="cert-info">
                <h4>{cert.name}</h4>
                <p>Click to view record &rarr;</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
