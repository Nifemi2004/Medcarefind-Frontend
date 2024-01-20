import styles from './Header.module.css';
import { React, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import * as Md from 'react-icons/md';
import * as Fa from 'react-icons/fa';
import * as io5 from 'react-icons/io5'
import Link from 'next/link';
import { PanelMenu } from 'primereact/panelmenu';
import items from './dropdown';

const Header = () => {
    const [visible, setVisible] = useState(false);

    return (
        <header>
            <div className={styles.header}>
                <div className={styles.sidebar}>
                    <Sidebar visible={visible} onHide={() => setVisible(false)}>
                        <PanelMenu model={items} className="w-full md:w-25rem" />
                    </Sidebar>
                    <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
                </div>
                <div className={styles.imageContainer}>
                    <Link href={'/'}>
                        <img className={styles.image} src="/medcare.png" alt="Logo" />
                    </Link>
                </div>
                <div className={styles.headerItems}>
                    <div className={styles.dropdown}>
                        <a href="#" className={styles.navLink}>
                            Find a hospital
                        </a>
                        <div className={styles.megaBox}>
                            <div className={styles.content}>
                                <div className={styles.row}>
                                    <header>
                                        Hospital by specialty
                                        <hr />
                                    </header>
                                    <ul className={styles.megaLinks}>
                                        <li>
                                            <Link
                                                style={{
                                                    textDecoration: 'none'
                                                }}
                                                href={'#'}
                                            >
                                                Internal medicine
                                            </Link>
                                        </li>
                                        <li>
                                            <Link style={{ textDecoration: 'none' }} href={'#'}>
                                                Paediatrics
                                            </Link>
                                        </li>
                                        <li>
                                            <Link style={{ textDecoration: 'none' }} href={'#'}>
                                                Hepatology
                                            </Link>
                                        </li>
                                        <li>
                                            <Link style={{ textDecoration: 'none' }} href={'#'}>
                                                Pediatric Rheumatology
                                            </Link>
                                        </li>
                                        <li>
                                            <Link style={{ textDecoration: 'none' }} href={'#'}>
                                                Geriatrics
                                            </Link>
                                        </li>
                                        <li>
                                            <Link style={{ textDecoration: 'none' }} href={'#'}>
                                                <div className={styles.seeMore}>
                                                    <div>See More</div>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.row}>
                                    <header>
                                        Hospital by location
                                        <hr />
                                    </header>
                                    <ul className={styles.megaLinks}>
                                        <li>
                                            <Link href={'#'}>Nigeria</Link>
                                        </li>
                                        <li>
                                            <Link href={'#'}>India</Link>
                                        </li>
                                        <li>
                                            <Link href={'#'}>USA</Link>
                                        </li>
                                        <li>
                                            <Link href={'#'}>Japan</Link>
                                        </li>
                                        <li>
                                            <Link href={'#'}>Ghana</Link>
                                        </li>
                                        <li>
                                            <Link style={{ textDecoration: 'none' }} href={'#'}>
                                                <div className={styles.seeMore}>
                                                    <div>See More</div>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.row}>
                                    <header>
                                        Review and Rating
                                        <hr />
                                    </header>
                                    <ul className={styles.megaLinks}>
                                        <li>
                                            <Link href={'#'}>Internal medicine</Link>
                                        </li>
                                        <li>
                                            <Link href={'#'}>Paediatrics</Link>
                                        </li>
                                        <li>
                                            <Link href={'#'}>Hepatology</Link>
                                        </li>
                                        <li>
                                            <Link href={'#'}>Pediatric Rheumatology</Link>
                                        </li>
                                        <li>
                                            <Link href={'#'}>Geriatrics</Link>
                                        </li>
                                        <li>
                                            <Link style={{ textDecoration: 'none' }} href={'#'}>
                                                <div className={styles.seeMore}>
                                                    <div>See More</div>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.row}>
                                    <header>
                                        Awards
                                        <hr />
                                    </header>
                                    <ul className={styles.megaLinks}>
                                        <li>
                                            <Link href={'#'}>Internal medicine</Link>
                                        </li>
                                        <li>
                                            <Link href={'#'}>Paediatrics</Link>
                                        </li>
                                        <li>
                                            <Link href={'#'}>Hepatology</Link>
                                        </li>
                                        <li>
                                            <Link href={'#'}>Pediatric Rheumatology</Link>
                                        </li>
                                        <li>
                                            <Link href={'#'}>Geriatrics</Link>
                                        </li>
                                        <li>
                                            <Link style={{ textDecoration: 'none' }} href={'#'}>
                                                <div className={styles.seeMore}>
                                                    <div>See More</div>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.dropdown}>Health Care</div>
                </div>
                <div className={styles.loginAndMessage}>
                    <Link href={'/message'} style={{textDecoration: 'none', color: 'black'}}>
                        <io5.IoChatbubblesOutline className={styles.icon}/>
                    </Link>
                    <Link style={{ textDecoration: 'none', color: 'black' }} href={'/login'}>
                        <div className={styles.login}>
                            <div>
                                <Md.MdLogin />
                            </div>
                            <div>Log in</div>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
