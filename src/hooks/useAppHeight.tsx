import { useEffect } from 'react';

export default function useAppHeight() {
  useEffect(() => {
    function setHeight() {
      document.documentElement.style.setProperty(
        '--app-height',
        `${window.innerHeight}px`
      );
    }

    setHeight();
    window.addEventListener('resize', setHeight);

    return () => {
      window.addEventListener('resize', setHeight);
    };
  }, []);
}
