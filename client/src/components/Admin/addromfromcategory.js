import React, { useState, useEffect } from "react";
import { Select, MenuItem, IconButton } from "@mui/material";
import { Filter } from "react-bootstrap-icons";
import RoomBox from "./roombox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GetAllRoomTypes,
  GetAllRooms,
} from "../../store/actions/datacollection";
import RoomTypeBox from "./roomtypebox";
import AddRoomTypeBox from "./addtyperoombox";

const AddRoomCategory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllRoomTypes());
  }, [dispatch]);

  const room_types = useSelector((item) => item.roomtypes);

  const navigate = useNavigate();
  const [roomtype, setroomtype] = useState("Any Room type");
  return (
    <div className="panel_detail">
      <p className="header-p">Rooms Category</p>
      <div style={{ width: "180px" }}>
        <span
     
          onClick={() => {
            navigate("/admin/panel/addroom");
          }}
          className="searchbtn"
        >
          Custome Add Rooms
        </span>
      </div>

      <div className="align-grid" style={{ marginTop: "30px" }}>
        {room_types && room_types.data ? (
          room_types.data.map((value, index) => {
            return (
              <div key={index}>
                <AddRoomTypeBox data={value} />
              </div>
            );
          })
        ) : (
          <p>NO Room added</p>
        )}
      </div>
    </div>
  );
};

export default AddRoomCategory;
