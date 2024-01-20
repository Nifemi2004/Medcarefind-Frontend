import React from 'react';
import Header from '../components/Header/Header';
import AppConfig from '../../layout/AppConfig';
import styles from './index.module.css';
import Details from './Details';
import Footer from '../landingPage/footer';

const hospitalDetail = () => {
    return (
        <>
            <Header />
            <div className={styles.results}>
                <div className={styles.breadcrump}>
                    <p>Home</p> <p>/</p> <p>Search</p>
                </div>
                <div className={styles.total}>
                    <h2>Hospital Detail</h2>
                </div>
            </div>
            <Details/>
            <Footer/>
        </>
    );
};

hospitalDetail.getLayout = function getLayout(page: any) {
    return (
        <React.Fragment>
            {page}
            <AppConfig minimal />
        </React.Fragment>
    );
};

export default hospitalDetail;
