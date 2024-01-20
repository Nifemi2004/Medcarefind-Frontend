"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";
import * as Fa from "react-icons/fa";

const Navbar: React.FC = () => {
  const categories = [
    "Overview",
    "Location",
    "Review",
    "Providers",
    "Business Hours",
  ];

  const dropStyle = [styles.menu];
  const caretStyle = [styles.caret];

  const [activeButton, setActiveButton] = useState(0);
  const [dropDown, setdropDown] = useState(false);

  const handleDropdown = () => {
    setdropDown(!dropDown);
  };

  if (dropDown) {
    dropStyle.push(styles.menuOpen);
    caretStyle.push(styles.caretRotate);
  }

  const handleClick = (index: number) => {
    setActiveButton(index);
  };

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.categories}>
          {categories.map((item, index) => (
            <a
              key={index}
              href={`#${item}`}
              onClick={() => handleClick(index)}
              className={activeButton === index ? styles.categoriesEffect : ""}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.dropdownNav}>
        <div className={styles.dropdownContent}>
          <div className={styles.select} onClick={handleDropdown}>
            <span className={styles.selected}>{categories[activeButton]}</span>
            <div className={caretStyle.join(" ")}>
              <Fa.FaCaretDown />
            </div>
          </div>
          <ul className={dropStyle.join(" ")}>
            {categories.map((item, index) => (
              <a
                key={index}
                href={`#${item}`}
                onClick={() => {
                  handleClick(index);
                  handleDropdown();
                }}
              >
                <li
                  className={
                    activeButton === index ? styles.categoriesEffectMb : ""
                  }
                >
                  {" "}
                  {item}
                </li>
              </a>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
