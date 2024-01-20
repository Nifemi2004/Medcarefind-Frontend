import React from 'react';
import styles from './BusinessHours.module.css';

const BusinessHours = () => {
    // const getDate = () => {
    //     let newDate = new Date();
    //     let date_raw = newDate.getDay.toString();
    //     let month_raw = newDate.getMonth().toLocaleString('default', { month: 'long' });

    //     return date_raw + '' + month_raw;
    // };

    return (
        <>
            <div className={styles.hoursContainer}>
                <div className={styles.hours}>
                    <div className={styles.firstRow}>
                        <div className={styles.row}>
                            <div className={styles.bold}>Today</div>
                            <div>Open Now</div>
                        </div>
                        <div className={styles.row}>
                            <div>19 July 2023</div>
                            <div>07:00 AM - 09:00 PM</div>
                        </div>
                    </div>
                    <div>
                        <hr />
                    </div>
                    <div className={styles.secondRow}>
                        <div className={styles.row}>
                            <div className={styles.bold}>Monday</div>
                            <div>07:00 AM - 09:00 PM</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.bold}>Tuesday</div>
                            <div>07:00 AM - 09:00 PM</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.bold}>Wednesday</div>
                            <div>07:00 AM - 09:00 PM</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.bold}>Thursday</div>
                            <div>07:00 AM - 09:00 PM</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.bold}>Friday</div>
                            <div>07:00 AM - 09:00 PM</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.bold}>Saturday</div>
                            <div>07:00 AM - 09:00 PM</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.bold}>Sunday</div>
                            <div>Closed</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BusinessHours;
