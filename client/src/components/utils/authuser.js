import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AutoLogin, getAllUsers } from "../../store/actions/adminActions";
import { useNavigate } from "react-router-dom";
import LoaderView from "./loaderView";
import { PromptToastify } from "./reuseable";

const Authcontainer = (props) => {
  const Checkuser = useSelector((item) => item.authuser);
  const navigate = useNavigate();

  useEffect(() => {
    if (Checkuser && ! Checkuser.loading) {
      if(!Checkuser.account){
        navigate("/user/login");
        PromptToastify("Please sign in and continue")
      }
   
    }
  });

  return (
    <>
      {Checkuser && !Checkuser.loading? (
        <div>{props.children}</div>
      ) : (
        <LoaderView />
      )}
    </>
  );
};

export default Authcontainer;
