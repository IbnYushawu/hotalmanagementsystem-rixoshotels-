import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Person, Quote } from "react-bootstrap-icons";

const Testimones = () => {
  return (
    <div
      className="testimony-style"
      style={{ minHeight: `${window.innerHeight}px`,marginBottom:"50px",marginTop:"50px" }}
    >
      <div  id="imageclient" className="image-client layoutspacv">
        <img
          src={
            "https://res.cloudinary.com/dewkx66gl/image/upload/v1696001677/testi_o7krpm.jpg"
          }
          alt=""
        />
      </div>

      <div className="clientRate">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="testimoy-l">
              <div className="testimony-p">
                <span>
                  <Quote color="chocolate" size={40} />
                </span>
                <span>
                Rixos takes dining to a whole new level. Each restaurant on the property offered a culinary adventure that delighted my taste buds. From the finest international cuisine to delectable local specialties, every meal was an exquisite journey.
                </span>
                </div>
              <p className="row-styles">
                <Person size={30} />{" "}
                <span style={{ marginLeft: "10px", color: "chocolate" }}>
                Kofi Adams
                </span>{" "}
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="testimoy-l">
              <p className="testimony-p">
                <span>
                  <Quote color="chocolate" size={40} />
                </span>
                I recently had the pleasure of staying at Rixos Hotels, and I can confidently say that it was an experience I'll cherish forever. From the moment I arrived, I was greeted with warm smiles and exceptional hospitality that set the tone for an unforgettable stay.
              </p>
              <p className="row-styles">
                <Person size={30} />{" "}
                <span style={{ marginLeft: "10px", color: "chocolate" }}>
                  James mensah
                </span>{" "}
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Testimones;
