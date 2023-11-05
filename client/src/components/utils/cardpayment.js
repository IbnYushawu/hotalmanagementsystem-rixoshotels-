import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import Cards from "react-credit-cards-2";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import { TextField } from "@mui/material";
import { CircleSpinner } from "react-spinners-kit";
import { disableScroll } from "./reuseable";
import { BookRoom } from "../../store/actions/datacollection";
import { useDispatch, useSelector } from "react-redux";

const CardPay = (props) => {
  const Checkuser = useSelector((item) => item.authuser);
  const Formik = useFormik({
    initialValues: {
      number: "",
      expiry: "",
      cvc: "",
      name: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      number: Yup.number().required("field required"),
      expiry: Yup.string().required("field required"),
      cvc: Yup.string().required("field required"),
      name: Yup.string().required("comfirm password"),
    }),
    onSubmit: (value) => {
      BookRoom(
        props.room,
        Checkuser && Checkuser.account ? Checkuser.account._id : "",
        {
          paymentoption: "Credit card",
          from: props.start,
          to: props.end,
          price: props.amount,
          room_number: props.roomnumber,
          customername: props.customer,
        }
      );
    },
  });

  const [statev, setStatev] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const dispatch = useDispatch();
  const MakePayment = () => {
    dispatch(
      BookRoom(
        props.room,
        Checkuser && Checkuser.account ? Checkuser.account._id : "",
        {
          paymentoption: "Credit card",
          from: props.start,
          to: props.end,
          price: props.amount,
        }
      )
    );
  };
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setStatev((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setStatev((prev) => ({ ...prev, focus: evt.target.name }));
  };
  const [btbloading, setbtnloading] = useState(false);

  useEffect(() => {
    if (btbloading) {
      setTimeout(() => {
        setbtnloading(false);
        props.setMsg(true);
        disableScroll();
      }, 3000);
    }
  }, [btbloading]);

  return (
    <div className="pay-detail">
      <p>DETAILS</p>
      <div className="row-styles-card">
        <form
          onSubmit={Formik.handleSubmit}
          style={{ marginTop: "30px", width: "100%" }}
        >
          <div className="column-input">
            <p>
              <span style={{ color: "red", marginRight: "10px" }}>*</span>Card
              number
            </p>
            <input
              className="input-style"
              type="number"
              name="number"
              {...Formik.getFieldHelpers("fullname")}
              value={Formik.values.number}
              onChange={Formik.handleChange}
              onFocus={handleInputFocus}
              onBlur={Formik.handleBlur}
              error={Formik.touched.fullname && Boolean(Formik.errors.fullname)}
            ></input>
          </div>
          <div className="column-input">
            <p>
              <span style={{ color: "red", marginRight: "10px" }}>*</span>Name
            </p>
            <input
              className="input-style"
              name="name"
              type="text"
              onFocus={handleInputFocus}
              {...Formik.getFieldHelpers("name")}
              value={Formik.values.name}
              onChange={Formik.handleChange}
              error={Formik.touched.name && Boolean(Formik.errors.name)}
            ></input>
          </div>

          <div className="row-styles-s">
            <div className="row-styles">
              <div className="column-input">
                <p>
                  <span style={{ color: "red", marginRight: "10px" }}>*</span>
                  CVC
                </p>
                <input
                  className="input-style"
                  name="cvc"
                  {...Formik.getFieldHelpers("cvc")}
                  value={Formik.values.cvc}
                  onChange={Formik.handleChange}
                  onFocus={handleInputFocus}
                  onBlur={Formik.handleBlur}
                  error={Formik.touched.cvc && Boolean(Formik.errors.cvc)}
                ></input>
              </div>
              <div className="column-input">
                <p>
                  <span style={{ color: "red", marginRight: "10px" }}>*</span>
                  expiry
                </p>
                <input
                  onFocus={handleInputFocus}
                  className="input-style"
                  name="expiry"
                  type="year"
                  {...Formik.getFieldHelpers("expiry")}
                  value={Formik.values.expiry}
                  onChange={Formik.handleChange}
                  error={Formik.touched.expiry && Boolean(Formik.errors.expiry)}
                ></input>
              </div>
            </div>
          </div>
        </form>

        <div className="cardDebit desktop" >
         
            <Cards
              number={Formik.values.number}
              expiry={Formik.values.expiry}
              cvc={Formik.values.cvc}
              name={Formik.values.name}
              focused={statev.focus}
            />
            <div className="row-styles-right" style={{ marginTop: "10px" }}>
              <p></p>
              <>
                {btbloading ? (
                  <div className="instruction-btn-valid">
                    <CircleSpinner size={20} color="blue" />
                  </div>
                ) : (
                  <>
                    {Formik.values.cvc !== "" &&
                    Formik.values.name !== "" &&
                    Formik.values.number !== "" &&
                    Formik.values.expiry !== "" ? (
                      <div
                        onClick={() => {
                          setbtnloading(true);
                          MakePayment();
                        }}
                        className="instruction-btn-valid"
                      >
                        <span>confirm Payment</span>
                      </div>
                    ) : (
                      <div className="blank-btn">
                        <span>confirm Payment</span>
                      </div>
                    )}
                  </>
                )}
              </>
           
          </div>
        </div>
        <div className="mobile row-styles-right" style={{ marginTop: "10px" ,marginRight:"15px"}} >
        <>
                {btbloading ? (
                  <div className="instruction-btn-valid">
                    <CircleSpinner size={20} color="blue" />
                  </div>
                ) : (
                  <>
                    {Formik.values.cvc !== "" &&
                    Formik.values.name !== "" &&
                    Formik.values.number !== "" &&
                    Formik.values.expiry !== "" ? (
                      <div
                        onClick={() => {
                          setbtnloading(true);
                          MakePayment();
                        }}
                        className="instruction-btn-valid"
                      >
                        <span>confirm Payment</span>
                      </div>
                    ) : (
                      <div className="blank-btn">
                        <span>confirm Payment</span>
                      </div>
                    )}
                  </>
                )}
              </>

        </div>
      </div>
    </div>
  );
};

export default CardPay;
