import React from 'react';
import { Menu } from 'primereact/menu';
import { menuItems } from './usermanageitem';

const userManagement = () => {
    return (
        <div className="col-12 md:col-12" style={{ padding: 20 }}>
            <div className="grid p-fluid column"> 
                <div className="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-4">
                    <h5 style={{ paddingLeft: 10 }}>User Management</h5>
                    <Menu className="w-full" model={menuItems().user} />
                </div>
                <div className="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-4">
                    <h5 style={{ paddingLeft: 10 }}>Report Management</h5>
                    <Menu className="w-full" model={menuItems().report} />
                </div>
                <div className="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-4">
                    <h5 style={{ paddingLeft: 10 }}>Configuration Management</h5>
                    <Menu className="w-full" model={menuItems().configure} />
                </div>
            </div>
        </div>
    );
};

export default userManagement;
