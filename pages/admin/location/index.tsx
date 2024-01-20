import React from 'react';
import { useRouter } from 'next/router';
import { TabView, TabPanel } from 'primereact/tabview';
import { useState } from 'react';
import NationalityTable from './nationality';
import StateTable from './state';

const Location = () => {
    const router = useRouter();
    const { activeTab } = router.query;
    const [activeIndex, setActiveIndex] = useState<number>(parseInt(activeTab as string) || 0);

    const handleTabChange = (event: { index: number }) => {
        setActiveIndex(event.index);
        router.push(`/admin/location?activeTab=${event.index}`);
    };
    return (
        <div className="card">
            <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
                <TabPanel header="Nationality">
                    <div>
                        <NationalityTable />
                    </div>
                </TabPanel>
                <TabPanel header="State/Province">
                    <div>
                        <StateTable />
                    </div>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default Location;
