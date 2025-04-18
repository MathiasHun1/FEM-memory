import { useContext, useState } from 'react';
import { languages } from '../assets/languages';
import { LanguageContext } from '../contexts/GameContext';
import styles from '../styles/components/LanguagePicker.module.scss';

const LanguagePicker = () => {
  const { setLanguage } = useContext(LanguageContext)!;
  const [current, setCurrent] = useState('HU');

  const style = {
    backgroundImage: `url(http://purecatamphetamine.github.io/country-flag-icons/3x2/${current}.svg)`,
  };

  const handleClick = () => {
    if (current === 'HU') {
      setCurrent('GB');
      setLanguage(languages.eng);
    } else {
      setCurrent('HU');
      setLanguage(languages.hun);
    }
  };

  return (
    <div className={styles.container} style={style} onClick={handleClick}></div>
  );
};

export default LanguagePicker;
