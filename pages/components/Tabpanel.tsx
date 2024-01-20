import React, { ReactNode } from 'react';
import styles from './Tabpanel.module.css';

interface TabPanelProps {
  children: ReactNode;
  active: boolean;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, active }) => {
  return <div className={`${styles.tabPanel} ${active ? styles.activePanel : ''}`}>{children}</div>;
};

export default TabPanel;
