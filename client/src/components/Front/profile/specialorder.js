import React from "react";

import { useDispatch, useSelector } from "react-redux";
import ConferenceBox from "./conferencebox";
const SpecialOrder = (props) => {
  const myAccount = useSelector((data) => data.authuser);
  return (
    <div className="bookingd">
      <h1>Booking Records</h1>
      <div className="">
        {myAccount &&
        myAccount.account &&
        myAccount.account.bookings.length > 0 ? (
          myAccount.account.conference.map((book, index) => {
            return (
              <div key={index}>
                <ConferenceBox
                  data={book}
                  setData={props.setData}
                  setMsg={props.setMsg}
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

export default SpecialOrder;
