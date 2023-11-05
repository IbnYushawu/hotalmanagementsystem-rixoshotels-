import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { TextField } from "@mui/material";
import LoaderView from "../utils/loaderView";
import { Passwordreset, SignIn } from "../../store/actions/adminActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LockFill } from "react-bootstrap-icons";

const Resetpasspage = () => {
  useEffect(() => {
    if (Formik.values.password !== "") {
      if (Formik.values.password === Formik.values.comfirmpass) {
        setbtn(true);
      } else {
        setbtn(false);
      }
    } else {
      setbtn(false);
    }
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get("t");
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
  const [showbtn, setbtn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (notifications && notifications.notice) {
      setload(false);

      if (notifications.success) {
        navigate("/");
      }
    }
  });

  const dispatch = useDispatch();
  const Formik = useFormik({
    initialValues: {
      email: `${token ? token : ""}`,
      password: "",
      comfirmpass: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      password: Yup.string()
        .required("field required")
        .min(8, "password must be at least 8 characters"),
      email: Yup.string().required("field required").email("email invalid!"),
      comfirmpass: Yup.string().required("comfirm password"),
    }),
    onSubmit: (value) => {},
  });
  useEffect(() => {
    if (Formik.values.password === Formik.values.comfirmpass) {
      document.getElementById("errorspan").classList.remove("showerror");
    }
  });

  return (
    <div
      className="mainLayout"
      style={{ minHeight: `${window.innerHeight}px` }}
    >
      <div className="formsp">
        <p style={{ color: "white" }}>Reset Password</p>
        <form onSubmit={Formik.handleSubmit} className="myform">
          <p>
            <span style={{ color: "red" }}>*</span> New Password
          </p>
          <TextField
            name="password"
            style={{
              backgroundColor: "rgb(208, 223, 247)",
              borderRadius: "5px",
            }}
            type="password"
            value={Formik.values.password}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={Formik.touched.password && Boolean(Formik.errors.password)}
          ></TextField>

          <p>
            <span style={{ color: "red" }}>*</span> Comfirm Password
          </p>
          <TextField
            style={{
              backgroundColor: "rgb(208, 223, 247)",
              borderRadius: "5px",
            }}
            name="comfirmpass"
            type="password"
            value={Formik.values.comfirmpass}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={
              Formik.touched.comfirmpass && Boolean(Formik.errors.comfirmpass)
            }
          ></TextField>

          <span id="errorspan" className="errorspan">
            password must be the same.
          </span>
          {showbtn ? (
            <div>
              {loading ? (
                <div className="submitinput"> <CircleSpinner color="aqua" size={13} /></div>
               
              ) : (
                <input
                 type="submit"
                className="submitinput"
                  name=" Reset Password"
                  onClick={() => {
                    if (Formik.values.password !== Formik.values.comfirmpass) {
                      document
                        .getElementById("errorspan")
                        .classList.add("showerror");
                    } else {
                      setload(true);
                      dispatch(Passwordreset(Formik.values));
                    }
                  }}
                />
              )}
            </div>
          ) : (
            <input
            type="submit"
            className="submitinput"
            
            name="Reset Password"
          />
          )}
        </form>
      </div>

      <div className="footer">
        <div className="frontitemhover">
          <p>
            Handcrafted By Akyeampong Adomako. All rights reserved
            <span style={{ color: "green" }}> @ </span> 2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resetpasspage;
