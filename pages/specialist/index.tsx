import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useState } from 'react';
import AppConfig from '../../layout/AppConfig';
import { LayoutContext } from '../../layout/context/layoutcontext';
import type { Page } from '../../types/types';

const specialist:Page = () => {

  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { layoutConfig } = useContext(LayoutContext);
  const dark = layoutConfig?.colorScheme !== 'light';
  
  return (

        <>
            <div className="fixed left-0 top-0 min-h-screen min-w-screen">
               <img className=" bg-cover w-full" src="/authBackground.png" alt="" />
            </div>
            <div className="px-5 min-h-screen flex justify-content-center align-items-center">
                <div className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
                    <div className="text-center mb-4">
                        <div className=" mb-2">
                            <img className="w-4" src="/medcare.png" alt="Logo" />
                        </div>
                        <span className="text-600 font-medium">Please enter your specialist details</span>
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
        </>


  )
}

specialist.getLayout = function getLayout(page:any) {
  return (
      <React.Fragment>
          {page}
          <AppConfig minimal />
      </React.Fragment>
  );
};


export default specialist
