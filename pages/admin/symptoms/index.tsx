import React from 'react';
import { useRouter } from 'next/router';
import { TabView, TabPanel } from 'primereact/tabview';
import { useState } from 'react';
import SymptomTable from './symptoms';

const symptoms = () => {
    const router = useRouter();
    const { activeTab } = router.query;
    const [activeIndex, setActiveIndex] = useState<number>(parseInt(activeTab as string) || 0);

    const handleTabChange = (event: { index: number }) => {
        setActiveIndex(event.index);
        router.push(`/symptoms?activeTab=${event.index}`);
    };
    return (
        <div className="card">
            <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
                <TabPanel header="Symptoms">
                  <div>
                     <SymptomTable/>
                  </div>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default symptoms;
