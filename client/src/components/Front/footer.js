import React from "react";
import {
  ChevronBarLeft,
  Envelope,
  Geo,
  GeoAlt,
  TelephoneForward,
} from "react-bootstrap-icons";
import { FaCaretRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div
      className="footer-s"
      style={{ minHeight: `${window.innerHeight / 2}px` }}
    >
      <div className="about-use">
        <img
          onClick={() => {
            navigate("/");
          }}
          alt=""
          src="https://res.cloudinary.com/dewkx66gl/image/upload/v1699353634/20231107_102303_1_ed6ng2.png"
          className="companyname-img"
        />{" "}
        <p className="aboutcompany">
       
          At Rixos, we pride ourselves on delivering impeccable service that
          goes beyond your expectations. Whether you're here for business or
          leisure, we aim to make your stay with us truly exceptional
        </p>
        <p className="row-styles" style={{ color: "chocolate" }}>
          <GeoAlt /> <span>East Legon street NK 1Q23</span>
        </p>
        <p className="row-styles" style={{ color: "chocolate" }}>
          <TelephoneForward /> <span>+233 549522648</span>
        </p>
        <p className="row-styles" style={{ color: "chocolate" }}>
          <Envelope /> <span>rixoshotelscommunity@gmail.com</span>
        </p>
      </div>
      <div className="about-use">
        <h3 style={{ marginTop: "50px" }}>Usefull Links</h3>
        <p className="row-styles" style={{ color: "chocolate" }}>
          <FaCaretRight onClick={() => navigate("/")} /> <span>Home</span>
        </p>
        <p className="row-styles" style={{ color: "chocolate" }}>
          <FaCaretRight />{" "}
          <span
            onClick={() => {
              document
                .getElementById("serviceoder")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Our services
          </span>
        </p>
        <p
          onClick={() => {
            document
              .getElementById("imageclient")
              .scrollIntoView({ behavior: "smooth" });
          }}
          className="row-styles"
          style={{ color: "chocolate" }}
        >
          <FaCaretRight /> <span>Testimonies</span>
        </p>
        <p className="row-styles" style={{ color: "chocolate" }}>
          <FaCaretRight /> <span>Privacy Policy</span>
        </p>
      </div>
      <div className="about-use">
        <h3 style={{ marginTop: "50px" }}>Partners and Sponsors</h3>

        <p className="row-styles" style={{ color: "chocolate" }}>
          {" "}
          <span>Wyndham Hotels & Resorts, Inc</span>
        </p>
        <p className="row-styles" style={{ color: "chocolate" }}>
          {" "}
          <span>Dansk Håndbold Forbund Scandic</span>
        </p>

        <p className="row-styles" style={{ color: "chocolate" }}>
          {" "}
          <span>Handcrafted By AYUBA YUSHAWU</span>
        </p>
        <p className="row-styles" style={{ color: "chocolate" }}>
          {" "}
          <span>Education: University of Ghana</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
