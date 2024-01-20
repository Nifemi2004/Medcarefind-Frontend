import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./index.module.css";
import Link from "next/link";
import type { Page } from '../../../types/types';
import React from 'react';
import AppConfig from '../../../layout/AppConfig';


const forgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data:any) =>
    console.log(data);
  return (
    <>
      <div className={styles.signinPage}>
        <div className={styles.signinContainer}>
          <div className={styles.logInText}>
            <h3>Forgot Password?</h3>
            <p>Enter the email address you used when you joined and we'll send you instruction to reset your password</p>
            <p>For security reasons, we do NOT store your password. So be rest assured that we will never send your password via email</p>
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
                    {...register("emailAddress", {
                      required: true,
                      maxLength: 50,
                    })}
                  />
                  {/* {errors.emailAddress && (
                    <span>{errors.emailAddress.message}</span>
                  )} */}
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.button} type="submit">
                  Send Reset Instructions
                </button>
              </div>
            </form>
          </div>
          <div className={styles.linkToSignup}>
            <div><Link style={{textDecoration: 'none'}} href={"/auth/login"}>Return back to login</Link></div>
          </div>
        </div>
      </div>
    </>
  );
};

forgotPassword.getLayout = function getLayout(page: any) {
  return (
      <React.Fragment>
          {page}
          <AppConfig minimal />
      </React.Fragment>
  );
};

export default forgotPassword;
