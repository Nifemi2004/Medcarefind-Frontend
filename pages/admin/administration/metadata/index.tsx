import React from 'react';
import { Menu } from 'primereact/menu';
import { menuItems } from './metadataitem';

const metadata = () => {
    return (
        <>
            <div className="col-12 md:col-12" style={{ padding: 20 }}>
                <div className="grid p-fluid column">
                    <div className="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-4">
                        <h5 style={{ paddingLeft: 10 }}>Hospital</h5>
                        <Menu className="w-full" model={menuItems().hospital} />
                    </div>
                    <div className="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-4">
                        <h5 style={{ paddingLeft: 10 }}>Location</h5>
                        <Menu className="w-full" model={menuItems().location} />
                    </div>
                    <div className="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-4">
                        <h5 style={{ paddingLeft: 10 }}>Specialist</h5>
                        <Menu className="w-full" model={menuItems().specialist} />
                    </div>
                    <div className="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-4">
                        <h5 style={{ paddingLeft: 10 }}>Symptoms</h5>
                        <Menu className="w-full" model={menuItems().symptoms} />
                    </div>
                    <div className="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-4">
                        <h5 style={{ paddingLeft: 10 }}>Specialty</h5>
                        <Menu className="w-full" model={menuItems().specialty} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default metadata;
