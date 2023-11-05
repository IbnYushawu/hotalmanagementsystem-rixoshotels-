import React from "react";

const Attention = () => {
  return (
    <div
      className="attention"
      style={{
        minHeight: `${window.innerHeight}px`,
      }}
    >
      <div className="mobile">
        <div className="attraction-image">
          <img
            src={
              "https://res.cloudinary.com/dewkx66gl/image/upload/v1695991073/attraction_zx9z4c.jpg"
            }
            alt="images"
          />
        </div>
      </div>
      <div className="attraction-c">
        <p>
          Nestled in the heart of Greater Accra, our boutique hotel offers a
          perfect blend of modern sophistication and warm hospitality. From the
          moment you step into our elegant lobby, you'll be enveloped in an
          atmosphere of timeless charm and contemporary style.For those seeking
          event and meeting facilities, our versatile spaces are perfect for
          hosting everything from intimate gatherings to corporate conferences.
          Our professional event planning team is on hand to assist you in
          creating a seamless and memorable occasion. At Rixos, we pride
          ourselves on delivering impeccable service that goes beyond your
          expectations. Whether you're here for business or leisure, we aim to
          make your stay with us truly exceptional.
        </p>

        <span className="book-now">Book Now</span>
      </div>
  
        <div className="attraction-image-d">
          <img
            src={
              "https://res.cloudinary.com/dewkx66gl/image/upload/v1695991073/attraction_zx9z4c.jpg"
            }
            alt="images"
          />
        </div>
     
    </div>
  );
};

export default Attention;
