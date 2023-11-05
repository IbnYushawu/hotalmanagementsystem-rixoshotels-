import React, { useEffect, useState } from "react";
import SectionNav from "./../utils/sectionnav";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineRollback } from "react-icons/md";
import { Select, MenuItem, TextField } from "@mui/material";
import { CircleSpinner } from "react-spinners-kit";
import { useDispatch, useSelector } from "react-redux";
import { AddNewRoom, AddRoomType } from "../../store/actions/datacollection";
const AddRoomTypes = () => {

  const notifications = useSelector((value) => value.notification);




  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [roomtype, setroomtype] = useState("Family room");
  const [loading, setloading] = useState(false);
  const Formik = useFormik({
    initialValues: {
      room_type:roomtype,
     
      alias: "",
      extra: "",
      description: "",
      capacity: "",
      aircondition: false,
      meals: "",
      mattress: "",
      image:"",
      price:""
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      room_type: Yup.string().required("field required"),
      alias: Yup.string().required("field required"),
      description: Yup.string().required("field required"),
      capacity: Yup.number().required("field required"),
      aircondition: Yup.boolean().required("field required"),
      meals: Yup.string().required("field required"),
      mattress: Yup.string().required("field required"),
      image: Yup.string().required("field required"),
      price: Yup.string().required("field required"),
    }),
    onSubmit: (value) => {
      setloading(true);
      dispatch(AddRoomType(value))
    
    }
  });


  
  useEffect(()=>{
    if(notifications && notifications.notice){
     
       setloading(false);
    
    }
  },[notifications])
  return (
    <div className="main-layout-l">
      <SectionNav />

      <form onSubmit={Formik.handleSubmit} className="myform-l">
        <p
          className="header-p"
          style={{
            fontWeight: "normal",
            marginLeft: "10px",
          }}
        >
          Add Type        </p>

        <div className="row-styles-l" style={{ marginBottom: "15px" }}>
          <div className="column-styles-l">
            <p>
              <span style={{ color: "red", marginTop: "20px" }}>*</span> room
              Category
            </p>
            <Select
              className="textbox"
              style={{
                fontSize: "14px",
                fontFamily: "Roboto condensed",
                fontWeight: "bold",
                color: "rgb(6, 8, 29)",
              }}
              name="room_type"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={roomtype}
              onChange={(data) => {
                setroomtype(data.target.value)
                
              
                }}
            >
              {" "}
              <MenuItem
                value="Family room"
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto condensed",
                  fontWeight: "bold",
                }}
              >
                Family room
              </MenuItem>
              <MenuItem
                value="Standard suite room"
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto condensed",
                  fontWeight: "bold",
                }}
              >
                Standard suite room
              </MenuItem>
              <MenuItem
                value="Excecutive suite"
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto condensed",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Excecutive suite
              </MenuItem>
              <MenuItem
                value="Low budget Room"
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto condensed",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Low budget Room
              </MenuItem>
            </Select>
          </div>
          <div className="column-styles-l">
            <p>
              <span style={{ color: "red" }}>*</span> Alias ( other name )
            </p>
            <TextField
              className="textbox"
              name="alias"
              value={Formik.values.alias}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.alias && Boolean(Formik.errors.alias)}
            ></TextField>
          </div>
        </div>

        <p>
          <span style={{ color: "red", marginTop: "20px" }}>*</span> Description
        </p>
        <TextField
          multiline={true}
          rows={11}
          name="description"
          style={{
            borderRadius: "5px",
          }}
          type="text"
          value={Formik.values.description}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={
            Formik.touched.description && Boolean(Formik.errors.description)
          }
        ></TextField>

        <div className="row-styles-l" style={{ marginTop: "15px" }}>
        <div className="column-styles-l">
            <p>
              <span style={{ color: "red" }}>*</span> Meals
            </p>

            <TextField
              className="textbox"
              name="meals"
              value={Formik.values.meals}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.meals && Boolean(Formik.errors.meals)}
            ></TextField>
          </div>
          <div className="column-styles-l">
            <p>
              <span style={{ color: "red" }}>*</span> Room capacity
            </p>
            <TextField
              className="textbox"
              name="capacity"
              type="number"
              min={1}
              max={4}
              value={Formik.values.capacity}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.capacity && Boolean(Formik.errors.capacity)}
            ></TextField>
          </div>

      
        </div>
        <div className="row-styles-l" style={{ marginTop: "20px" }}>
          <div className="column-styles-l">
            <p>
              <span style={{ color: "red" }}>*</span>mattress type
            </p>
            <TextField
              name="mattress"
              className="textbox"
              style={{
                borderRadius: "5px",
              }}
              type="text"
              value={Formik.values.mattress}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.mattress && Boolean(Formik.errors.mattress)}
            ></TextField>
          </div>
          <div className="style-air" style={{ marginTop: "20px" }}>
            <input
              name="aircondition"
              type="checkbox"
              className="input-check"
              value={Formik.values.aircondition}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.aircondition &&
                Boolean(Formik.errors.aircondition)
              }
            />

            <p>
              <span style={{ color: "red" }}>*</span> Air condition
            </p>
          </div>
        </div>

<div className="row-styles-l">

<div className="column-styles-l" style={{ marginTop: "15px", marginBottom:"20px" }}>
          <p>
            <span style={{ color: "red",marginBottom:"10px" }}>*</span> Image Url
          </p>
          <TextField
            name="image"
            style={{
              borderRadius: "5px",
            }}
            type="text"
            className="textbox"
            value={Formik.values.image}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={
              Formik.touched.image && Boolean(Formik.errors.image)
            }
          ></TextField>
        </div>
</div>
     






















     <div className="row-styles-l">

<div className="column-styles-l" style={{ marginTop: "15px", marginBottom:"20px" }}>
          <p>
            <span style={{ color: "red" }}>*</span> Price ( GH₵ )
          </p>
          <TextField
            name="price"
            style={{
              borderRadius: "5px",
            }}
            type="price"
            className="textbox"
            value={Formik.values.price}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={
              Formik.touched.price && Boolean(Formik.errors.price)
            }
          ></TextField>
        </div>
        

</div>
     
















        <div>
          {loading ? (
            <>
            <div className="instruction-btn-valid">
              <CircleSpinner size={20} color="blue" />
             
            </div>
           </>
          
          ) : (
            <>
            <input
              type="submit"
              className="submitinput"
           
            />
             </>
           
     
          )}
         </div>
      </form>
      <div className="row-styles-b">
      <span  className="submitinput" style={{marginLeft:"10px", cursor:"pointer"}}>Back</span>
   
      </div>
    
    </div>
  );
};

export default AddRoomTypes;
