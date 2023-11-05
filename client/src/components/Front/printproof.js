import { IconButton } from "@mui/material";
import { format } from "date-fns";
import React, { useRef } from "react";
import { Printer } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const PrintProof = () => {
  const componentRef = useRef();
  const order = useSelector((data) => data.bookroom);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {order && order.data ? (
        <div className="column-styles">
          <div className="row-styles-right desktop">
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
          <div className="column-styles" ref={componentRef}>
            <h3
              style={{
                color: "blue",
                marginTop: "-20px",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              ORDER DETAILS
            </h3>

            <p style={{ color: "rgb(2, 2, 26)" }}>
              Customer name {": "}{" "}
              <span style={{ color: " rgb(0, 0, 0)" }}>
                {order.data.customername}
              </span>
            </p>

            <p style={{ color: "rgb(2, 2, 26)" }}>
              Purchased on{" "}
              {format(new Date(order.data.createdAt), "eee dd MMM yyyy")}
            </p>

            <p style={{ color: "rgb(2, 2, 26)" }}>
              Room number{" "}
             
                {order.data.room_number}
             
            </p>

            <p style={{ color: "rgb(2, 2, 26)" }}>
              {" "}
              ORDER ID {": "}{" "}
             
                {order.data.orderId}
             
            </p>

            <p style={{ color: "rgb(2, 2, 26)" }}>
              {" "}
              Total Account {": "}{" "}
            
                GH₵ {order.data.price}
              
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                color: "dark",
              }}
            >
              <p style={{ color: "blue" }}>Customer Support</p>
              <span style={{ color: " rgb(0, 0, 0)" }}>
                Contact no: 0557471572
              </span>
              <span style={{ color: " rgb(0, 0, 0)" }}>
                Email: rixoshotelscommunity@gmail.com
              </span>
              <span style={{ color: " rgb(0, 0, 0)" }}>
                Location: East legon
              </span>
              <img
                onClick={() => {}}
                alt=""
                src="https://res.cloudinary.com/dewkx66gl/image/upload/v1695980190/pngwing.com_2_n6furk.png"
                className="companyname-img "
              />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PrintProof;
