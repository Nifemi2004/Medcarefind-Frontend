import React, { useState } from 'react';
import styles from './Aboutme.module.css';
import ReadMore from '../components/Readmore';
import * as Fa from 'react-icons/fa';

const Aboutme = () => {
    const question = [
        {
            question: 'Communicate via email?',
            description: 'Does Dr. Sokooya communicate via email?'
        },
        {
            question: 'Offer an online patient portal?',
            description: 'Does Dr. Sokooya offer an online patient portal?'
        },
        {
            question: 'Have free onsite parking?',
            description: 'Does Dr. Sokooya have free onsite parking?'
        },
        {
            question: 'Offer weekend visits?',
            description: 'Does Dr. Sokooya offer weekend visits?'
        },
        {
            question: 'Offer evening visits?',
            description: 'Does Dr. Sokooya offer evening visits?'
        }
    ];

    const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
    const [isEducationVisible, setIsEducationVisible] = useState(false);

    const handleAnswerClick = (index:number) => {
        if (!clickedIndexes.includes(index)) {
            setClickedIndexes([...clickedIndexes, index]);
        }
    };

    const toggleEducationSection = () => {
        setIsEducationVisible(!isEducationVisible);
    };

    const [isLanguageVisible, setIsLanguageVisible] = useState(false);

    const toggleLanguageSection = () => {
        setIsLanguageVisible(!isLanguageVisible);
    };

    const [isAwardVisible, setIsAwardVisible] = useState(false);

    const toggleAwardSection = () => {
        setIsAwardVisible(!isAwardVisible);
    };

    const biography =
        'Integer auctor purus ut lacus vestibulum accumsan. Cras dolor nibh, condimentum ut rutrum sed, posuere ut sem. Mauris ac vestibulum diam. Fusce vel risus sit amet justo imperdiet mollis eget nec arcu. Phasellus vulputate lectus et lacus molestie porta. In in venenatis justo. Nam eu felis eget nulla tristique venenatis. Suspendisse congue ligula eget eros facilisis, at euismod purus convallis. Nulla ac maximus justo. Etiam vehicula, ante ac ultricies laoreet, est arcu volutpat mi, eget venenatis sem felis sed est. ';

    return (
        <div className={styles.aboutme}>
            <div>
                <h3>About Me</h3>
            </div>
            <div className={styles.aboutmeWrapper}>
                <div>
                    <h5>Biography</h5>
                    <ReadMore text={biography} maxLength={250} />
                </div>
                <hr />
                <div>
                    <h5>Specialties</h5>
                    <p>
                        <Fa.FaFirstAid /> Dermatology
                    </p>
                </div>
                <hr />
                <div>
                    <h5>Certifications</h5>
                    <p>Nigerian Board of Medical Specialties</p>
                    <p>Nigerian Board of Internal Medicine</p>
                </div>
                <hr />
                <div>
                    <div className={styles.iconContainer} onClick={toggleEducationSection}>
                        <h5>Education</h5>
                        {isEducationVisible ? <Fa.FaTimesCircle className={styles.toggleIcon} /> : <Fa.FaPlusCircle className={styles.toggleIcon} />}
                    </div>

                    <div className={`${styles.section} ${isEducationVisible ? styles.visible : ''}`}>
                        <div className={styles.educationContainer}>
                            <p>1983</p>
                            <div>NEW YORK MEDICAL COLLEGE</div>
                            <h6>Medical School</h6>
                        </div>
                    </div>
                </div>
                <hr />
                <div>
                    <div className={styles.iconContainer} onClick={toggleLanguageSection}>
                        <h5>Languages</h5>
                        {isLanguageVisible ? <Fa.FaTimesCircle className={styles.toggleIcon} /> : <Fa.FaPlusCircle className={styles.toggleIcon} />}
                    </div>

                    <div className={`${styles.section} ${isLanguageVisible ? styles.visible : ''}`}>
                        <div className={styles.languageContainer}>
                            <div className={styles.languageList}>
                                <Fa.FaLanguage /> <h6>English</h6>
                            </div>
                            <div className={styles.languageList}>
                                <Fa.FaLanguage /> <h6>Yoruba</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div>
                    <div className={styles.iconContainer} onClick={toggleAwardSection}>
                        <h5>Awards</h5>
                        {isAwardVisible ? <Fa.FaTimesCircle className={styles.toggleIcon} /> : <Fa.FaPlusCircle className={styles.toggleIcon} />}
                    </div>

                    <div className={`${styles.section} ${isAwardVisible ? styles.visible : ''}`}>
                        <div className={styles.languageContainer}>
                            <h6>
                                <Fa.FaAward /> Nigerian Minstry of Specialist Honor Roll
                            </h6>
                        </div>
                    </div>
                </div>
                <hr />

                <div className={styles.questionContainer}>
                    <div className={styles.questionText}>Common Questions and Answers</div>
                    {question.map((item, index) => (
                        <div className={styles.questions} key={index}>
                            <div>
                                <h6>{item.question}</h6>
                                <p>{item.description}</p>
                                {clickedIndexes.includes(index) ? (
                                    <div>Thank You!</div>
                                ) : (
                                    <div className={styles.buttonContainer}>
                                        <div className={styles.button} onClick={() => handleAnswerClick(index)}>
                                            Yes
                                        </div>
                                        <div className={styles.buttonRed} onClick={() => handleAnswerClick(index)}>
                                            No
                                        </div>
                                        <div className={styles.button} onClick={() => handleAnswerClick(index)}>
                                            I don't know
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <hr />
            </div>
        </div>
    );
};

export default Aboutme;
