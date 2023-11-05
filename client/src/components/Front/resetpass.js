import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { Avatar, IconButton, TextField } from "@mui/material";
import LoaderView from "../utils/loaderView";
import { SignIn, preRegister } from "../../store/actions/adminActions";
import { useNavigate } from "react-router-dom";

const LoginReset = () => {
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
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
   
      email: "",
      password: "",
      comfirmpass:''
    
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
     
      password: Yup.string().required("field required"),
      comfirmpass:Yup.string().required("field required"),
    
    }),
    onSubmit: (value) => {
  
      setload(true);
      dispatch(SignIn(value));
    },
  });

  return (
    <div
      className="mainLayout"
      style={{ minHeight: `${window.innerHeight}px` }}
    >
  
        <div className="formsp">
          <form onSubmit={Formik.handleSubmit} className="myform">
        


            <input  className="inputfield"
            placeholder="Password"
            type="password"
              style={{ margin: "10px 10px 10px 0" }}
              name="password"
              value={Formik.values.password}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.password && Boolean(Formik.errors.password)}
              helperText={Formik.touched.password && Formik.errors.password}
              {...Formik.getFieldHelpers("password")}
              
            ></input>

            <div></div>
            {loading ? (
              <CircleSpinner color="aqua" />
            ) : (

              <Button
                type="submit"
             
              >
                Loginvvvv
              </Button>
            )}

            <div className="signin">
              <p>
                Don't have an account ? <span onClick={()=>navigate("/user/Signup")}>Create account</span>
              </p>
              <p className="forgottenp" onClick={()=>navigate("/user/login/forgottenpassword")}>Forgotten password ?</p>
            </div>
          </form>
        </div>
   

      <div className="footer">
        <div className="frontitemhover">
          <p>
             Handcrafted By Akyeampong Adomako. All rights reserved<span style={{ color: "green" }}> @ </span>{" "}
            2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginReset;
