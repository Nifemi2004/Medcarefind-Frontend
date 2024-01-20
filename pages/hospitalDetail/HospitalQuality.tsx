import React from 'react';
import styles from './HospitalQuality.module.css';
import ToggleSection from '../components/Toggle';
import { Rating } from 'primereact/rating';
import hospitalrating from './hospitalratings';

const HospitalQuality = () => {
    return (
        <>
            <div>
                <h3>Hospital Quality</h3>
            </div>
            <div className={styles.secondText}>
                <h5>Clinical Ratings</h5>
                <p>Research hospital performance and talk to your doctor about what's right for you</p>
            </div>
            {hospitalrating.map((item, index) => (
                <div className={styles.toggleSection} key={index}>
                    <ToggleSection title={item.name}>
                        <div className={styles.bigScreen}>
                            <div className={styles.wholeRatingsWrapper}>
                                <h6>Compilation Based Ratings</h6>
                                {item.complication.map((item, index) => (
                                    <div key={index} className={styles.table}>
                                        <div className={styles.firstTable}>
                                            <div>Procedure/Condition</div>
                                            <div>In Hospital</div>
                                            <div></div>
                                        </div>
                                        <hr className={styles.horizontalRule} />

                                        <div className={styles.conditionRating}>
                                            <div>{item.procedureName}</div>
                                            <div className={styles.ratingContainer}>
                                                <Rating value={item.inHouse.star} readOnly cancel={false} />
                                                <div>{item.inHouse.comment}</div>
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {item.mortality.length === 0 ? (
                                <div></div>
                            ) : (
                                <div className={styles.wholeRatingsWrapper}>
                                    <h6>Mortality Based Ratings</h6>
                                    {item.mortality.map((item, index) => (
                                        <div key={index} className={styles.table}>
                                            <div className={styles.firstTable}>
                                                <div>Procedure/Condition</div>
                                                <div>Mortality In Hospital</div>
                                                <div>Mortality within 30 days </div>
                                            </div>
                                            <hr className={styles.horizontalRule} />

                                            <div className={styles.conditionRating}>
                                                <div>{item.procedureName}</div>
                                                <div className={styles.ratingContainer}>
                                                    <Rating value={item.inHouse.star} readOnly cancel={false} />
                                                    <div>{item.inHouse.comment}</div>
                                                </div>
                                                <div className={styles.ratingContainer}>
                                                    <Rating value={item.thirtyDays.star} readOnly cancel={false} />
                                                    <div>{item.thirtyDays.comment}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.smallScreen}>
                            <div className={styles.wholeRatingsWrapper}>
                                <h6>Compilation Based Ratings</h6>
                                <div className={styles.firstTable}>
                                    <div>Procedure/Condition</div>
                                </div>
                                <hr className={styles.horizontalRule} />
                                {item.complication.map((item, index) => (
                                    <div key={index} className={styles.smallTable}>
                                        <div className={styles.smallConditionRating}>
                                            <div>{item.procedureName}</div>
                                            <div className={styles.smallRatingContainer}>
                                                <div>In Hospital</div>
                                                <Rating value={item.inHouse.star} readOnly cancel={false} />
                                                <div>{item.inHouse.comment}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {item.mortality.length === 0 ? (
                                <div></div>
                            ) : (
                                <div className={styles.wholeRatingsWrapper}>
                                    <h6>Mortality Based Ratings</h6>
                                    <div className={styles.firstTable}>
                                        <div>Procedure/Condition</div>
                                    </div>
                                    <hr className={styles.horizontalRule} />
                                    {item.mortality.map((item, index) => (
                                        <div key={index} className={styles.table}>
                                            <div className={styles.smallConditionRating}>
                                                <div>{item.procedureName}</div>
                                                <div className={styles.smallRatingContainer}>
                                                    <div>Mortality In Hospital</div>
                                                    <Rating value={item.inHouse.star} readOnly cancel={false} />
                                                    <div>{item.inHouse.comment}</div>
                                                </div>
                                                <div className={styles.smallRatingContainer}>
                                                    <div>Mortality within 30 days </div>
                                                    <Rating value={item.thirtyDays.star} readOnly cancel={false} />
                                                    <div>{item.thirtyDays.comment}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </ToggleSection>
                </div>
            ))}
        </>
    );
};

export default HospitalQuality;
