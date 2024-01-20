import React from 'react';
import AppConfig from '../../layout/AppConfig';
import Header from '../components/Header/Header';
import SearchBar from './SearchBar';
import Filters from './Filters';
import HospitalItems from './HospitalItems';
import Footer from '../landingPage/footer';

const result = () => {
    return (
        <>
            <div style={{ fontFamily: 'Josefin Sans' }}>
                <Header />
                <SearchBar />
                <Filters />
                <HospitalItems />
                <Footer/>
            </div>
        </>
    );
};

result.getLayout = function getLayout(page: any) {
    return (
        <React.Fragment>
            {page}
            <AppConfig minimal />
        </React.Fragment>
    );
};

export default result;
