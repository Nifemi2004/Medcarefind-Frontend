import React from 'react';
import { useState } from 'react';
import * as Fa from 'react-icons/fa';
import styles from './Providers.module.css';
import { Rating } from 'primereact/rating';
import Link from 'next/link';

const Providers = () => {
    const providers = [
        {
            url: '/specialist.png',
            name: 'Dr. Sokooya Nifemi, Md',
            specialty: 'Dermatology',
            stars: 5,
            ratings: 19
        },
        {
            url: '/specialist.png',
            name: 'Dr. Sokooya Nifemi, Md',
            specialty: 'Dermatology',
            stars: 5,
            ratings: 19
        },
        {
            url: '/specialist.png',
            name: 'Dr. Sokooya Nifemi, Md',
            specialty: 'Dermatology',
            stars: 5,
            ratings: 19
        },
        {
            url: '/specialist.png',
            name: 'Dr. Sokooya Nifemi, Md',
            specialty: 'Dermatology',
            stars: 5,
            ratings: 19
        },
        {
            url: '/specialist.png',
            name: 'Dr. Sokooya Nifemi, Md',
            specialty: 'Dermatology',
            stars: 5,
            ratings: 19
        },
        {
            url: '/specialist.png',
            name: 'Dr. Sokooya Nifemi, Md',
            specialty: 'Dermatology',
            stars: 5,
            ratings: 19
        },
        {
            url: '/specialist.png',
            name: 'Dr. Sokooya Nifemi, Md',
            specialty: 'Dermatology',
            stars: 5,
            ratings: 19
        },
        {
            url: '/specialist.png',
            name: 'Dr. Sokooya Nifemi, Md',
            specialty: 'Dermatology',
            stars: 5,
            ratings: 19
        },
        {
            url: '/specialist.png',
            name: 'Dr. Sokooya Nifemi, Md',
            specialty: 'Dermatology',
            stars: 5,
            ratings: 19
        }
    ];
    return (
        <>
            <div>
                <div className={styles.select}>
                    <h3>Providers</h3>
                    <select name="All Specialties" id="">
                        <option value="">All Specialties</option>
                        <option value="">Oncology</option>
                        <option value="">Dermatology</option>
                        <option value="">More</option>
                    </select>
                </div>
                <Link href={'/doctor'}>
                    <div className={styles.specialist}>
                        {providers.map((item, index) => (
                            <div className={styles.specialistDetail} key={index}>
                                <div className={styles.image}>
                                    <img src={item.url} alt="Specialist image" />
                                </div>
                                <div className={styles.info}>
                                    <h4>{item.name}</h4>
                                    <p>{item.specialty}</p>
                                    <div className={styles.stars}>
                                        <Rating value={item.stars} readOnly cancel={false} /> {item.ratings} Rating
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Providers;
