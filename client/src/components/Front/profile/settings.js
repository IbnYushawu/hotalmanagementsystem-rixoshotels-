import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CircleSpinner } from "react-spinners-kit";
import { useNavigate } from "react-router-dom";
const SettiingForm = () => {
  const [loading, setload] = useState(false);

  const dispatch = useDispatch();
  const myaccount = useSelector((data) => data.authuser);
  const Formik = useFormik({
    initialValues: {
      fullname: `${
        myaccount && myaccount.account ? myaccount.account.fullname : ""
      }`,
      email: `${myaccount && myaccount.account ? myaccount.account.email : ""}`,
      password: "",
      comfirmpass: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullname: Yup.string().required("field required"),
      password: Yup.string().required("field required"),
      email: Yup.string().required("field required").email("email invalid!"),
      comfirmpass: Yup.string().required("comfirm password"),
    }),
    onSubmit: (value) => {
      if (value.password !== value.comfirmpass) {
        document.getElementById("errorspan").classList.add("showerror");
      } else {
        setload(true);
      }
    },
  });

  return (
    <div className="formsp">
      <form onSubmit={Formik.handleSubmit} className="myform">
        <p>
          <span style={{ color: "red", marginTop: "20px" }}>*</span> Fullname
        </p>
        <input
          className="input-style-s"
          name="fullname"
          {...Formik.getFieldHelpers("fullname")}
          value={Formik.values.fullname}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.fullname && Boolean(Formik.errors.fullname)}
        ></input>

        <p>
          <span style={{ color: "red" }}>*</span> Email
        </p>
        <input type="text" className="input-style-s" name="email"  readonly></input>
        <p>
          <span style={{ color: "red" }}>*</span> New Password
        </p>
        <input
          name="password"
          className="input-style-s"
          type="password"
          value={Formik.values.password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.password && Boolean(Formik.errors.password)}
        ></input>

        <p>
          <span style={{ color: "red" }}>*</span> Confirm Password
        </p>
        <input
          className="input-style-s"
          name="comfirmpass"
          type="password"
          value={Formik.values.comfirmpass}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={
            Formik.touched.comfirmpass && Boolean(Formik.errors.comfirmpass)
          }
        ></input>
        <span id="errorspan" className="errorspan">
          password must be the same.
        </span>

        <div></div>
        {loading ? (
          <div className="instruction-btn-valid">
            <CircleSpinner size={20} color="blue" />
          </div>
        ) : (
          <div
            onClick={() => {
              setload(true);
            }}
            className="instruction-btn-valid"
          >
            <span>Save</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default SettiingForm;
