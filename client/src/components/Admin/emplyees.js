import React, { useState, useEffect } from "react";
import { Select, MenuItem, IconButton, TextField } from "@mui/material";
import {
  Activity,
  Calendar,
  CarFrontFill,
  Filter,
  List,
  Person,
  PersonLock,
  UniversalAccess,
  UniversalAccessCircle,
  X,
} from "react-bootstrap-icons";
import { BsCaretUpFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import * as Yup from "yup";
import { useFormik } from "formik";
import RoomBox from "./roombox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AllOrders, GetAllRooms } from "../../store/actions/datacollection";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { MdDelete, MdEmail, MdNumbers, MdSecurity } from "react-icons/md";
import {
  UnBlockuser,
  getAllUsers,
  AddAdminAccount,
  AllAdminAccount,
  UnBlockEmployee,
} from "../../store/actions/adminActions";
import {
  enableScroll,
  hideEmployeeP,
  shownewEmployeeP,
} from "../utils/reuseable";
import MessageCustomer from "./messagecustomer";
import { CircleSpinner } from "react-spinners-kit";
import { BsAlignTop } from "react-icons/bs";
const EmployeePage = (props) => {
  const dispatch = useDispatch();
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
  const employees = useSelector((data) => data.adminaccounts);

  const [accountType, setAccountType] = useState("employee");
  const admindetails = useSelector((data) => data.admin);
  const [activatebtn, setactivebtn] = useState(false);

  useEffect(() => {
    if (notifications && notifications.notice) {
      setactivebtn(false);
    }
  }, [notifications]);

  const Formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      comfirmpass: "",
      role: accountType,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullname: Yup.string().required("field required"),
      password: Yup.string().required("field required"),
      email: Yup.string().required("field required").email("email invalid!"),
      comfirmpass: Yup.string().required("comfirm password"),
      role: Yup.string().required("field required"),
    }),
    onSubmit: (value) => {
      if (value.password !== value.comfirmpass) {
        document.getElementById("errorspan").classList.add("showerror");
      } else {
        setload(true);
        dispatch(
          AddAdminAccount(
            value,
            admindetails && admindetails.account
              ? admindetails.account._id
              : null
          )
        );
      }
    },
  });

  useEffect(() => {
    if (Formik.values.password === Formik.values.comfirmpass) {
      document.getElementById("errorspan").classList.remove("showerror");
    }
  });

  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      AllAdminAccount(
        admindetails && admindetails.account ? admindetails.account._id : null
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (notifications && notifications.notice) {
      setload(false);
    }
  }, [notifications]);
  return (
    <div
      className="panel_detail"
      onClick={() => {
        props.setadminid(
          admindetails && admindetails.account ? admindetails.account._id : null
        );
      }}
    >
      <p className="header-p">Employees Management Panel</p>
      <p className="row-styles">
        <Filter /> <span>Filter</span>{" "}
      </p>
      <div className="row-btw">
        <div className="row-styles">
          <div className="row-styles">
            <span
              className="searchbtn"
              onClick={() => {
                shownewEmployeeP("end_indicate", "emploee_add");
              }}
            >
              Add new Employee
            </span>
          </div>
        </div>
      </div>

      <div className="row-styles" style={{ marginTop: "40px" }}>
        <div className="row-styles-hn" style={{ marginRight: "10px" }}>
          {" "}
          <span className="b-content">No </span>
        </div>
        <div className="row-styles-hn" style={{ marginRight: "10px" }}>
          {" "}
          <MdSecurity size={20} color="chocolate" />{" "}
          <span className="b-header">status</span>
        </div>

        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <Person size={20} color="chocolate" />{" "}
          <span className="b-header">Employee name </span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <MdEmail size={20} color="chocolate" />{" "}
          <span className="b-header"> Email </span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <Calendar size={20} color="chocolate" />{" "}
          <span className="b-header">Joined since </span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <List size={20} color="chocolate" />{" "}
          <span className="b-header"> Role</span>
        </div>

        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <Activity size={20} color="chocolate" />{" "}
          <span className="b-header">Actions</span>
        </div>
      </div>

      <div className="line"></div>

      {employees && employees.data
        ? employees.data.map((item, index) => {
            return (
              <div
                key={index}
                className="row-styles"
                style={{ marginTop: "5px" }}
              >
                <div className="row-styles-hn" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">{index + 1} </span>
                </div>
                <div className="row-styles-hn" style={{ marginRight: "10px" }}>
                  {" "}
                  <span
                    className="b-content"
                    style={{ color: "green", fontWeight: "bold" }}
                  >
                    {item.active ? "Active" : "Blocked"}{" "}
                  </span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">{item.fullname} </span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">{item.email} </span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">
                    {format(new Date(item.createdAt), "EE dd yyyy")}{" "}
                  </span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">{item.role}</span>
                </div>

                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  {item.active ? (
                    <button
                      className="btw_btn"
                      type="button"
                      onClick={() => {
                        props.setaction(false);
                        props.setbprompt(true);
                        props.setuserid(item._id);
                      }}
                    >
                      Block
                    </button>
                  ) : (
                    <>
                      {activatebtn ? (
                        <div className="btw_btn">
                          <CircleSpinner size={13} color="white" />
                        </div>
                      ) : (
                        <button
                          className="btw_btn"
                          type="button"
                          onClick={() => {
                            setactivebtn(true)
                            dispatch(
                              UnBlockEmployee(
                                item._id,
                                admindetails && admindetails.account
                                  ? admindetails.account._id
                                  : null
                              )
                            );
                          }}
                        >
                          Activate
                        </button>
                      )}
                    </>
                  )}
                  <button
                    className="btw_btn"
                    type="button"
                    onClick={() => {
                      props.setemail(item.email);
                      props.setMsg(true);
                    }}
                  >
                    Message
                  </button>
                  <span
                    onClick={() => {
                      props.setaction(true);
                      props.setbprompt(true);
                      props.setuserid(item._id);
                    }}
                    className="deletebtn"
                  >
                    <MdDelete />
                  </span>
                </div>
              </div>
            );
          })
        : null}

      <div className="line" style={{ marginTop: "50px" }}></div>
      <div className="emploee_add" id="emploee_add">
        <p>Add new Employee</p>

        <form
          onSubmit={Formik.handleSubmit}
          className="myform"
          style={{ padding: "0px" }}
        >
          <p>
            <span style={{ color: "red", marginTop: "20px" }}>*</span> Fullname
          </p>
          <TextField
            style={{
              backgroundColor: "rgb(208, 223, 247)",
              borderRadius: "5px",
            }}
            name="fullname"
            {...Formik.getFieldHelpers("fullname")}
            value={Formik.values.fullname}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={Formik.touched.fullname && Boolean(Formik.errors.fullname)}
          ></TextField>
          <p>
            <span style={{ color: "red" }}>*</span> Email
          </p>
          <TextField
            style={{
              backgroundColor: "rgb(208, 223, 247)",
              borderRadius: "5px",
            }}
            name="email"
            value={Formik.values.email}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={Formik.touched.email && Boolean(Formik.errors.email)}
          ></TextField>
          <div className="row-styles">
            <div className="column-styles">
              <p>
                <span style={{ color: "red" }}>*</span> Password
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
                error={
                  Formik.touched.password && Boolean(Formik.errors.password)
                }
              ></TextField>
            </div>

            <div className="column-styles">
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
                  Formik.touched.comfirmpass &&
                  Boolean(Formik.errors.comfirmpass)
                }
              ></TextField>
            </div>
          </div>
          <span
            id="errorspan"
            className="errorspan"
            style={{ marginLeft: "30px", marginBottom: "30px" }}
          >
            password must be the same.
          </span>
          <div className="row-styles">
            <div
              className="column-style"
              style={{ marginLeft: "30px", marginBottom: "30px" }}
            >
              <p>
                {" "}
                <span style={{ color: "red" }}>*</span> Account Type
              </p>
              <Select
                style={{
                  width: "220px",
                  backgroundColor: "rgb(208, 223, 247)",
                }}
                defaultValue={accountType}
                onChange={(data) => {
                  setAccountType(data.target.value);
                }}
                name="role"
                onBlur={Formik.handleBlur}
                error={
                  Formik.touched.password && Boolean(Formik.errors.password)
                }
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="adminstrator">Adminstrator</MenuItem>
              </Select>
            </div>
          </div>

          <div className="row-btw">
            {loading ? (
              <div className="submitinput" style={{ marginLeft: "30px" }}>
                <CircleSpinner color="aqua" size={13} />
              </div>
            ) : (
              <input
                type="submit"
                className="submitinput"
                name="Add"
                style={{ marginLeft: "30px" }}
              />
            )}

            <span
              onClick={() => {
                hideEmployeeP("end_indicate", "emploee_add");
              }}
              className="submitinput"
              style={{ width: "55px" }}
            >
              <BsCaretUpFill size={30} color="white" /> Top
            </span>
          </div>
        </form>
      </div>
      <div id="end_indicate"></div>
    </div>
  );
};

export default EmployeePage;
