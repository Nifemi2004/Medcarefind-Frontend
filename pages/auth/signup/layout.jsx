import { ReactNode } from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <div>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
