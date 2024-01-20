import React from 'react';
import styles from './HospitalItems.module.css';
import * as Fa from 'react-icons/fa';
import Button from '../components/button';
import { Rating } from 'primereact/rating';
import Link from 'next/link';

const hospitals = [
    {
        url: '/Dukeuniversity.png',
        name: 'Duke University Hospital',
        speciality: 'Oncology',
        stars: 3,
        phoneNumber: '08012345678',
        location: '123 Anywhere Street, Anywhere Country',
        openingTime: '8am'
    },
    {
        url: '/Dukeuniversity.png',
        name: 'Duke University Hospital',
        speciality: 'Oncology',
        stars: 3,
        phoneNumber: '08012345678',
        location: '123 Anywhere Street, Anywhere Country',
        openingTime: '8am'
    },
    {
        url: '/Dukeuniversity.png',
        name: 'Duke University Hospital',
        speciality: 'Oncology',
        stars: 3,
        phoneNumber: '08012345678',
        location: '123 Anywhere Street, Anywhere Country',
        openingTime: '8am'
    },
    {
        url: '/Dukeuniversity.png',
        name: 'Duke University Hospital',
        speciality: 'Oncology',
        stars: 3,
        phoneNumber: '08012345678',
        location: '123 Anywhere Street, Anywhere Country',
        openingTime: '8am'
    },
    {
        url: '/Dukeuniversity.png',
        name: 'Duke University Hospital',
        speciality: 'Oncology',
        stars: 3,
        phoneNumber: '08012345678',
        location: '123 Anywhere Street, Anywhere Country',
        openingTime: '8am'
    },
    {
        url: '/Dukeuniversity.png',
        name: 'Duke University Hospital',
        speciality: 'Oncology',
        stars: 3,
        phoneNumber: '08012345678',
        location: '123 Anywhere Street, Anywhere Country',
        openingTime: '8am'
    }
];

const HospitalItems = () => {
    const onSubmit = (e: any) => {
        console.log(e);
    };
    return (
        <>
            {hospitals.map((item, index) => (
                <div key={index} className={styles.hospitalItems}>
                    <div className={styles.hospitalItemsContainer}>
                        <div className={styles.imageAndDetails}>
                            <div className={styles.imageContainer}>
                                <img className={styles.image} src={item.url} alt="Hospital" />
                            </div>
                            <div className={styles.detailContainer}>
                                <div className={styles.nameAndRating}>
                                    <h5>{item.name}</h5>
                                    <h5>{item.speciality}</h5>
                                    <h5 className={styles.stars}>
                                        {item.stars} <Rating value={item.stars} readOnly cancel={false} /> (25)
                                    </h5>
                                </div>
                                <div className={styles.hospitalDetailsContainer}>
                                    <p>
                                        <Fa.FaPhone /> {item.phoneNumber}
                                    </p>
                                    <p>
                                        <Fa.FaLocationArrow /> {item.location}
                                    </p>
                                    <p>
                                        <Fa.FaDoorOpen /> {item.openingTime}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.button1}>
                            <Link href={'/hospitalDetail'}>
                                <Button width={10} version={'primary'} type={'submit'} isDisabled={false} height={'auto'} onClick={onSubmit}>
                                    View Profile
                                </Button>
                            </Link>
                        </div>
                        <div className={styles.button2}>
                            <Link href={'/hospitalDetail'}>
                                <Button width={50} version={'primary'} type={'submit'} isDisabled={false} height={'auto'} onClick={onSubmit}>
                                    View Profile
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default HospitalItems;
