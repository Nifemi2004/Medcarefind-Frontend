import React from 'react';
import Header from '../components/Header/Header';
import AppConfig from '../../layout/AppConfig';
import styles from './index.module.css';
import Footer from '../landingPage/footer';
import Details from './Details';

const doctor = () => {
    return (
        <div>
            <Header />
            <div>
                <Details />
            </div>
            <Footer />
        </div>
    );
};

doctor.getLayout = function getLayout(page: any) {
    return (
        <React.Fragment>
            {page}
            <AppConfig minimal />
        </React.Fragment>
    );
};

export default doctor;
