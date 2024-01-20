import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TabView, TabPanel } from 'primereact/tabview';
import SpecialistTable from './specialist';
import LanguageTable from './language';
import GenderTable from './gender';

const specialist = () => {
    const router = useRouter();
    const { activeTab } = router.query;
    const [activeIndex, setActiveIndex] = useState<number>(parseInt(activeTab as string) || 0);

    const handleTabChange = (event: { index: number }) => {
        setActiveIndex(event.index);
        router.push(`/admin/specialist?activeTab=${event.index}`);
    };
    return (
        <div className="card">
            <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
                <TabPanel header="Specialist">
                    <div>
                        <SpecialistTable />
                    </div>
                </TabPanel>
                <TabPanel header="Language Spoken">
                    <div>
                        <LanguageTable />
                    </div>
                </TabPanel>
                <TabPanel header="Gender">
                    <div>
                        <GenderTable />
                    </div>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default specialist;
