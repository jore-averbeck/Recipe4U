import { useEffect, useState } from "react";
import styled from "styled-components";

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 15px;
  padding-top: 0.2rem;
  display: ${(props) => (props.visible ? "block" : "none")};
  background-color: var(--third);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;
`;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ScrollToTopButton onClick={scrollToTop} visible={isVisible}>
      ⌃
    </ScrollToTopButton>
  );
}
