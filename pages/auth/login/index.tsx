import styles from './index.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import * as fa from 'react-icons/fa';
import Link from 'next/link';
import type { Page } from '../../../types/types';
import React from 'react';
import AppConfig from '../../../layout/AppConfig';

const login = () => {
    const [showPassword1, setShowPassword1] = useState(false);

    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data: any) => console.log(data);

    return (
        <>
            <div className={styles.signinPage}>
                <div className={styles.firstPart}>
                    <div className={styles.signinContainer}>
                        <div className={styles.logoContainer}>
                            <img className={styles.logo} src="/medcare.png" alt="logo" />
                        </div>
                        <div className={styles.logInText}>
                            <h3>Log in</h3>
                            <h4>Please enter your details</h4>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.register}>
                                    <div>
                                        <input
                                            className={styles.option1}
                                            id="emailAddress"
                                            placeholder="Email/Username"
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
                                </div>
                                <div className={styles.buttonContainer}>
                                    <div className={styles.resetPassword}>
                                        <div>
                                            <input type="checkbox" name="rememberMe" id="rememberMe" />
                                            <label htmlFor="rememberMe"> Remember Me </label>
                                        </div>
                                        <div>
                                            <Link style={{ textDecoration: 'none' }} href={'/auth/forgotPassword'}>
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    </div>
                                    <button className={styles.button} type="submit">
                                        Log-in
                                    </button>
                                    <div className={styles.linkToSignup}>
                                        <div>Dont have an account?</div>
                                        <div>
                                            <Link style={{ textDecoration: 'none' }} href={'/auth/signup'}>
                                                Signup
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
                        <h5>Log-in to access your hospital search</h5>
                    </div>
                </div>
            </div>
        </>
    );
};

login.getLayout = function getLayout(page: any) {
    return (
        <React.Fragment>
            {page}
            <AppConfig minimal />
        </React.Fragment>
    );
};

export default login;
