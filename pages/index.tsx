import ClinicAndSpecialties from './landingPage/clinicAndSpecialties';
import Header from './components/Header/Header';
import Search from './landingPage/search';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import BestHospitals from './landingPage/bestHospitals';
import YoutubeVideo from './landingPage/youtubeVideo';
import Specialist from './landingPage/specialist';
import Steps from './landingPage/steps';
import Footer from './landingPage/footer';
import type { Page } from '../types/types';
import React from 'react';
import AppConfig from '../layout/AppConfig';

const Home: Page = () => {
    return (
        <>
            <div style={{fontFamily: 'Josefin Sans'}}>
                <Header />
                <Search />
                <ClinicAndSpecialties />
                <BestHospitals />
                <YoutubeVideo />
                <Specialist />
                <Steps />
                <Footer />
            </div>
        </>
    );
};

Home.getLayout = function getLayout(page: any) {
    return (
        <React.Fragment>
            {page}
            <AppConfig minimal />
        </React.Fragment>
    );
};

export default Home;
