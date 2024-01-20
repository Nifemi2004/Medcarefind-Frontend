import styles from "./button.module.css";
import React from "react"; 

function Button({
  children,
  version,
  type,
  isDisabled,
  width,
  height,
  onClick,
}) {
  const buttonClasses = [styles.btn];

  if (version === "primary") {
    buttonClasses.push(styles.btnPrimary);
  } else if (version === "secondary") {
    buttonClasses.push(styles.btnSecondary);
  } else if (version === "outlined") {
    buttonClasses.push(styles.btnOutlined);
  }

  const btnStyle = {
    width: `${width}vw`,
    height: `${height}px`
  };
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={buttonClasses.join(" ")}
      style={btnStyle}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  version: "primary",
  type: "button",
  isDisable: false,
};

export default Button;
