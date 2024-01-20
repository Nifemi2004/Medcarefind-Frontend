import React, { useState } from 'react';
import styles from "./Readmore.module.css"

interface ReadMoreProps {
  text: string;
  maxLength: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div className={styles.readmore}>
      <p>{isTruncated ? text.slice(0, maxLength) : text}</p>
      {text.length > maxLength && (
        <button onClick={toggleTruncate}>
          {isTruncated ? 'Read More' : 'Read Less'}
        </button>
      )}
    </div>
  );
};

export default ReadMore;