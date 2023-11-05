import React, { useState } from "react";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  FaCalendarAlt,
  FaCaretLeft,
  FaCaretRight,
  FaUserFriends,
} from "react-icons/fa";
import { Select, MenuItem, IconButton } from "@mui/material";
import "./../style/secondstyle.scss";
import { DateRange } from "react-date-range";
import { MdLocalHotel } from "react-icons/md";
import { X } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Clear_SearchBox } from "../../store/actions/datacollection";

const MobileSearchBox = () => {
  const navigate=useNavigate();
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

 
  const [openDate, setOpenDate] = useState(false);
  const [openOption, setOpenOption] = useState(false);

  const [options, setOptions] = useState(1);


  const handleOptionBtn = (operation) => {
    if (operation === "minus") {
      if (options >= 2) {
        setOptions(options - 1);
      }
    }
    if (operation === "plus") {
      if (options <= 3) {
        setOptions(options + 1);
      }
    }
  };

  const OpenCalender = () => {
    setOpenDate(true);
  };
  const CloseCalender = () => {
    if (openDate) {
      setOpenDate(false);
    }
  };

  const handleRoomss = () => {
    setOpenOption(!openOption);
    setOpenDate(false);
  };

  const [roomtype, setroomtype] = useState("Any Room type");
  const SearhValues = ()=>{
   
    navigate(`/rooms/search-results/${dates[0].startDate}/${dates[0].endDate}/${roomtype}/${options}`
    )
  
  }
  const dispatch=useDispatch()
  return (
    <div className="front_form-search">
      <div className="header_search_item-s" onClick={CloseCalender}>
        <Select className="selectbox"
          style={{
        
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
      </div>

      
        <div className="header_search_item"   onClick={OpenCalender}>
          <FaCalendarAlt color="chocolate" className="header_search_icon" />
          <span
            style={{ marginLeft: "10px" }}
          
            className="header_search_date"
          >
            {`${format(dates[0].startDate, 'EE dd yyyy')} to ${format(
              dates[0].endDate,
              'EE dd yyyy'
            )}`}
          </span>
       
        </div>
        {openDate ? (
            <div className="fixdate"  id="calender-id">
            <span className="closebtnn" style={{ marginLeft: "40px" }}>
              <IconButton onClick={CloseCalender}>
                <X color="white" size={20} />
              </IconButton>
            </span>
            <DateRange
              editableDateInputs
              onChange={(item) => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className="header_search_calender"
              minDate={new Date()}
            />

            </div>
           
          ) : null}
       
   

      <div className="header_search_item" onClick={CloseCalender}>
        <FaUserFriends color="chocolate" className="header_search_icon_first" />

        <span style={{ marginLeft: "10px" }}>People</span>
        <div className="choosepeople">
          <IconButton onClick={() => handleOptionBtn("minus")}>
            <FaCaretLeft color="chocolate" />
          </IconButton>
          <span>{options}</span>
          <IconButton onClick={() => handleOptionBtn("plus")}>
            <FaCaretRight color="chocolate" />
          </IconButton>
        </div>
      </div>

  
        <button
          className="header_search_btn"
          type="button"
          onClick={() => {
            dispatch(Clear_SearchBox())
            
            SearhValues()
          }}
        >
          Check availaility
        </button>
     
    </div>
  );
};

export default MobileSearchBox;
