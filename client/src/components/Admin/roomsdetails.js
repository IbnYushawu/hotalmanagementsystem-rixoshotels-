import React, { useState, useEffect } from "react";
import { Select, MenuItem, IconButton } from "@mui/material";
import { Filter } from "react-bootstrap-icons";
import RoomBox from "./roombox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllRooms } from "../../store/actions/datacollection";

const RoomsDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllRooms());
  }, [dispatch]);

  const allRooms = useSelector((item) => item.rooms);

  const navigate = useNavigate();
  const [roomtype, setroomtype] = useState("Any Room type");
  return (
    <div className="panel_detail">
      <p className="header-p">All Rooms</p>
      <p className="row-styles">
        <Filter /> <span>Filter</span>{" "}
      </p>
      <div className="row-btw">
        <div className="row-styles">
          <Select
            style={{
              minWidth: "160px",
              height: "40px",
              fontSize: "14px",
              fontFamily: "Roboto condensed",
              fontWeight: "bold",
              color: "rgb(6, 8, 29)",
            }}
            name="type"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={roomtype}
            onChange={(data) => setroomtype(data.target.value)}
          >
            {" "}
            <MenuItem
              className="roomtype"
              value="Any Room type"
              style={{
                fontSize: "14px",
                fontFamily: "Roboto condensed",
                fontWeight: "bold",
              }}
            >
              Any Room type
            </MenuItem>
            <MenuItem
              value="Family room"
              style={{
                fontSize: "14px",
                fontFamily: "Roboto condensed",
                fontWeight: "bold",
              }}
            >
              Family room
            </MenuItem>
            <MenuItem
              value="Standard suite room"
              style={{
                fontSize: "14px",
                fontFamily: "Roboto condensed",
                fontWeight: "bold",
              }}
            >
              Standard suite room
            </MenuItem>
            <MenuItem
              value="Excecutive suite"
              style={{
                fontSize: "14px",
                fontFamily: "Roboto condensed",
                fontWeight: "bold",
              }}
            >
              {" "}
              Excecutive suite
            </MenuItem>
            <MenuItem
              value="Low budget Room"
              style={{
                fontSize: "14px",
                fontFamily: "Roboto condensed",
                fontWeight: "bold",
              }}
            >
              {" "}
              Low budget Room
            </MenuItem>
          </Select>
          <div className="row-styles">
            <input
              className="input-box"
              type="number"
              name="search"
              placeholder="room number"
              min="1"
            />
            <span className="searchbtn">search</span>
          </div>
        </div>
        <span
          onClick={() => {
            navigate("/admin/panel/newroom_from_category");
          }}
          className="searchbtn"
        >
          Add new Room
        </span>
      </div>

      <div className="align-grid" style={{ marginTop: "30px" }}>
        {allRooms && allRooms.data ? (
          allRooms.data.map((value, index) => {
            return (
              <div key={index}>
                <RoomBox data={value} />
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

export default RoomsDetail;
