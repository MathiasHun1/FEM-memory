import styles from '../styles/components/DesignSystem.module.scss';
const DesignSystem = () => {
  return (
    <div className={styles.wrapper}>
      <h1 style={{ color: 'white', textAlign: 'center' }}>Buttons</h1>
      <div className={styles.container}>
        <div>
          <h2 className={styles.sub_title}>Menu-big</h2>
          <button className={styles.menu_big}>Start Game</button>
        </div>
        <div>
          <h2 className={styles.sub_title}>Menu-selection</h2>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <button className={styles.menu_select}>Number</button>
            <button className={styles.menu_select}>Number</button>
          </div>
        </div>
        <div>
          <h2 className={styles.sub_title}>Button-primary, Button-secondary</h2>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <button className={styles.menu_restart}>Restart</button>
            <button className={styles.menu_new}>New Game</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystem;
