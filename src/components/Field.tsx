import styles from '../styles/components/Field.module.scss';
import { motion } from 'motion/react';

interface Props {
  isActive: boolean;
  isFound: boolean;
  value: string | number;
  index: number;
  onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const Field = ({ isActive, isFound, value, index, onClick }: Props) => {
  const style = `${styles.field} ${isActive ? styles.active : ''} ${
    isFound ? styles.found : ''
  }`;

  const renderValue = () => {
    if (typeof value === 'number') {
      return <>{value}</>;
    } else {
      return <img src={value} alt="" />;
    }
  };

  const ContainerVariants = {
    default: { rotateY: 180 },
    active: { rotateY: 0 },
    found: { rotateY: 0 },
  };

  const ContentVariants = {
    default: { opacity: 0 },
    active: { opacity: 1 },
    found: { opacity: 1 },
  };

  const getState = () => {
    if (isActive) {
      return 'active';
    }
    if (isFound) {
      return 'found';
    }
    return 'default';
  };

  return (
    <motion.div
      initial="default"
      animate={getState()}
      variants={ContainerVariants}
      transition={{ duration: 0.4 }}
      className={style}
      data-id={index}
      onClick={onClick}
    >
      <motion.span
        initial="default"
        variants={ContentVariants}
        animate={getState()}
        className={styles.content}
      >
        {renderValue()}
      </motion.span>
    </motion.div>
  );
};

export default Field;
