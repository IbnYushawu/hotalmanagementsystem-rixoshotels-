import React from "react";
import {
  BoundingBoxCircles,
  Cup,
  Person,
  Star,
  Wifi,
} from "react-bootstrap-icons";
import { FaBed } from "react-icons/fa";

import { format } from "date-fns";

const ConferenceBox = (props) => {
  const data = props.data;

  props.setData(data);
  return (
    <div
      className="Roomcard"
      onClick={() => {}}
      style={{
        border: `${data.status === "Checked In" ? "1px solid  rgb(31, 240, 31,0.6)" : ""}`,
      }}
    >
      <img
        src="https://res.cloudinary.com/dewkx66gl/image/upload/v1696000598/conference_eumktz.jpg"
        alt="img"
        className="card-room-img"
      />
      <div className="room-description">
        <div className="row-btw">
          <h3>Duration </h3>
          <span>Status : {data.status}</span>
        </div>

        <h3> {data && data.date  ? format(new Date(data.date), "eee dd MMM yyyy") :null} </h3>
        <p>Starts: {data.from}</p>
        <p>Ends: {data.to}</p>

        <div className="row-styles">
          <span>Price GHC {data.price} /</span>
        </div>

        <p>{data.equipment}</p>

        <div className="row-styles" style={{ marginBottom: "10px" }}>
          ORDER ID: {data.orderId}
        </div>
        <div className="row-styles" style={{ marginBottom: "10px" }}>
          Payment completed on :
          {format(new Date(data.createdAt), "eee dd MMM yyyy")}
        </div>
        <div className="row-styles" style={{ marginBottom: "10px" }}>
          Payment method :{data.paymentoption}
        </div>
        <div className="row-styles">
          <Person color=" rgb(91, 2, 66)" size={20} />
          <span> Atmost {data.members} Attendence</span>
        </div>

        <div className="row-styles-b" style={{ marginTop: "20px" }}>
         
          <p
            className="book-now"
            onClick={() => {
              props.setMsg(true);
            }}
          >
            Print
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConferenceBox;
