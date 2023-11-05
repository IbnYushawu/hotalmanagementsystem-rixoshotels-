import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MyForm from "./components/Front/RegistrationForm";
import Home from "./components/Front/home";
import { showToastify } from "./components/utils/reuseable";
import { ClearNotify } from "./store/actions/notification";
import "./components/style/custome.css";
import "./components/style/design.css";

import Resetpasspage from "./components/Front/resetpassword";
import ConfirmAccount from "./components/Front/confirmAccount";
import PaymentSection from "./components/Front/payment";
import {
  AdminLogin,
  AutoLogin,
  CheckLogin,
  getAllUsers,
} from "./store/actions/adminActions";

import SignInUser from "./components/Front/signin";

import Authcontainer from "./components/utils/authuser";

import LoginReset from "./components/Front/resetpass";
import SearchResult from "./components/Front/searchresult";
import UserPanel from "./components/Front/userprofile";
import SettingsPanel from "./components/Front/profile/settingnav";
import BookingsPanel from "./components/Front/profile/bookingnav";
import AdminDashboard from "./components/Admin/panel";
import PanelRoom from "./components/Admin/panelroom";
import AddRoom from "./components/Admin/addrooms";
import TypeDashboard from "./components/Admin/typepanel";
import AddRoomTypes from "./components/Admin/addroomtype";
import AddRoomCategory from "./components/Admin/addromfromcategory";
import Location from "./components/utils/location";
import PanelBook from "./components/Admin/panelbooks";
import PanelMeetingOrders from "./components/Admin/panelConference";
import PanelCustomer from "./components/Admin/panelcustomers";
import ConferenceBook from "./components/Front/bookconference";
import ConferenceCheckout from "./components/Front/checkoutconference";
import SpecialOrderPanel from "./components/Front/profile/specialordernav";
import SignInAdmin from "./components/Front/adminlogin";
import Admincontainer from "./components/utils/authadmin";
import ForgottenPassword from "./components/Front/forgotpassword";
import EmployeeDashboard from "./components/Admin/employeepanel";
import AdminRestriction from "./components/utils/adminrestrction";

function App() {
  const notifications = useSelector((value) => value.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(CheckLogin());
  }, []);


  useEffect(() => {
    dispatch(AdminLogin());
  }, [dispatch]);
  useEffect(() => {
    dispatch(AutoLogin());
  }, [dispatch]);
  useEffect(() => {
    if (notifications && notifications.notice) {
      if (notifications.success) {
        showToastify("SUCCESS", notifications.notice.msg);
        dispatch(ClearNotify());
      }
      if (notifications.success === false) {
        showToastify("ERROR", notifications.notice.msg);
        dispatch(ClearNotify());
      }
      window.scrollTo(0, 0);
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/account/verification" element={<ConfirmAccount />} />
        <Route path="/account/passwordreset" element={<Resetpasspage />} />
        <Route path="/account/forgotten_credentials" element={<ForgottenPassword />} />
        
        <Route
          path="/rooms/search-results/:startDate/:endDate/:roomtype/:person"
          element={<SearchResult />}
        />

        <Route path="/user/login" element={<SignInUser />}></Route>
        <Route path="/user/Signup" element={<MyForm />}></Route>
        <Route
          path="/room/payment/:id/:start/:end"
          element={
            <Authcontainer>
              <PaymentSection />
            </Authcontainer>
          }
        ></Route>
        <Route
          path="/client/conference/checkout/:startTime/:endDTime/:startD"
          element={
            <Authcontainer>
              <ConferenceCheckout />
            </Authcontainer>
          }
        ></Route>
        <Route
          path="/client/profile"
          element={
            <Authcontainer>
              <UserPanel />
            </Authcontainer>
          }
        />
        <Route
          path="/client/panel/records"
          element={
            <Authcontainer>
              {" "}
              <BookingsPanel />
            </Authcontainer>
          }
        />
        <Route path="/admin/panel/bookings" element={<Admincontainer><PanelBook /></Admincontainer> } />
        <Route path="/admin/panel/meetings" element={ <Admincontainer><PanelMeetingOrders /></Admincontainer>} />
        <Route
          path="/client/panel/settings"
          element={
            <Authcontainer>
              <SettingsPanel />
            </Authcontainer>
          }
        />
        <Route path="/admin/panel/overview" element={ <Admincontainer><AdminRestriction><AdminDashboard /></AdminRestriction></Admincontainer>} />
        <Route path="/admin/panel/rooms" element= {<Admincontainer><AdminRestriction><PanelRoom /></AdminRestriction></Admincontainer>} />
        <Route path="/admin/panel/addroom" element={<Admincontainer><AdminRestriction><AddRoom /></AdminRestriction></Admincontainer>} />
        <Route path="/admin/panel/employee/management" element={ <Admincontainer><AdminRestriction><EmployeeDashboard/></AdminRestriction></Admincontainer>}/>
        <Route path="/client/conference/booking" element={<ConferenceBook />} />
        <Route
          path="/client/panel/specail_orders"
          element={
            <Authcontainer>
              <SpecialOrderPanel />
            </Authcontainer>
          }
        />
        <Route path="/admin/panel/customers" element={<Admincontainer><PanelCustomer /></Admincontainer>} />
        <Route path="/admin/dashboard" element={<SignInAdmin />} />

        <Route path="/admin/panel/room_type" element={ <Admincontainer><TypeDashboard /></Admincontainer>} />
        <Route path="/admin/panel/newcategory" element={<Admincontainer><AddRoomTypes /></Admincontainer>} />
        <Route
          path="/admin/panel/newroom_from_category"
          element={<Admincontainer><AddRoomCategory /></Admincontainer>}
        />
        <Route path="/rixos/location" element={<Location />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
