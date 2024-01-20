import styles from './index.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import * as fa from 'react-icons/fa';
import Link from 'next/link';
import type { Page } from '../../../types/types';
import React from 'react';
import AppConfig from '../../../layout/AppConfig';

const Signup = () => {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data: any) => console.log(data);

    return (
        <>
            <div className={styles.signupPage}>
                <div className={styles.firstPart}>
                    <div className={styles.signupContainer}>
                        <div className={styles.logoContainer}>
                            <img className={styles.logo} src="/medcare.png" alt="logo" />
                        </div>
                        <div className={styles.signUpText}>
                            <h3>Register</h3>
                            <h4>Let's Get Started</h4>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.register}>
                                    <div className={styles.formGroup}>
                                        <input
                                            className={styles.option1}
                                            id="firstName"
                                            placeholder="First Name"
                                            type="text"
                                            {...register('firstName', {
                                                required: true,
                                                maxLength: 20
                                            })}
                                        />
                                        {/* {errors.firstName && <span>{errors.firstName.message}</span>} */}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <input className={styles.option1} id="lastName" placeholder="Last Name" type="text" {...register('lastName', { required: true, maxLength: 20 })} />
                                        {/* {errors.lastName && <span>{errors.lastName.message}</span>} */}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <input className={styles.option1} id="username" placeholder="Username" type="text" {...register('username', { required: true, maxLength: 20 })} />
                                        {/* {errors.username && <span>{errors.username.message}</span>} */}
                                    </div>
                                    <div>
                                        <input
                                            className={styles.option1}
                                            id="phoneNumber"
                                            placeholder="Phone Number"
                                            type="number"
                                            {...register('phoneNumber', {
                                                required: true,
                                                maxLength: 11
                                            })}
                                        />
                                        {/* {errors.phoneNumber && (
                    <span>{errors.phoneNumber.message}</span>
                  )} */}
                                    </div>
                                    <div>
                                        <input
                                            className={styles.option1}
                                            id="emailAddress"
                                            placeholder="Email Address"
                                            type="email"
                                            {...register('emailAddress', {
                                                required: true,
                                                maxLength: 50
                                            })}
                                        />
                                        {/* {errors.emailAddress && (
                    <span>{errors.emailAddress.message}</span>
                  )} */}
                                    </div>
                                    <div className={styles.option1}>
                                        <div>
                                            <input
                                                id="password"
                                                placeholder="Password"
                                                type={showPassword1 ? 'text' : 'password'}
                                                {...register('password', {
                                                    required: true,
                                                    maxLength: 20
                                                })}
                                            />
                                            {/* {errors.password && <span>{errors.password.message}</span>} */}
                                        </div>
                                        <div>
                                            <button type="button" onClick={togglePasswordVisibility1} className={styles.passwordToggle}>
                                                {showPassword1 ? <fa.FaEyeSlash /> : <fa.FaEye />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.option1}>
                                        <div>
                                            <input
                                                id="repeatPassword"
                                                placeholder="Repeat Password"
                                                type={showPassword2 ? 'text' : 'password'}
                                                {...register('repeatPassword', {
                                                    required: true,
                                                    maxLength: 20
                                                })}
                                            />
                                            {/* {errors.password && <span>{errors.password.message}</span>} */}
                                        </div>
                                        <div>
                                            <button type="button" onClick={togglePasswordVisibility2} className={styles.passwordToggle}>
                                                {showPassword2 ? <fa.FaEyeSlash /> : <fa.FaEye />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.buttonContainer}>
                                    <div>
                                        <input type="checkbox" name="termsAndCondition" id="termsAndCondition" />
                                        <label htmlFor="termsAndCondition"> I have read the Terms and Condition </label>
                                    </div>
                                    <button className={styles.button} type="submit">
                                        Sign Up
                                    </button>
                                    <div className={styles.linkToLogin}>
                                        <div className={styles.already}>Already have an account?</div>
                                        <div>
                                            <Link style={{ textDecoration: 'none' }} href={'/auth/login'}>
                                                Login
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={styles.secondPart}>
                    <div className={styles.imageContainer}>
                        <img className={styles.image} src="/signup-picture2.jpg" alt="Signup image" />
                    </div>
                    <div className={styles.text}>
                        <h4>Discover Care, Seamlessly</h4>
                        <h5>Register to access your hospital search</h5>
                    </div>
                </div>
            </div>
        </>
    );
};

Signup.getLayout = function getLayout(page: any) {
    return (
        <React.Fragment>
            {page}
            <AppConfig minimal />
        </React.Fragment>
    );
};

export default Signup;
