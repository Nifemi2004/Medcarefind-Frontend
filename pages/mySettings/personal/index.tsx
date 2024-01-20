import React from 'react';
import styles from "./index.module.css"
import Header from '../../components/Header/Header';
import * as Fa from "react-icons/fa"
import AppConfig from '../../../layout/AppConfig';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import type { Page } from '../../../types/types';

const personal: Page = () => {
    return (
        <div>
            <Header/>
            <div>
                <div>
                    <div>
                        <div className={styles.iconContainer}>
                            <Fa.FaUserPlus className={styles.icon} />
                        </div>
                    </div>
                    <div>
                        Personal Details
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

personal.getLayout = function getLayout(page: any) {
    return (
        <React.Fragment>
            {page}
            <AppConfig minimal />
        </React.Fragment>
    );
};

export default personal;
