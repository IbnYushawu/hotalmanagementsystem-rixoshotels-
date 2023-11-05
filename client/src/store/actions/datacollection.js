import axios, { all } from "axios";
import * as notify from "./notification";
import { AutoLogin } from "./adminActions";

const {
  ADDROOM,
  SEARCRESULTS,
  GETROOMS,
  ALLRATINGS,
  ALLORDERSD,
  BOOKROOM,
  ORDERDETAIL,
  ROOMTYPES,
  MATCHCARDS,
  BOOKCONFERENCE,
  YEARMONTHSTAT,
  ALLORDERMEETING,
  CONFERENCEREVENUE,
  API,
  GETROOM,
  VERIFIEDCARD,
} = require("../type");

export const Getroom = (data) => ({
  type: GETROOM,
  payload: data,
});
export const searchResult = (data) => ({
  type: SEARCRESULTS,
  payload: data,
});
export const newRoom = (data) => ({
  type: ADDROOM,
  payload: data,
});

export const monthstat = (data) => ({
  type: YEARMONTHSTAT,
  payload: data,
});
export const allrooms = (data) => ({
  type: GETROOMS,
  payload: data,
});

export const allroomsTypes = (data) => ({
  type: ROOMTYPES,
  payload: data,
});

export const orderDetail = (data) => ({
  type: ORDERDETAIL,
  payload: data,
});

export const Bookrooms = (data) => ({
  type: BOOKROOM,
  payload: data,
});


export const conferenceRev = (data) => ({
  type: CONFERENCEREVENUE,
  payload: data,
});

export const Bookconf = (data) => ({
  type: BOOKCONFERENCE,
  payload: data,
});

export const Bookings = (data) => ({
  type: ALLORDERSD,
  payload: data,
});
export const ConfBookings = (data) => ({
  type: ALLORDERMEETING,
  payload: data,
});
export const allRatings = (data) => ({
  type: ALLRATINGS,
  payload: data,
});

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use((config) => {
  config.mode = "cors";
  return config;
});

export const AddNewRoom = (data) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(`${API}/session/admin/room/addroom`, data);

      dispatch(newRoom(newd.data));
      dispatch(
        notify.notify_success({
          msg: `Room Added`,
        })
      );
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `failed !`,
        })
      );
    }
  };
};

export const AddNewRoomFromCate = (data) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(
        `${API}/session/admin/room/addfromcategory`,
        data
      );
      dispatch(newRoom(newd.data));
      dispatch(
        notify.notify_success({
          msg: `Room Added`,
        })
      );
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `${error.response.data.msg}`,
        })
      );
    }
  };
};

export const AddRoomFromList = (data) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(`${API}/admin/addroom_from_list`, data);

      dispatch(newRoom(newd.data));
      dispatch(
        notify.notify_success({
          msg: `Room Added`,
        })
      );
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `failed !`,
        })
      );
    }
  };
};

export const AddRoomType = (data) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(`${API}/session/admin/addroomtype`, data);

      dispatch(newRoom(newd.data));
      dispatch(
        notify.notify_success({
          msg: `Room Added`,
        })
      );
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `failed !`,
        })
      );
    }
  };
};

export const GetAllRooms = (data) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.get(`${API}/session/admin/get_roooms`, data);
      dispatch(allrooms(newd.data));
    } catch (error) {}
  };
};

export const GetAllRoomTypes = (data) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.get(`${API}/session/admin/get_room_type`, data);

      dispatch(allroomsTypes(newd.data));
    } catch (error) {}
  };
};

export const GetsearchResult = (startDate, roomtype, persons) => {
  return async (dispatch) => {
    try {
      const contents = await axios.get(
        `${API}/session/client/get_available_rooms/${startDate}/${roomtype}/${persons}`
      );

      dispatch(searchResult(contents.data));
    } catch (error) {}
  };
};

export const GetRoom = (id) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.get(`${API}/session/admin/get_rooom/${id}`);

      dispatch(Getroom(newd.data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const UpdateRoom = (id) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.patch(`${API}/session/admin/updateroom/${id}`);
      dispatch(
        notify.notify_success({
          msg: `Room Updated`,
        })
      );
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `failed !`,
        })
      );
    }
  };
};

export const DeleteRoom = (id) => {
  return async (dispatch, getdispatch) => {
    try {
      await axios.delete(`${API}/session/admin/deleteroom/${id}`);
      dispatch(
        notify.notify_success({
          msg: `Room deleted`,
        })
      );
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `failed !`,
        })
      );
    }
  };
};

export const BookRoom = (room, client, data) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(
        `${API}/session/client/book/rooms/${room}/${client}`,
        data
      );
      dispatch(Bookrooms(newd.data));
      dispatch(
        notify.notify_success({
          msg: "successful",
        })
      );
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: "failed",
        })
      );
    }
  };
};

export const CheckInClient = (id, data) => {
  return async (dispatch, getdispatch) => {
    try {
      await axios.patch(
        `${API}/session/server/rooms/booking/update/${id}`,
        data
      );
      dispatch(
        notify.notify_success({
          msg: `Check In`,
        })
      );
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `failed !`,
        })
      );
    }
  };
};
export const CheckInClientMeeting = (id, data) => {
  return async (dispatch, getdispatch) => {
    try {
      await axios.patch(
        `${API}/session/server/conference/update/${id}`,
        data
      );
      dispatch(
        notify.notify_success({
          msg: `Check In`,
        })
      );
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `failed !`,
        })
      );
    }
  };
};

export const BookConference = (user, data) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(
        `${API}/session/client/book/conference/${user}`,
        data
      );
      dispatch(Bookconf(newd.data));
      dispatch(
        notify.notify_success({
          msg: "successful",
        })
      );
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: "failed",
        })
      );
    }
  };
};

export const AllOrders = () => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.get(`${API}/session/server/all_bookings`);
      dispatch(Bookings(newd.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const AllConferenceOrders = () => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.get(`${API}/session/server/conference_bookings`);
      dispatch(ConfBookings(newd.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const FilterOrders = (
  type,
  room_no,
  customer,
  order_id,
  s_date,
  e_date
) => {
  return async (dispatch, getdispatch) => {
    try {

      const newd = await axios.get(
        `${API}/session/server/bookings/filter/${room_no}/${customer}/${order_id}/${s_date}/${e_date}`
      );
      dispatch(Bookings(newd.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const FilterOrderConf = (customer, order_id, s_date, enddate) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.get(
        `${API}/session/server/conference/filter/${customer}/${order_id}/${s_date}/${enddate}`
      );
      dispatch(ConfBookings(newd.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const BookingDetail = (id) => {
  return async (dispatch) => {
    try {
      const newd = await axios.post(`${API}/server/getbooking/${id}`);
      dispatch(orderDetail(newd.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const MeetingSpaceMonthly = (year) => {
  return async (dispatch) => {
    try {
      const newd = await axios.get(
        `${API}/session/server/conference/statistics/${year}`
      );
      dispatch(conferenceRev(newd.data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const RevenueMonthly = (year) => {
  return async (dispatch) => {
    try {
      const newd = await axios.get(
        `${API}/session/server/booking/statistics/${year}`
      );
      dispatch(monthstat(newd.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const RateRoom = (orderid, client, data) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(
        `${API}/client/book/rateme/${orderid}/${client}`,
        data
      );
      dispatch(Bookrooms(newd.data));
      dispatch(
        notify.notify_success({
          msg: "Verification successful",
        })
      );
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: "verification failed",
        })
      );
    }
  };
};

export const GetRate = () => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.get(`${API}/rooms/get_ratings`);
      dispatch(allRatings(newd.data));
      dispatch(
        notify.notify_success({
          msg: "Verification successful",
        })
      );
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: "verification failed",
        })
      );
    }
  };
};
export const conferencAvailability = (data) => {
  return async (dispatch) => {
    try {
      console.log(data);
      const newd = await axios.post(
        `${API}/session/client/book/conference/available`,
        data
      );

      if (newd.data) {
        if (newd.data.msg) {
          dispatch(
            notify.notify_error({
              msg: "The conference room is not available at the selected time",
            })
          );
        } else if (!newd.data.msg) {
          dispatch(
            notify.notify_success({
              msg: "conference room available.Book now !",
            })
          );
        }
      }
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: "server not responding",
        })
      );
    }
  };
};
export const CreateChat = (user_id, card_id) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(
        `${API}/session/api/chat/${user_id}/${card_id}`
      );
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: error,
        })
      );
    }
  };
};

export const Clear_CreateChat = () => {
  return async (dispatch) => {};
};

export const Clear_ChatBox = () => {
  return async (dispatch) => {};
};

export const Clear_SearchBox = () => {
  return async (dispatch) => {
    dispatch(searchResult(null));
  };
};
