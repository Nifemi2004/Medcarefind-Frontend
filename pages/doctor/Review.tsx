import React, { useState } from 'react';
import styles from './Review.module.css';
import { Rating, RatingChangeEvent } from 'primereact/rating';
import { Dialog } from 'primereact/dialog';
import Link from 'next/link';

const Review = () => {
    interface Rating {
        id?: number;
        url?: string;
        stars?: number;
        review?: string;
        author?: string;
        recommend: string;
    }

    const [value, setValue] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);
    const [textValue, setTextValue] = useState('');

    const handleRatingClick = (value: number) => {
        setValue(value);
        setVisible(true);
    };

    const rating: Rating[] = [
        {
            id: 1,
            url: '/specialist.png',
            stars: 5,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet orci vel nisl mollis euismod. In blandit urna risus, sed ornare lacus blandit non. Sed turpis sapien, sollicitudin sit amet justo et, sagittis aliquam velit Curabitur in sem consectetur, tristique eros ut, feugiat diam',
            author: 'Sokooya Nifemi',
            recommend: ''
        },
        {
            id: 2,
            url: '/specialist.png',
            stars: 5,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet orci vel nisl mollis euismod. In blandit urna risus, sed ornare lacus blandit non. Sed turpis sapien, sollicitudin sit amet justo et, sagittis aliquam velit Curabitur in sem consectetur, tristique eros ut, feugiat diam',
            author: 'Sokooya Nifemi',
            recommend: ''
        },
        {
            id: 3,
            url: '/specialist.png',
            stars: 5,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet orci vel nisl mollis euismod. In blandit urna risus, sed ornare lacus blandit non. Sed turpis sapien, sollicitudin sit amet justo et, sagittis aliquam velit Curabitur in sem consectetur, tristique eros ut, feugiat diam',
            author: 'Sokooya Nifemi',
            recommend: ''
        }
    ];

    return (
        <div className={styles.wholeReviewWrapper}>
            <div className={styles.titleContainer}>Dr. Sokooya Nifemi Review</div>
            <div className={styles.reviewAndNewReview}>
                <div>
                    <p>Likelihood to recommend Dr. Sokooya</p>
                    <div className={styles.ratingTextContainer}>
                        <div>
                            <p className={styles.score}>
                                <strong>4</strong>
                            </p>
                        </div>
                        <div className={styles.ratingStarContainer}>
                            <Rating className={styles.stars} value={4} readOnly cancel={false} />
                            <p>15 ratings</p>
                        </div>
                    </div>
                    <div className={styles.individualStars}>
                        <h5>
                            5 stars <span className={styles.star}>★★★★★</span> 86%
                        </h5>
                        <h5>
                            4 stars <span className={styles.star}>★★★★☆</span> 0%
                        </h5>
                        <h5>
                            3 stars <span className={styles.star}>★★★☆☆</span> 0%
                        </h5>
                        <h5>
                            2 stars <span className={styles.star}>★★☆☆☆</span> 0%
                        </h5>
                        <h5>
                            1 stars <span className={styles.star}>★☆☆☆☆</span> 14%
                        </h5>
                    </div>
                </div>
                <div className={styles.newReview}>
                    <div>
                        <p>MEDCAREFIND</p>
                    </div>
                    <hr />
                    <div>
                        <h5>Leave a Review</h5>
                        <p>How likely are you to recommend Dr. Sokooya?</p>
                        <div className={styles.starRatingContainer}>
                            <Rating value={value} onChange={(e) => handleRatingClick(e.value!)} cancel={false} />
                            <Dialog header="Review" visible={visible} onHide={() => setVisible(false)} style={{ width: '50vw' }} maximizable breakpoints={{ '960px': '75vw', '641px': '90vw', '376px': '100vw' }}>
                                <div className={styles.fullReviewQuestionsContainer}>
                                    <div className={styles.header}>
                                        <img className={styles.specialistImage} src="./specialist.png" alt="" />
                                        <h2>Your review of Dr. Sokooya</h2>
                                    </div>
                                    <hr className={styles.rule} />
                                    <div>
                                        <h5>How likely are you to recommend Dr. Sokooya?*</h5>
                                        <Rating value={value} onChange={(e) => setValue(e.value!)} cancel={false} />
                                    </div>
                                    <div className={styles.formContainer}>
                                        <div className={styles.inputContainer}>
                                            <label htmlFor="">Display Name</label>
                                            <input type="text" />
                                        </div>
                                        <div className={styles.inputContainer}>
                                            <label htmlFor="">Email*</label>
                                            <input type="text" />
                                        </div>
                                        <div className={styles.inputContainer}>
                                            <label htmlFor="">Tell us more about your encounter with the specialist</label>
                                            <textarea name="experience" id="visit" value={textValue} onChange={(e) => setTextValue(e.target.value)} cols={30} rows={10}></textarea>
                                        </div>
                                        <div>
                                            <input className={styles.checkbox} type="checkbox" name="agree" id="" />
                                            <label htmlFor="">I verify that I or my family member have received treatment from this doctor and agree to the MedCareFind User Agreement, Editorial Policy and Privacy Policy.</label>
                                        </div>
                                    </div>

                                    <div>
                                        <button className={styles.formButton}>Save And Continue</button>
                                    </div>
                                </div>
                            </Dialog>
                            <p>Select Rating</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.reviewContainer}>
                {rating.map((item, index) => (
                    <div key={index} className={styles.commentAndReply}>
                        <div className={styles.fullRatingsContainer}>
                            <div>
                                <img className={styles.image} src={item.url} alt="" />
                            </div>
                            <div className={styles.ratingWrapper}>
                                <div className={styles.nameAndRating}>
                                    <div className={styles.nameContainer}>
                                        <h4>{item.author}</h4>
                                        <div className={styles.reviewed}>Reviewed two days ago</div>
                                    </div>
                                    <div className={styles.ratingStars}>
                                        <Rating value={item.stars} readOnly cancel={false} />
                                    </div>
                                </div>
                                <div>{item.review}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.leaveAComment}>
                <h5>Leave a review</h5>
                <p>How was your experience with Dr. Sokooya?</p>
                <div className={styles.reviewAndButton}>
                    <textarea name="experience" value={textValue} onChange={(e) => setTextValue(e.target.value)} id="visit" cols={80} rows={3}></textarea>
                    <button className={styles.formButton} onClick={() => setVisible(true)}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Review;
