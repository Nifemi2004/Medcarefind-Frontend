import { Menu } from 'primereact/menu';
import React from 'react';
import { menuItems } from './hospitalmenuitem';

const hospitalManagement = () => {
    return (
        <div className="col-12 md:col-12" style={{ padding: 20 }}>
            <div className="grid p-fluid column">
                <div className="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-4">
                    <h5 style={{ paddingLeft: 10 }}>Hospital Management</h5>
                    <Menu className="w-full" model={menuItems().user} />
                </div>
            </div>
        </div>
    );
};

export default hospitalManagement;