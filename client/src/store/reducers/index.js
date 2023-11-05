import { combineReducers } from "redux";

import notification from "./notification";
import personal from "./personal";

import authuser from "./authuser";
import newroom from "./addroom";
import room from "./room";
import rooms from "./rooms";
import clients from "./allusers";
import bookroom from "./bookroom";
import orders from "./orders";
import orderdetail from "./orderdetail";
import roomtypes from "./roomtypes";
import searchRooms from "./searccards";
import conference_order from "./confer_order";
import monthlyIncome from "./monthrevenue";
import meetingOrders from "./conferencebookings"
import conferenceIncome from "./conferenceRev";
import admin from "./adminauth";
import adminaccounts from "./adminaccounts";

const appReducers = combineReducers({
  personal,
  adminaccounts,
  admin,
  conferenceIncome,
  authuser,
  clients,
  notification,
  orders,
  newroom,
  room,
  bookroom,
  rooms,
  orderdetail,
  searchRooms,
  conference_order,
  monthlyIncome,
  meetingOrders
 ,
roomtypes
});

export default appReducers;
