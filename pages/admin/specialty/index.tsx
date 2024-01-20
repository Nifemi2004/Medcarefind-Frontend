import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TabView, TabPanel } from 'primereact/tabview';
import SpecialtyTable from './specialty';

const specialty = () => {
    const router = useRouter();
    const { activeTab } = router.query;
    const [activeIndex, setActiveIndex] = useState<number>(parseInt(activeTab as string) || 0);

    const handleTabChange = (event: { index: number }) => {
        setActiveIndex(event.index);
        router.push(`/admin/specialty?activeTab=${event.index}`);
    };
    return (
        <div className="card">
            <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
                <TabPanel header="Specialty">
                    <div>
                        <SpecialtyTable/>
                    </div>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default specialty;
