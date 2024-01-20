import React from 'react';
import styles from './Details.module.css';
import * as Fa from 'react-icons/fa';
import Button from '../components/button';
import TabView from '../components/Tabview';
import { Rating } from 'primereact/rating';
import Aboutme from './Aboutme';
import Affliated from './Affliated';
import Review from './Review';
import Location from './Location';

const Details = () => {
    const onSubmit = (e: any) => {
        console.log(e);
    };

    const tabs = [
        {
            title: 'About Me',
            content: <Aboutme/>
        },

        {
            title: 'Affliated Hospitals',
            content: <Affliated/>
        },
        {
            title: 'Ratings/Reviews',
            content: <Review/>  
        },

        {
            title: 'Location',
            content: <Location/>
        }
    ];

    return (
        <div className={styles.detailsWrapper}>
            <div className={styles.totalDetailsWrapper}>
                <div className={styles.totalDetails}>
                    <div className={styles.imageAndDetails}>
                        <div className={styles.imageContainer}>
                            <img className={styles.image} src="/Specialist.png" alt="Doctor" />
                        </div>
                        <div className={styles.detailContainer}>
                            <div className={styles.nameAndRating}>
                                <h2>Dr. Sokooya Nifemi</h2>
                                <h5>Dermatology • Female</h5>
                                <div>
                                    <Rating value={5} readOnly cancel={false} />
                                </div>
                                <div></div>
                                <div className={styles.descriptionContainer}>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut fringilla nulla. Duis porta finibus turpis eu laoreet. Curabitur interdum finibus vulputate. Vestibulum dictum lectus in porta ultrices. Cras
                                        faucibus felis
                                    </p>
                                </div>
                            </div>
                            <div className={styles.hospitalDetailsContainer}>
                                <p>
                                    <Fa.FaPhone /> 08012345678
                                </p>
                                <p>
                                    <Fa.FaLocationArrow /> Duke University Hospital
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.detailButtons}>
                        <Button width={10} version={'primary'} type={'submit'} isDisabled={false} height={'auto'} onClick={onSubmit}>
                            Call Hospital
                        </Button>
                        <Button width={10} version={'primary'} type={'submit'} isDisabled={false} height={'auto'} onClick={onSubmit}>
                            Message Hospital
                        </Button>
                    </div> */}
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
