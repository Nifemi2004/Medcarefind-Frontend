import styles from "./footer.module.css";
import * as Fa from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.firstSection}>
          <div className={styles.listContainer}>
            <div className={styles.logoAndIcon}>
              <div>
                <img className={styles.logo} src="/medcare.png" alt="" />
              </div>
              <div className={styles.iconsContainer}>
                <div className={styles.icon}>
                  <Fa.FaFacebookSquare />
                </div>
                <div className={styles.icon}>
                  <Fa.FaTwitter />
                </div>
                <div className={styles.icon}>
                  <Fa.FaInstagram />
                </div>
              </div>
            </div>
            <div className={styles.listWrapper}>
              <div>Specialties</div>
              <div>
                <ul className={styles.list}>
                  <li>Neurology</li>
                  <li>Ophthalmology</li>
                  <li>Nuclear Magnetic</li>
                  <li>X-Ray</li>
                  <li>Surgical</li>
                  <li>Cardiology</li>
                  <li>Dental</li>
                </ul>
              </div>
            </div>
            <div className={styles.listWrapper}>
              <div>Services</div>
              <div>
                <ul className={styles.list}>
                  <li>Emergency Help</li>
                  <li>Qualified Doctors</li>
                  <li>Location & Directions</li>
                  <li>Medical Treatment</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.contactsContainer}>
            <div>Have a Question?</div>
            <div className={styles.contactWrapper}>
              <div className={styles.contact}>
                <Fa.FaPhone />
                09012345678
              </div>
              <div className={styles.contact}>
                <Fa.FaEnvelope />
                info@medcarefind.com
              </div>
            </div>
          </div>
        </div>
        <div className={styles.centrifugeText}>
          Powered by Centrifuge Information Technology Limited.
        </div>
      </div>
    </>
  );
};

export default Footer;
