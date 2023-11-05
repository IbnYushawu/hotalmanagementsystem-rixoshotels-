import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

import { BoundingBoxCircles, Cup, Person, Star } from "react-bootstrap-icons";
import { FaBed } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircleSpinner } from "react-spinners-kit";
import {
  AddNewRoomFromCate,
  DeleteRoom,
  GetAllRooms,
} from "../../store/actions/datacollection";
import { useFormik } from "formik";

function AddRoomTypeBox(props) {
  const [loading, setloading] = useState(false);
  const notifications = useSelector((value) => value.notification);

  const navigate = useNavigate();
  const data = props.data;
  useEffect(() => {
    if (notifications && notifications.notice) {
      setloading(false);
      dispatch(GetAllRooms());
    }
  }, [notifications]);

  const dispatch = useDispatch();

  const Formik = useFormik({
    initialValues: {
      room_numer: "",
    },
    enableReinitialize: true,
  });

  return (
    <div className="Roomcard" onClick={() => {}}>
      <img src={data.image} alt="" className="card-room-img" />
      <div className="room-description">
        <div className="row-btw">
          <h3>{data.room_type}</h3>
        </div>

        <div className="row-styles">
          <span> GHC {data.price} / per Night</span>
        </div>

        <p>
          {data.alias}: {data.description}
        </p>
        <div className="row-styles">
          <Person color="yellow" size={15} />
          <span>{data.capacity} Person</span>
          <BoundingBoxCircles />
          <span>{data.aircondition ? "Air condition" : "no available"}</span>
        </div>

        <div className="row-styles">
          <Cup color="yellow" size={15} />
          <span> {data.meals}</span>
          <FaBed />
          <span>{data.mattress}</span>
        </div>
        <div className="row-styles-b" style={{ marginTop: "50px" }}>
          <input
            onChange={(item) => {
              Formik.setValues({ room_numer: item.target.value });
            }}
            className="input-box"
            type="number"
            name="search"
            placeholder="room number"
            min="1"
          />
          {loading ? (
            <div className="book-now" onClick={() => navigate("/room/payment")}>
              <CircleSpinner size={15} />
            </div>
          ) : (
            <div className="book-now">
              <span
                onClick={() => {
                  if (Formik.values.room_numer === "") {
                    alert("Room number should not be empty");
                  } else {
                    setloading(true);
                    dispatch(
                      AddNewRoomFromCate({
                        ...data,
                        room_numer: Formik.values.room_numer,
                      })
                    );
                  }
                }}
              >
                {" "}
                Add room
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddRoomTypeBox;
