import React, { useEffect, useState } from 'react';
import styles from './Details.module.css';
import * as Fa from 'react-icons/fa';
import Button from '../components/button';
import TabView from '../components/Tabview';
import Navbar from './Navbar';
import { Rating } from 'primereact/rating';
import Ratings from './Ratings';
import Overview from './Overview';
import Location from './Location';
import Providers from './Providers';
import HospitalQuality from './HospitalQuality';
import Link from 'next/link';

const Details = () => {
    const [buttonContent, setButtonContent] = useState('Call medcarefind');

    const onSubmit1 = (e: any) => {
        setButtonContent('09012345678');
    };

    useEffect(() => {
        setButtonContent('Call Medcarefind');
    }, []);

    const tabs = [
        {
            title: 'Overview',
            content: <Overview />
        },
        {
            title: 'Providers',
            content: <Providers />
        },

        {
            title: 'Hospital Quality',
            content: <HospitalQuality />
        },
        {
            title: 'Reviews and Rating',
            content: <Ratings />
        },

        {
            title: 'Location',
            content: <Location />
        }
    ];

    return (
        <div className={styles.detailsWrapper}>
            <div className={styles.totalDetailsWrapper}>
                <div className={styles.totalDetails}>
                    <div className={styles.imageAndDetails}>
                        <div className={styles.imageContainer}>
                            <img className={styles.image} src="/Dukeuniversity.png" alt="Hospital" />
                        </div>
                        <div className={styles.detailContainer}>
                            <div className={styles.nameAndRating}>
                                <h5>Duke University</h5>
                                <h5>Oncology</h5>
                                <div>
                                    <Rating value={5} readOnly cancel={false} />
                                </div>
                            </div>
                            <div className={styles.hospitalDetailsContainer}>
                                <p>
                                    <Fa.FaPhone /> 08012345678
                                </p>
                                <p>
                                    <Fa.FaLocationArrow /> Anywhere
                                </p>
                                <p>
                                    <Fa.FaDoorOpen /> Anytime
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.detailButtons}>
                        <Button width={20} version={'primary'} type={'submit'} isDisabled={false} height={'auto'} onClick={onSubmit1}>
                            {buttonContent}
                        </Button>
                        <Link href={'/message'}>
                            <Button width={20} version={'primary'} type={'submit'} isDisabled={false} height={'auto'} onClick={() => console.log('ok')}>
                                Message Medcarefind
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.1431275330197!2d7.484946975077766!3d9.050706491011486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0ba3dc0ba6db%3A0xd847e247eb19c758!2sCentrifuge%20Information%20Technology%20Limited!5e0!3m2!1sen!2sng!4v1691916433263!5m2!1sen!2sng"
                            width="600"
                            height="450"
                            className={styles.map}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Description</h3>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut fringilla nulla. Duis porta finibus turpis eu laoreet. Curabitur interdum finibus vulputate. Vestibulum dictum lectus in porta ultrices. Cras faucibus
                            felis
                        </p>
                    </div>
                </div>
            </div>

            {/* <div className={styles.content}>
                <div id="Overview" className={styles.gap}></div>
                <h1>Overview</h1>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ante dignissim lorem egestas aliquet. In non suscipit nisi, id convallis neque. Proin at ipsum ut lectus ornare euismod ut quis dui. In hac habitasse platea
                dictumst. Praesent aliquet sem ac libero vulputate, et elementum tortor lacinia. Aliquam non diam in sem facilisis ornare at non turpis. Morbi a porttitor purus, id pulvinar dolor. Pellentesque habitant morbi tristique senectus et
                netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus venenatis metus leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut in
                lacinia arcu, id aliquet nisi. Nunc gravida consectetur urna, id dignissim erat lobortis a. Donec lacinia purus et condimentum malesuada. Quisque vulputate quam et diam consequat porttitor. Phasellus vestibulum sem et orci euismod, a
                finibus risus cursus. Aliquam congue vitae nulla a convallis. Fusce in odio quis felis scelerisque pulvinar non in odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer ac hendrerit enim,
                id bibendum nulla. Donec sollicitudin pellentesque interdum. In suscipit hendrerit ullamcorper
            </div>
            <div className={styles.content}>
                <div id="Location" className={styles.gap}></div>

            </div>
            <div className={styles.content}>
                <div id="Review" className={styles.gap}></div>
                <h1>Review</h1>
                <Ratings/>
            </div>
            <div className={styles.content}>
                <div id="Providers" className={styles.gap}></div>
                <h1>Providers</h1>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ante dignissim lorem egestas aliquet. In non suscipit nisi, id convallis neque. Proin at ipsum ut lectus ornare euismod ut quis dui. In hac habitasse platea
                dictumst. Praesent aliquet sem ac libero vulputate, et elementum tortor lacinia. Aliquam non diam in sem facilisis ornare at non turpis. Morbi a porttitor purus, id pulvinar dolor. Pellentesque habitant morbi tristique senectus et
                netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus venenatis metus leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut in
                lacinia arcu, id aliquet nisi. Nunc gravida consectetur urna, id dignissim erat lobortis a. Donec lacinia purus et condimentum malesuada. Quisque vulputate quam et diam consequat porttitor. Phasellus vestibulum sem et orci euismod, a
                finibus risus cursus. Aliquam congue vitae nulla a convallis. Fusce in odio quis felis scelerisque pulvinar non in odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer ac hendrerit enim,
                id bibendum nulla. Donec sollicitudin pellentesque interdum. In suscipit hendrerit ullamcorper
            </div>
            <div className={styles.content}>
                <div id="Business Hours" className={styles.gap}></div>
                <h1>Business Hours</h1>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ante dignissim lorem egestas aliquet. In non suscipit nisi, id convallis neque. Proin at ipsum ut lectus ornare euismod ut quis dui. In hac habitasse platea
                dictumst. Praesent aliquet sem ac libero vulputate, et elementum tortor lacinia. Aliquam non diam in sem facilisis ornare at non turpis. Morbi a porttitor purus, id pulvinar dolor. Pellentesque habitant morbi tristique senectus et
                netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus venenatis metus leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut in
                lacinia arcu, id aliquet nisi. Nunc gravida consectetur urna, id dignissim erat lobortis a. Donec lacinia purus et condimentum malesuada. Quisque vulputate quam et diam consequat porttitor. Phasellus vestibulum sem et orci euismod, a
                finibus risus cursus. Aliquam congue vitae nulla a convallis. Fusce in odio quis felis scelerisque pulvinar non in odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer ac hendrerit enim,
                id bibendum nulla. Donec sollicitudin pellentesque interdum. In suscipit hendrerit ullamcorper
            </div> */}
            <div>
                <TabView tabs={tabs} />
            </div>
        </div>
    );
};

export default Details;
