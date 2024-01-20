import React, { useState } from 'react';
import TabPanel from './Tabpanel';
import styles from './Tabview.module.css';

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabViewProps {
  tabs: Tab[];
}

const TabView: React.FC<TabViewProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={styles.tabView}>
      <div className={styles.tabNavigation}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${styles.tab} ${index === activeTab ? styles.activeTab : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className={styles.tabPanels}>
        {tabs.map((tab, index) => (
          <TabPanel key={index} active={index === activeTab}>
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

export default TabView;
