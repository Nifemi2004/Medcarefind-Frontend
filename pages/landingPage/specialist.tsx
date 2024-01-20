import styles from "./specialist.module.css";
import * as Fa from "react-icons/fa"

const Specialist = () => {
  return (
    <>
      <div className={styles.specialist}>
        <div className={styles.imageContainer}>
          <div className={styles.image}>
          </div>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Are You A Specialist ?</h2>
          </div>
          <div className={styles.mainTextContainer}>
            <p className={styles.mainText}>
              Doctors who claim their free Healthgrades profile connect with the
              right patients 2x more Your future patients are ready to connect.
              Learn more about how to claim your free Healthgrades profile and
              our available upgrades.
            </p>
          </div>
          {/* <div className={styles.linkTextContainer}>
            <h3 className={styles.linkText}>CREATE YOUR PROFILE</h3>
            <Fa.FaArrowRight></Fa.FaArrowRight>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Specialist;
