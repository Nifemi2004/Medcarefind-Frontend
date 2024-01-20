import styles from "./index.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import * as fa from "react-icons/fa";
import type { Page } from '../../../types/types';
import React from 'react';
import AppConfig from '../../../layout/AppConfig';



const ResetPassword:Page = () => {
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
    formState: { errors },
  } = useForm();

  const onSubmit= (data:any) =>
    console.log(data);
  return (
    <>
      <div className={styles.signinPage}>
        <div className={styles.signinContainer}>
          <div className={styles.logInText}>
            <h3>Reset Password</h3>
            <h4>Please enter your new password</h4>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.register}>
                <div className={styles.option1}>
                  <div>
                    <input
                      id="password"
                      placeholder="Password"
                      type={showPassword1 ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {/* {errors.password && <span>{errors.password.message}</span>} */}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility1}
                      className={styles.passwordToggle}
                    >
                      {showPassword1 ? <fa.FaEyeSlash /> : <fa.FaEye />}
                    </button>
                  </div>
                </div>
                <div className={styles.option1}>
                  <div>
                    <input
                      id="repeatPassword"
                      placeholder="Repeat Password"
                      type={showPassword2 ? "text" : "password"}
                      {...register("repeatPassword", {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {/* {errors.password && <span>{errors.password.message}</span>} */}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility2}
                      className={styles.passwordToggle}
                    >
                      {showPassword2 ? <fa.FaEyeSlash /> : <fa.FaEye />}
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.button} type="submit">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

ResetPassword.getLayout = function getLayout(page: any) {
  return (
      <React.Fragment>
          {page}
          <AppConfig minimal />
      </React.Fragment>
  );
};

export default ResetPassword;
