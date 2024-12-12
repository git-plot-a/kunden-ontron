import { useEffect } from 'react';
import constants from "./constants"
import "./animation.scss"

const useAnimation = () => {
  
    const checkVisibility = () => {
        constants.CLASS_LIST.forEach((animationClass)=>{
            const elements = document.querySelectorAll(`.${animationClass}`);
            elements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                if ((rect.top < window.innerHeight && rect.bottom >= 0 || element.classList.contains(constants.IMMIDIATE_SHOW)) && !element.classList.contains(constants.VISIBILITY_CLASS)) {
                  element.classList.add(constants.VISIBILITY_CLASS); // Добавляем класс, когда элемент в зоне видимости
                }
              });
        })
      };
  
    useEffect(() => {
    if (typeof window !== 'undefined') {

      window.addEventListener('scroll', checkVisibility);

      checkVisibility();
      return () => {
        window.removeEventListener('scroll', checkVisibility);
      };
    }
  }, []);
  return checkVisibility;
};

export default useAnimation;
