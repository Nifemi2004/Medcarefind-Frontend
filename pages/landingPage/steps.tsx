import styles from "./steps.module.css";

const Steps = () => {
  return (
    <>
      <div className={styles.steps}>
        <div className={styles.title}>Steps to utilizing MedCareFind for your healthcare needs.</div>
        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src="/physician-selection.png" alt="physician-selection" />
            </div>
            <div className={styles.text}>Find the best doctors <span className={styles.extra}>from around the world</span></div>
          </div>
          <div className={styles.step}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src="/Schedule.png" alt="Schedule" />
            </div>
            <div className={styles.text}>
              Conveniently schedule your appointment <span className={styles.extra}>online, hassle-free</span>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src="/Prepare.png" alt="Prepare" />
            </div>
            <div className={styles.text}>
              Discover essential information <span className={styles.extra}>and gain insights on the key questions to ask your doctor</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Steps;
