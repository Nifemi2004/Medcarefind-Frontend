import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useState } from 'react';
import AppConfig from '../../layout/AppConfig';
import { LayoutContext } from '../../layout/context/layoutcontext';
import styles from './index.module.css';
import type { Page } from '../../types/types';

const admin: Page = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    const { layoutConfig } = useContext(LayoutContext);
    const dark = layoutConfig?.colorScheme !== 'light';

    return (
        <>
            <div className={styles.adminLogin}>
                <div className={styles.firstPart}>
                    <div className="min-h-screen flex justify-content-center align-items-center">
                        <div className=" border-round py-7 px-4 md:px-7 z-1">
                            <div className="text-center mb-4">
                                <div className=" mb-2">
                                    <img className="w-4" src="/medcare.png" alt="Logo" />
                                </div>
                                <span className="text-600 font-medium">Please enter your admin details</span>
                            </div>
                            <div className="flex flex-column">
                                <span className="p-input-icon-left w-full mb-4">
                                    <i className="pi pi-user"></i>
                                    <InputText id="username" type="text" className="w-full md:w-25rem" placeholder="Username" />
                                </span>
                                <span className="p-input-icon-left w-full mb-4">
                                    <i className="pi pi-lock"></i>
                                    <InputText id="password" type="password" className="w-full md:w-25rem" placeholder="Password" />
                                </span>
                                <div className="mb-4 flex flex-wrap gap-3">
                                    <div>
                                        <Checkbox name="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.checked ?? false)} className="mr-2"></Checkbox>
                                        <label htmlFor="checkbox" className="text-900 font-medium mr-8">
                                            Remember Me
                                        </label>
                                    </div>
                                    <a className="text-600 cursor-pointer hover:text-primary cursor-pointer ml-auto transition-colors transition-duration-300">Reset password</a>
                                </div>
                                <Button label="Log In" className="w-full" onClick={() => router.push('/')}></Button>
                            </div>
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

admin.getLayout = function getLayout(page: any) {
    return (
        <React.Fragment>
            {page}
            <AppConfig minimal />
        </React.Fragment>
    );
};

export default admin;
