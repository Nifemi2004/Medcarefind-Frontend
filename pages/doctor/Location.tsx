import React from 'react';
import styles from './Location.module.css';

const Location = () => {
    const locations = [
        {
            name: 'Duke University Hospital',
            subHospitals: [
                {
                    name: 'Duke University Oncology Hospital',
                    address: '125 Paterson St New Brunswick, NJ 08901',
                    phoneNumber: '08012345678'
                },
                {
                    name: 'Duke University Dermatology Hospital',
                    address: '125 PaterFather St New Peckham, NY 08905',
                    phoneNumber: '09087654321'
                }
            ]
        },
        {
            name: 'Garki Hospital',
            subHospitals: [
                {
                    name: 'Garki General Hospital',
                    address: 'No. 7, Thompson Street, Garki ',
                },
            ]
        },
        {
            name: 'Zenith Medical Centre',
            subHospitals: [
                {
                    name: 'Zenith Medical & Kidney Centre',
                    address: 'No. 5 Atom Kpera Close Off, Abdulmumini, Gudu, Abuja',
                },

            ]
        },
    ];

    return (
        <div>
            {locations.map((item, index) => (
                <div className={styles.locationContainer} key={index}>
                    <div>
                        <div className={styles.mainText}>{item.name}</div>
                        {item.subHospitals.map((item, index) => (
                            <div className={styles.subHospitalAndNumber}>
                                <div className={styles.subHospitalAndButton}>
                                    <div className={styles.subHospital}>
                                        <h6>{item.name}</h6>
                                        <p>{item.address}</p>
                                    </div>
                                    <div className={styles.buttonContainer}>
                                        <div className={styles.button}>Direction</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Location;
