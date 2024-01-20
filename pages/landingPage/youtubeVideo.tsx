import styles from "./youtubeVideo.module.css";

const YoutubeVideo = () => {
  return (
    <>
      <div className={styles.youtubeVideo}>
        <div className={styles.videoContainer}>
          <div className={styles.video}>
            <img src="/Youtube.png" alt="" />
          </div>
          <div className={styles.text}>
            <h2 className={styles.main}>
              Uncover the perfect healthcare, physician, and medical facility
              readily accessible at your disposal.
            </h2>
            <p className={styles.discover}>Discover More</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default YoutubeVideo;
