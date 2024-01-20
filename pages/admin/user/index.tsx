import React from 'react';
import { useRouter } from 'next/router';
import { TabView, TabPanel } from 'primereact/tabview';
import { useState } from 'react';
import AppTable from './app';
import UserTable from './user';
import RoleTable from './roles';
import PermissionTable from './permission';
import AssignRoleTable from './assignRoleToUser';

const symptoms = () => {
    const router = useRouter();
    const { activeTab } = router.query;
    const [activeIndex, setActiveIndex] = useState<number>(parseInt(activeTab as string) || 0);

    const handleTabChange = (event: { index: number }) => {
        setActiveIndex(event.index);
        router.push(`/admin/user?activeTab=${event.index}`);
    };
    return (
        <div className="card">
            <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
                <TabPanel header="App">
                    <div>
                        <AppTable/>
                    </div>
                </TabPanel>
                <TabPanel header="Users">
                    <div>
                        <UserTable/>
                    </div>
                </TabPanel>
                <TabPanel header="Roles">
                    <div>
                        <RoleTable/>
                    </div>
                </TabPanel>
                <TabPanel header="Permissions">
                    <div>
                        <PermissionTable/>
                    </div>
                </TabPanel>
                <TabPanel header="Assign Role To Users">
                    <div>
                      <AssignRoleTable/>
                    </div>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default symptoms;
