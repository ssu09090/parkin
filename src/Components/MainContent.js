import { useEffect, useState, useRef } from "react";
import keywordData from "../assets/keywords.json";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MainContent = ({ scrollRefs }) => {
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navigate = useNavigate();

  const handleClick = (idx) => {
    if (idx === 0) {
      navigate("/itempage"); // ItemPage로 이동
    }
    if (idx === 1) {
      navigate("/itempagetwo");
    }
    if (idx === 2) {
      navigate("/itempagethree");
    }
    if (idx === 3) {
      navigate("/itempagefour");
      window.scrollTo(0, 0);
    }
    if (idx === 4) {
      navigate("/itempagefive");
    }
  };
useEffect(() => {
  const timeout = setTimeout(() => {
    scrollRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    ScrollTrigger.refresh();
  }, 1000); 

  return () => clearTimeout(timeout);
}, []);

  return (
    <main className="main-content">
      {keywordData.map((section, idx) => (
        <section
          className="main-map"
          key={section.id}
          ref={(el) => (scrollRefs.current[idx] = el)}
        >
          <img
            src={
              isTablet
                ? `${process.env.PUBLIC_URL}${section.img.tablet}`
                : `${process.env.PUBLIC_URL}${section.img.mobile}`
            }
            alt={section.img.alt}
          />
          <div className="main-title">
            <h2>{section.title}</h2>
            <h3>
              {section.sub}
              <span>{section.sub2}</span>
            </h3>
            <div className="main-text">
              <p>{section.text1}</p>
              <p>{section.text2}</p>
              <p>{section.text3}</p>
              <p>{section.text4}</p>
            </div>
            <button
              onClick={() => {
                handleClick(idx);
              }}
            >
              서비스 자세히 보기　〉
            </button>
          </div>
        </section>
      ))}
    </main>
  );
};

export default MainContent;
