import styles from "./bestHospitals.module.css";
import * as Fa from "react-icons/fa";

interface HospitalType {
  url: string;
  name: string;
  rating: number;
}

const HospitalDetails: HospitalType[] = [
  {
    url: "/JohnHopkins.png",
    name: "John Hopkin Hospital",
    rating: 5.0,
  },
  {
    url: "/Dukeuniversity.png",
    name: "Duke University",
    rating: 4.2,
  },
  {
    url: "/Womenhospital.png",
    name: "Brigham and Women's Hospital",
    rating: 4.9,
  },
];

const BestHospitals = () => {
  return (
    <>
      <div className={styles.bestHospitals}>
        <div>
          <h2 className={styles.mainText}>Some of our best Hospitals</h2>
        </div>
        <div className={styles.hospitalContainer}>
          {HospitalDetails.map((item, index) => (
            <div key={index} className={styles.UniversityContainer}>
              <div className={styles.imageContainer}>
                <img
                  className={styles.hospitalImage}
                  src={item.url}
                  alt="Hospital"
                />
              </div>
              <div>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.ratingContainer}>
                  <div className={styles.star}>
                    <Fa.FaRegStar />
                  </div>
                  <div className={styles.rating}>{item.rating}/5</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.seeMore}>
          <div>See More</div>
          <div>
            <Fa.FaArrowRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default BestHospitals;
