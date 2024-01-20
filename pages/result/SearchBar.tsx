import React from 'react';
import Button from '../components/button';
import * as Fa from 'react-icons/fa';
import styles from './SearchBar.module.css';

const SearchBar = () => {
    const onSubmit = (e: any) => {
        console.log(e);
    };

    return (
        <div className={styles.searchBar}>
            <div className={styles.input}>
                <input className={styles.locationInput} placeholder="Search Location" type="text" />
                <div className={styles.middleLine}></div>
                <input className={styles.specialtyInput} placeholder="Search Hospital, Health Centers & Practices" type="text" />
                <div className={styles.searchBarButton}>
                    <Fa.FaSearch />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
