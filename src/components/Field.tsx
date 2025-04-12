import styles from '../styles/components/Field.module.scss';

interface Props {
  isActive: boolean;
  isFound: boolean;
  value: number;
  id: number;
  onClick: () => void;
}

const Field = ({ isActive, isFound, value, id, onClick }: Props) => {
  const style = `${styles.field} ${isActive ? styles.active : ''} ${
    isFound ? styles.found : ''
  }`;

  console.log('id: ', isFound);

  return (
    <span className={style} data-id={id} onClick={onClick}>
      {isActive || isFound ? value : ''}
    </span>
  );
};

export default Field;
