import React from 'react';
import { Rating } from 'primereact/rating';
import styles from './Location.module.css';
import * as Fa from 'react-icons/fa';
import { Fancybox } from '@fancyapps/ui';

const Location = () => {
    return (
        <>
            <div className={styles.locationContainer}>
                <div className={styles.location}>
                    <div className={styles.locationDetails}>
                        <div className={styles.locationInfo}>
                            <div>
                                <h4>Centrifuge Group</h4>
                            </div>
                            <div className={styles.rating}>
                                <Rating value={5} readOnly cancel={false} /> (15)
                            </div>
                            <div className={styles.address}>
                                <Fa.FaLocationArrow /> Samuel Ademulegun Street, Abuja
                            </div>
                            <div className={styles.directionLink}>Get Direction</div>
                        </div>
                        <div>
                            <a href="/Dukeuniversity.png" data-fancybox="gallery2" className={styles.imageRouter}>
                                <img src="/Dukeuniversity.png" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.timeAndDay}>
                        <div className={styles.days}>
                            <h5>Mon - Sat</h5>
                        </div>
                        <div className={styles.time}>
                            <p>10:00 AM - 2:00 PM</p>
                            <p>4:00 PM - 9:00 PM</p>
                        </div>
                    </div>
                </div>
                <div className={styles.location}>
                    <div className={styles.locationDetails}>
                        <div className={styles.locationInfo}>
                            <div>
                                <h4>Centrifuge Group</h4>
                            </div>
                            <div className={styles.rating}>
                                <Rating value={5} readOnly cancel={false} /> (15)
                            </div>
                            <div className={styles.address}>
                                <Fa.FaLocationArrow /> Samuel Ademulegun Street, Lagos
                            </div>
                            <div className={styles.directionLink}>Get Direction</div>
                        </div>
                        <div>
                            <a href="/Dukeuniversity.png" data-fancybox="gallery2" className={styles.imageRouter}>
                                <img src="/Dukeuniversity.png" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.timeAndDay}>
                        <div className={styles.days}>
                            <h5>Mon - Sat</h5>
                        </div>
                        <div className={styles.time}>
                            <p>10:00 AM - 2:00 PM</p>
                            <p>4:00 PM - 9:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Location;
