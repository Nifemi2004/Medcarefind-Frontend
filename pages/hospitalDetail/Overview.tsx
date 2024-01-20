import React from 'react';
import styles from './Overview.module.css';
import ReadMore from '../components/Readmore';

const Overview = () => {
    const experience = [
        {
            date: 'August 2023',
            name: 'Best Hospital in the World',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        },
        {
            date: 'August 2023',
            name: 'Best Hospital in the World',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        },
        {
            date: 'August 2023',
            name: 'Best Hospital in the World',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        }
    ];

    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ante dignissim lorem egestas aliquet. In non suscipit nisi, id convallis neque. Proin at ipsum ut lectus ornare euismod ut quis dui. In hac habitasse plateadictumst. Praesent aliquet sem ac libero vulputate, et elementum tortor lacinia. Aliquam non diam in sem facilisis ornare at non turpis. Morbi a porttitor purus, id pulvinar dolor. Pellentesque habitant morbi tristiquesenectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus venenatis metus leo. Interdum et malesuada fames ac ante ipsum primis infaucibus. Ut in lacinia arcu, id aliquet nisi. Nunc gravida consectetur urna, id dignissim erat lobortis a. Donec lacinia purus et condimentum malesuada. Quisque vulputate quam et diam consequat porttitor. Phasellus vestibulumsem et orci euismod, a finibus risus cursus. Aliquam congue vitae nulla a convallis. Fusce in odio quis felis scelerisque pulvinar non in odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculusmus. Integer ac hendrerit enim, id bibendum nulla. Donec sollicitudin pellentesque interdum. In suscipit hendrerit ullamcorper'

    return (
        <>
            <div className={styles.overview}>
                <div>
                    <h1>About Us</h1>
                    <p className={styles.text}>
                    <ReadMore text={text} maxLength={250} />
                    </p>
                </div>
                <div>
                    <h1>Awards</h1>
                    <div className={styles.experienceBox}>
                        <ul className={styles.experienceList}>
                            {experience.map((item, index) => (
                                <li key={index}>
                                    <div className={styles.experienceUser}>
                                        <div className={styles.beforeCircle}></div>
                                    </div>
                                    <div className={styles.experienceContent}>
                                        <div className={styles.timelineContent}>
                                            <p className={styles.expYear}>{item.date}</p>
                                            <h4 className={styles.expTitle}>{item.name}</h4>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Overview;
