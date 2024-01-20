"use client";

import { useEffect, useState } from "react";
import styles from "./clinicAndSpecialties.module.css";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";

interface specialtiesItem {
  url: string;
  text: string;
}

const specialtiesData: specialtiesItem[] = [
  {
    url: "/Heart.png",
    text: "Cardiology",
  },
  {
    url: "/Coronavirus.png",
    text: "Oncology",
  },
  {
    url: "/Rectangle.png",
    text: "Family Medicine",
  },
  {
    url: "/Fetus.png",
    text: "Obstetrics & Gynecology",
  },
  {
    url: "/Brainstorm.png",
    text: "Neurology",
  },
  {
    url: "/Dermatology.png",
    text: "Dermatology",
  },
  // {
  //   url: "/Forensic.png",
  //   text: "Forensic pathology",
  // },
  // {
  //   url: "/Pulmonology.png",
  //   text: "Pulmonology",
  // },
  // {
  //   url: "/Urology.png",
  //   text: "Urology",
  // },
  // {
  //   url: "/Podiatrists.png",
  //   text: "Podiatrists",
  // },
];

const ClinicAndSpecialties: React.FC = () => {
  const [specialties, setSpecialties] = useState<specialtiesItem[]>([]);
  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "416px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const specialtiesTemplate = (item: specialtiesItem) => {
    return (
      <>
        <div className={styles.carousel}>
          <button className={styles.carouselItem}>
            <img src={item.url} alt="" />
          </button>
          <p>{item.text}</p>
        </div>
      </>
    );
  };

  useEffect(() => {
    setSpecialties(specialtiesData);
  }, []);

  return (
    <>
      <div className={styles.clinicAndSpecialties}>
        <div>
          <h2 className={styles.mainText}>Clinic And Specialties</h2>
        </div>
        <div className={styles.carouselBody}>
          <Carousel
            value={specialties}
            numScroll={1}
            numVisible={4}
            responsiveOptions={responsiveOptions}
            itemTemplate={specialtiesTemplate}
            showNavigators={false}
            showIndicators={true}
            containerClassName={styles.carouselSize}
          />
        </div>
        <div className={styles.seeMore}>
          <div>See More</div>
          <div>
            <img src="/icon-arrow-right.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicAndSpecialties;
