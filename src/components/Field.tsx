import styles from '../styles/components/Field.module.scss';

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
      return value;
    } else {
      return <img src={value} alt="" />;
    }
  };

  return (
    <span className={style} data-id={index} onClick={onClick}>
      {isActive || isFound ? renderValue() : ''}
    </span>
  );
};

export default Field;
