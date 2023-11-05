import React from "react";
import RoomBox from "./roombox";
import { useDispatch, useSelector } from "react-redux";
const BookingsRecord = (props) => {
  const myAccount = useSelector((data) => data.authuser);
  return (
    <div className="bookingd">
      <h1>Booking Records</h1>
      <div className="">
        {myAccount &&
        myAccount.account &&
        myAccount.account.bookings.length > 0 ? (
          myAccount.account.bookings.map((book, index) => {
            return (
              <div key={index}>
                <RoomBox 
                  data={book}
                  setData={props.setData}
                  setMsg={props.setMsg}
                  setroom={props.setroom} setcontact={props.setcontact}
                  setorderid={props.setorderid} setRefund={props.setRefund}
                />
              </div>
            );
          })
        ) : (
          <p>No bookings yet</p>
        )}
      </div>
    </div>
  );
};

export default BookingsRecord;
