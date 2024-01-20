import React from 'react';
import styles from './Filters.module.css';

const Filters = () => {
    const filters = [{ name: 'Rating' }, { name: 'Specialty' }, { name: 'Top Rated' }, { name: 'Condition' }, { name: 'City' }, { name: 'Country' }, { name: 'All Filters' }];

    return (
        <div>
            <div className={styles.results}>
                <div className={styles.breadcrump}>
                    <p>Home</p> <p>/</p> <p>Search</p>
                </div>
                <div className={styles.total}>
                    <h2>5000 Hospitals</h2>
                </div>
            </div>
            <div className={styles.filter}>
                {filters.map((item, index) => (
                    <div className={styles.filtersContainer}>
                        <p key={index}>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filters;
