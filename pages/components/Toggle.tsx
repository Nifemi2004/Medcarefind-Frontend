import React, { ReactNode, useState } from 'react';
import styles from './Toggle.module.css';
import * as Fa from "react-icons/fa"

interface ToggleSectionProps {
  children: ReactNode;
  title: string;
}

const ToggleSection: React.FC<ToggleSectionProps> = ({ title, children }) => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const toggleSection = () => {
    setIsSectionVisible(!isSectionVisible);
  };

  return (
    <div>
      <div className={styles.iconContainer} onClick={toggleSection}>
      {isSectionVisible ? <Fa.FaTimesCircle className={styles.toggleIcon} /> : <Fa.FaPlusCircle className={styles.toggleIcon} />}
      <p>{title}</p>
      </div>

      <div className={`${styles.section} ${isSectionVisible ? styles.visible : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default ToggleSection;
