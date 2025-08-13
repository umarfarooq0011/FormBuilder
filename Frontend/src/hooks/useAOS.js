import { useEffect } from "react";
import AOS from "aos";

export const useAOS = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      offset: 50,
      delay: 0,
      mirror: true
    });

    // Refresh AOS when components update
    AOS.refresh();

    return () => {
      AOS.refresh();
    };
  }, []);
};