import React, { useState } from 'react';
import { Rating, RatingChangeEvent } from 'primereact/rating';
import * as Fa from 'react-icons/fa';
import styles from './Ratings.module.css';
import Link from 'next/link';

const Ratings = () => {
    interface Rating {
        id?: number;
        url?: string;
        stars?: number;
        review?: string;
        author?: string;
        recommend: string;
        comment?: comments[] | undefined;
    }

    interface comments {
        id?: number;
        url?: string;
        stars?: number;
        review?: string;
        author?: string;
        recommend: string;
    }
   const rating: Rating[] = [
    
     {
            id: 1,
            url: '/specialist.png',
            stars: 5,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet orci vel nisl mollis euismod. In blandit urna risus, sed ornare lacus blandit non. Sed turpis sapien, sollicitudin sit amet justo et, sagittis aliquam velit Curabitur in sem consectetur, tristique eros ut, feugiat diam',
            author: 'Sokooya Nifemi',
            recommend: '',
            comment: [
                {
                    id: 1.1,
                    url: '/specialist.png',
                    stars: 1,
                    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet orci vel nisl mollis euismod. In blandit urna risus, sed ornare lacus blandit non. Sed turpis sapien, sollicitudin sit amet justo et, sagittis aliquam velit Curabitur in sem consectetur, tristique eros ut, feugiat diam',
                    author: 'Adebayo Thompson',
                    recommend: ''
                },
            ]
        },
        {
            id: 2,
            url: '/specialist.png',
            stars: 5,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet orci vel nisl mollis euismod. In blandit urna risus, sed ornare lacus blandit non. Sed turpis sapien, sollicitudin sit amet justo et, sagittis aliquam velit Curabitur in sem consectetur, tristique eros ut, feugiat diam',
            author: 'Sokooya Nifemi',
            recommend: '',
            comment: []
        },
        
    ];
    
    const itemColors:any  = {
        '👎🏻 I do not recommend this doctor' : "red",
        '👍🏻 I recommend this doctor' : "green",
        null: "black"
    };
    const [value, setValue] = useState<number | undefined | null>(0);
    const [array, setArray] = useState(rating);
    const [selectedItem, setSelectedItem] = useState(null); 

    const checkRecommendTrue = (key: any) => {
        let currentRating = rating[key];
        const newArray = [...array];

        newArray[key].recommend = '👍🏻 I recommend this doctor';

        setArray(newArray);
        setSelectedItem(key);
    };

    const checkRecommendFalse = (key: any) => {
        let currentRating = rating[key];
        const newArray = [...array];

        newArray[key].recommend = '👎🏻 I do not recommend this doctor';

        setArray(newArray);
    };

    return (
        <>
            <div className={styles.reviewAndNewReview}>
                <div className={styles.commentAndReplyWrapper}>
                    {array.map((item, index) => (
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
                                        <div>
                                            <Rating value={item.stars} readOnly cancel={false} />
                                        </div>
                                    </div>
                                    <div id="thumbsdown"
                                    className={`${styles.item} ${selectedItem === index ? styles.selected : ""}`}
                                    style={{ color: selectedItem === index ? itemColors[item.recommend] : "" }}
                                     >
                                        {item.recommend}
                                    </div>
                                    <div>{item.review}</div>
                                    <div className={styles.replyAndRecommend}>
                                        <Link href={'#writeReview'}>
                                            <div className={styles.reply}>
                                                <Fa.FaReply /> Reply
                                            </div>
                                        </Link>
                                        <div className={styles.recommendContainer}>
                                            <div>Recommend</div>
                                            <div className={styles.buttonGreen} onClick={() => checkRecommendTrue(index)}>
                                                <Fa.FaThumbsUp /> Yes
                                            </div>
                                            <div className={styles.buttonRed} onClick={() => checkRecommendFalse(index)}>
                                                <Fa.FaThumbsDown /> No
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {item.comment?.map((items, index) => (
                                <div key={index} className={styles.fullReplyContainer}>
                                    <div>
                                        <img className={styles.image} src={items.url} alt="" />
                                    </div>
                                    <div className={styles.ratingWrapper}>
                                        <div className={styles.nameAndRating}>
                                            <div className={styles.nameContainer}>
                                                <h4>{items.author}</h4>
                                                <div className={styles.reviewed}>Reviewed two days ago</div>
                                            </div>
                                        </div>
                                        <div>{items.review}</div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className={styles.showAll}>Show All(100)</div>
                </div>
                <div className={styles.newReviewContainer}>
                    <div id="writeReview" className={styles.pusher}></div>
                    <div>
                        <h3>Write a review for Duke University</h3>
                    </div>
                    <div className={styles.rating}>
                        <Rating value={value} onChange={(e: RatingChangeEvent) => setValue(e.value)} cancel={false} />
                    </div>
                    <div className={styles.form}>
                        <div className={styles.input}>
                            <label htmlFor="title">Name</label>
                            <input type="text" />
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="review">Your review</label>
                            <textarea maxLength={100}></textarea>
                            <div className={styles.max}>
                                <p>(Max 200 characters)</p>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <input type="checkbox" name="label" id="" />
                            <label>
                                {' '}
                                I have read and accept <span className={styles.termsAndCondition}>Terms & Conditions</span>
                            </label>
                        </div>
                        <div className={styles.buttonContainer}>
                            <div className={styles.button}>Add Review</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ratings;
