import React from 'react'
import styles from "./Affliated.module.css"
import { Rating } from 'primereact/rating';
import * as Fa from 'react-icons/fa';

const Affliated = () => {
  return (
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
            </div>
            <div>
                <a href="/Dukeuniversity.png" data-fancybox="gallery2" className={styles.imageRouter}>
                    <img src="/Dukeuniversity.png" />
                </a>
            </div>
        </div>
    </div>
    <div className={styles.location}>
        <div className={styles.locationDetails}>
            <div className={styles.locationInfo}>
                <div>
                    <h4>Thompson Limited</h4>
                </div>
                <div className={styles.rating}>
                    <Rating value={2} readOnly cancel={false} /> (150)
                </div>
                <div className={styles.address}>
                    <Fa.FaLocationArrow /> Samuel Ademulegun Street, Lagos
                </div>
            </div>
            <div>
                <a href="/Dukeuniversity.png" data-fancybox="gallery2" className={styles.imageRouter}>
                    <img src="/Dukeuniversity.png" />
                </a>
            </div>
        </div>
    </div>
</div>  )
}

export default Affliated