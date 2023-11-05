import React from "react";

import { BoundingBoxCircles, Cup, Person, Star } from "react-bootstrap-icons";
import { FaBed } from "react-icons/fa";
import { MdDinnerDining } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Room(props) {
  const navigate = useNavigate();
  const data = props.data;
  return (
    <div className="Roomcard layoutspacv" onClick={() => {}}>
      <img src={data.image} alt="" className="card-room-img" />
      <div className="spaces-btw">
        {" "}
        <div className="room-description">
          <h3>{data.room_type}</h3>

          <div className="row-styles">
            <span>{data.price} / per Night</span>
            <Star size={15} color="yellow" /> <Star size={15} color="yellow" />{" "}
            <Star size={15} color="yellow" />
          </div>

          <p>
            {data.alias}: {data.description}
          </p>
          <div className="row-styles">
            <Person  size={15} />
            <span>{data.capacity} Person</span>
            <BoundingBoxCircles />
            <span>{data.aircondition ? "Air condition" : "no available"}</span>
          </div>

          <div className="row-styles">
            <Cup  size={15} />
            <span> {data.meals}</span>
            <FaBed />
            <span>{data.mattress}</span>
          </div>
          {data.room_type === "Excecutive suite" ? (
            <div className="row-styles">
              <MdDinnerDining  size={15} />
              <span> Access to rooftop Bar</span>
            </div>
          ) : null}
        </div>
        <div className="row-styles-b" style={{ marginTop: "30px" }}>
          <p
            className="book-now"
            onClick={() =>
              navigate(`/rooms/search-results/any/any/${data.room_type}/1`)
            }
          >
            Book now
          </p>
        </div>
      </div>
    </div>
  );
}

export default Room;
