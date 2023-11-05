import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { Avatar, IconButton, TextField } from "@mui/material";
import LoaderView from "../utils/loaderView";
import { AdminSignIn, SignIn, preRegister } from "../../store/actions/adminActions";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
const SignInAdmin = () => {
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (notifications && notifications.notice) {
      setload(false);

      if (notifications.success) {
        navigate("/admin/panel/overview");
      }
    }
  });
  const Checkuser = useSelector((item) => item.admin);
  useEffect(() => {
    if (Checkuser && ! Checkuser.loading) {
      if(Checkuser.account){
        navigate("/admin/panel/overview");
      }
   
    }
  });
  const dispatch = useDispatch();
  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      password: Yup.string().required("field required"),
      email: Yup.string().required("field required").email("email invalid!"),
    }),
    onSubmit: (value) => {
      setload(true);
      dispatch(AdminSignIn(value));
    },
  });

  return (
    <div
      className="mainLayout"
      style={{ minHeight: `${window.innerHeight}px`,paddingTop:"50px" }}
    >
      {" "}
      <img
              onClick={() => {
                navigate("/");
              }}
              alt=""
              src="https://res.cloudinary.com/dewkx66gl/image/upload/v1695980190/pngwing.com_2_n6furk.png"
              className="companyname-img "
            />{" "}
      <p>Rixos Admin Dashboard </p>
      <div className="formsp">
        <form onSubmit={Formik.handleSubmit} className="myform">
          <p>
            <span style={{ color: "red" }}>*</span> Email
          </p>
          <TextField
            style={{
              margin: "0px 10px 10px 0",
              backgroundColor: "rgb(208, 223, 247)",
              borderRadius: "5px",
            }}
            name="email"
            value={Formik.values.email}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={Formik.touched.email && Boolean(Formik.errors.email)}
          ></TextField>
          <p>
            <span style={{ color: "red" }}>*</span> Password
          </p>
          <input
            className="inputfield"
            placeholder="Password"
            type="password"
            style={{
              margin: "0px 10px 10px 0",
              backgroundColor: "rgb(208, 223, 247)",
              borderRadius: "5px",
            }}
            name="password"
            value={Formik.values.password}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={Formik.touched.password && Boolean(Formik.errors.password)}
            helperText={Formik.touched.password && Formik.errors.password}
            {...Formik.getFieldHelpers("password")}
            label="Password"
          ></input>


          {loading ? (
            <div className="submitinput">
              <CircleSpinner color="aqua" size={13}/>
            </div>
          ) : (
            <input type="submit" className="submitinput" name="Sign" />
          )}
        </form>
      </div>
    </div>
  );
};

export default SignInAdmin;
