import { IconButton } from "@mui/material";
import { format } from "date-fns";
import React, { useRef } from "react";
import { Printer } from "react-bootstrap-icons";

import { useReactToPrint } from "react-to-print";

const PrintDoc = (props) => {
  const componentRef = useRef();
  const order = props.order;
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 
  return (
    <div className="column-styles">
      <div className="row-styles-right">
        <div style={{ fontFamily: "Roboto condensed" }} onClick={() => {}}>
          <IconButton onClick={() => handlePrint()}>
            {" "}
            <Printer size={30} color="rgb(2, 2, 26)" />
          </IconButton>
          <span style={{ color: "rgb(2, 2, 26)", fontWeight: "bold" }}>
            {" "}
            Print 
          </span>
        </div>
      </div>
      <div className="column-styles" ref={componentRef}>
        <h3 style={{ color: "blue",marginTop:"-45px",fontSize:"15px",fontWeight:"bold" }}>
          ORDER DETAILS
        </h3>

        <p style={{ color: "rgb(2, 2, 26)"}}>
          Customer name {": "}{" "}
          <span style={{ color: " rgb(0, 0, 0)" }}>{order.customername}</span>
        </p>
        <p style={{ color: "rgb(2, 2, 26)"}}>
          Check in Date: {format(new Date(order.from), "eee dd MMM yyyy")}
        </p>
        <p
        style={{ color: "rgb(2, 2, 26)"}}
        >
          Check out Date: {format(new Date(order.to), "eee dd MMM yyyy")}
        </p>


        <p style={{ color: "rgb(2, 2, 26)" }}>
          Purchased on {format(new Date(order.createdAt), "eee dd MMM yyyy")}
        </p>

        <p style={{ color: "rgb(2, 2, 26)"}}>
          Room number{" "}
         {order.room_number}
        </p>

        <p style={{ color: "rgb(2, 2, 26)", }}>
          {" "}
          ORDER ID {": "}{" "}
          {order.orderId}
        </p>

        <p style={{ color: "rgb(2, 2, 26)" }}>
          {" "}
          Total Account {": "}{" "}
        GH₵ {order.price}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            color:"dark"
          }}
        >

        <p style={{ color: "blue" }}>Customer Support</p>
        <span style={{ color: " rgb(0, 0, 0)" }}>Contact no: 0557471572</span>
        <span  style={{ color: " rgb(0, 0, 0)" }}>Email: rixoshotelscommunity@gmail.com</span>
        <span  style={{ color: " rgb(0, 0, 0)" }}>Location: East legon</span>
          <img
            onClick={() => {}}
            alt=""
            src="https://res.cloudinary.com/dewkx66gl/image/upload/v1695980190/pngwing.com_2_n6furk.png"
            className="companyname-img "
          />
        </div>
      </div>
    </div>
  );
};

export default PrintDoc;
