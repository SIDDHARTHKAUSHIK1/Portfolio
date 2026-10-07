import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const handleLinkClick = (e: Event) => {
      const elem = e.currentTarget as HTMLAnchorElement;
      const section = elem.getAttribute("data-href") || elem.getAttribute("href");

      if (!section || section === "/#" || section === "#") {
        e.preventDefault();
        if (smoother) {
          smoother.scrollTo(0, true);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      if (section.startsWith("#")) {
        e.preventDefault();
        ScrollTrigger.refresh();
        if (smoother) {
          smoother.scrollTo(section, true, "top top");
        } else {
          const target = document.querySelector(section);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    const links = document.querySelectorAll(".header ul a, .navbar-title");
    links.forEach((elem) => {
      elem.addEventListener("click", handleLinkClick);
    });

    const resizeHandler = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      links.forEach((elem) => {
        elem.removeEventListener("click", handleLinkClick);
      });
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Siddharth Kaushik.
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=sidd2004.sk@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-connect"
          data-cursor="disable"
        >
          sidd2004.sk@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
