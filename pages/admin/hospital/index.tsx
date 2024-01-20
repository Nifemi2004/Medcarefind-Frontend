import React from 'react';
import { useRouter } from 'next/router';
import { TabView, TabPanel } from 'primereact/tabview';
import { useState } from 'react';
import HospitalTable from './hospital';
import FacilityTable from './facilities';
import ServiceTable from './services';

const hospitalTabView = () => {

    const router = useRouter();
    const { activeTab } = router.query;
    const [activeIndex, setActiveIndex] = useState<number>(parseInt(activeTab as string) || 0);

    const handleTabChange = (event: { index: number }) => {
        setActiveIndex(event.index);
        router.push(`/admin/hospital?activeTab=${event.index}`);
    };
    return (
        <div className="card">
            <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
                <TabPanel header="Hospital">
                      <div>
                        <HospitalTable/>
                      </div>
                </TabPanel>
                <TabPanel header="Facilities">
                  <div>
                    <FacilityTable/>
                  </div>
                </TabPanel>
                <TabPanel header="Services  ">
                  <div>
                    <ServiceTable/>
                  </div>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default hospitalTabView;
