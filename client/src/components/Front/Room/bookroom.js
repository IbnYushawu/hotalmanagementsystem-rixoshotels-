import React from "react";

import { BoundingBoxCircles, Cup, Person, Star } from "react-bootstrap-icons";
import { FaBed } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PromptToastify, showToastify } from "../../utils/reuseable";
import { useSelector } from "react-redux";
import { MdDinnerDining } from "react-icons/md";
function BookRoomBox(props) {
  const navigate = useNavigate();
  const data = props.data;
  const myaccount = useSelector((data) => data.authuser);
  return (
    <div className="Roomcard" onClick={() => {}}>
      <img src={data.image} alt="" className="card-room-img" />
      <div className="room-description">
        <div className="row-btw" style={{ marginTop: "10px" }}>
          <h3>{data.room_type}</h3>
          <h3 style={{ marginRight: "5px" }}>Room {data.room_numer}</h3>
        </div>
        <div className="row-styles">
          <span>{data.price} / per Night</span>
          <Star size={15} color="yellow" /> <Star size={15} color="yellow" />{" "}
          <Star size={15} color="yellow" />
        </div>

        <p>
          {data.alias}: {data.description}
        </p>
        <div className="row-styles">
          <Person size={15} />
          <span>{data.capacity} Person</span>
          <BoundingBoxCircles />
          <span>{data.aircondition ? "Air condition" : "no available"}</span>
        </div>

        <div className="row-styles">
          <Cup size={15} />
          <span> {data.meals}</span>
          <FaBed />
          <span>{data.mattress}</span>
        </div>
        {data.room_type === "Excecutive suite" ? (
          <div className="row-styles">
            <MdDinnerDining size={15} />
            <span> Access to rooftop Bar</span>
          </div>
        ) : null}
        <div className="row-styles-b">
          {props.valid ? (
            <>
              <p
                className="book-now"
                onClick={() =>
                  navigate(
                    `/room/payment/${data._id}/${props.start}/${props.end}`
                  )
                }
              >
                Book now
              </p>
            </>
          ) : (
            <p
              className="book-now"
              onClick={() => {
                PromptToastify("Please select booking date");
              }}
            >
              Book now
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookRoomBox;
