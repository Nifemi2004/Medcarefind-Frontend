import React, { useContext, useState } from 'react';
import Header from '../components/Header/Header';
import styles from './index.module.css';
import AppConfig from '../../layout/AppConfig';
import { LayoutContext } from '../../layout/context/layoutcontext';
import type { Page } from '../../types/types';
import * as Fa from 'react-icons/fa';
import { it } from 'node:test';

const mySettings: Page = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const dark = layoutConfig?.colorScheme !== 'light';

    const settingItem = [
        { name: 'Personal Details', firstText: "Update your info and find out how it's used", secondText: 'Manage personal details', },
        { name: 'Preference', firstText: "Change your language, currency, and accessibility requirement", secondText: 'Manage preference' },
        { name: 'Payment Details', firstText: "Securely add or remove payment method", secondText: 'Manage payment details' },
        { name: 'Email Notification', firstText: "Decide What you want to be notified about", secondText: 'Manage email notification' },
        { name: 'Other travellers', firstText: "Add or edit info about the people you're travelling with", secondText: 'Manage travellers' },

    ];

    return (
        <div className={styles.settings}>
            <Header />
            <div className={styles.results}>
                <div className={styles.total}>
                    <h1>Account Settings</h1>
                </div>
                <div className={styles.breadcrump}>
                    <p>Manage your account details </p>
                </div>
            </div>
            <div className={styles.settingsItemWrapper}>
                {settingItem.map((item, index) => (
                    <div key={index} className={styles.settingsItemContainer}>
                        <div>
                            <div className={styles.iconContainer}>
                                <Fa.FaUserPlus className={styles.icon} />
                            </div>
                        </div>
                        <div>
                            <h4>{item.name}</h4>
                            <p>{item.firstText}</p>
                            <p>{item.secondText}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

mySettings.getLayout = function getLayout(page: any) {
    return (
        <React.Fragment>
            {page}
            <AppConfig minimal />
        </React.Fragment>
    );
};

export default mySettings;
