import React from "react";
import {
  BoundingBoxCircles,
  Cup,
  Person,
  Star,
  Wifi,
} from "react-bootstrap-icons";
import { FaBed } from "react-icons/fa";
import { MdDinnerDining } from "react-icons/md";
import { format } from "date-fns";

const RoomBox = (props) => {
  const data = props.data;
  const room = props.data.room;
  props.setData(data);
 
  return (
    <div className="Roomcard" onClick={() => {
       props.setroom(data.room_number)
       props.setorderid(data._id)

    }}  style={{
      border: `${data.status === "Checked In" ? "1px solid  rgb(31, 240, 31,0.6)" : ""}`,
    }}>
      <img src={room.image} alt="img" className="card-room-img" />
      <div className="room-description">
        <div className="row-btw" style={{ marginTop: "10px" }}>
          <h3>{room.room_type}</h3>
          <h3 style={{ marginRight: "5px" }}> Status : {data.status}</h3>
        </div>
        <div className="row-styles">
          <span> GHC {room.price} / per Night</span>
          <Star size={15} color="yellow" /> <Star size={15} color="yellow" />{" "}
          <Star size={15} color="yellow" />
        </div>

        <p>
          {room.alias}: {room.description}
        </p>

        <div className="row-styles" style={{ marginBottom: "10px" }}>
          ORDER ID: {data.orderId}
        </div>
        <div className="row-styles" style={{ marginBottom: "10px" }}>
          Room Number: {data.room_number}
        </div>
        
        <div className="row-styles" style={{ marginBottom: "10px" }}>
          Check in Date: {format(new Date(data.from), "eee dd MMM yyyy")}
        </div>
        <div
          className="row-styles"
          style={{ marginBottom: "10px", color: "red" }}
        >
          Check out Date: {format(new Date(data.to), "eee dd MMM yyyy")}
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
          <span>{room.capacity} Person</span>
          <BoundingBoxCircles color=" rgb(91, 2, 66)" size={20} />
          <span>{room.aircondition ? "Air conditioned" : ""}</span>
        </div>

        <div className="row-styles">
          <Cup color=" rgb(91, 2, 66)" size={20} />
          <span> {room.meals} </span>
          <FaBed color=" rgb(91, 2, 66)" size={20} />

          <span>{room.mattress} bed</span>
        </div>
        {data.room_type === "Excecutive suite" ? (
          <div className="row-styles">
            <MdDinnerDining size={15} />
            <span>
              Special Access to rooftop Bar (maximum 3 persons per ticket){" "}
            </span>
          </div>
        ) : null}

        <div className="row-styles-b" style={{ marginTop: "20px" }}>
         {data.status ==="pending" ?    <p 
         onClick={()=>{
          props.setRefund(true)
         }}
         
         className="book-now">Refund </p>:null} 
       
          
          <p
            className="book-now"
            onClick={() => {
              props.setMsg(true);
            }}
          >
            Print
          </p>
          <p
            className="book-now"
            onClick={() => {
              props.setcontact(true);
            }}
          >
            Message
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomBox;
