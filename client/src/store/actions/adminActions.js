import axios from "axios";
import * as notify from "./notification";
import { Axiosinstance, Getusercookie } from "./usercookie";
import cookie from "react-cookies";
const {
  USER_DETAIL,
  USERS,
  PRE_REGISTER,
  API,
  ADMIN_DETAIL,
  ADMINACCOUNT,
} = require("../type");

export const get_users = (detail) => ({
  type: USERS,
  payload: detail,
});
export const adminEmployees = (account) => ({
  type: ADMINACCOUNT,
  payload: account,
});
export const pre_register = (data) => ({
  type: PRE_REGISTER,
  payload: data,
});

export const userDetail = (data) => ({
  type: USER_DETAIL,
  payload: data,
});

export const adminDetail = (data) => ({
  type: ADMIN_DETAIL,
  payload: data,
});

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use((config) => {
  config.mode = "cors";
  return config;
});
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const content = await axios.get(`${API}/user/getallusers`);
      dispatch(get_users(content.data));
    } catch (error) {}
  };
};
export const sendMsg = (data, id) => {
  return async (dispatch) => {
    try {
      await axios.post(`${API}/user/usermsg`, data);
      dispatch(
        notify.notify_success({
          msg: "message sent",
        })
      );
    } catch (error) {}
  };
};
export const QuestRefunds = (data, id) => {
  return async (dispatch) => {
    try {
      await axios.post(`${API}/user/quest/refund`, data);
      dispatch(
        notify.notify_success({
          msg: "message sent",
        })
      );
    } catch (error) {}
  };
};

export const sendMsgClient = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`${API}/user/quest/msg`, data);
      dispatch(
        notify.notify_success({
          msg: "message sent",
        })
      );
    } catch (error) {}
  };
};

export const BlockEmployees = (id, admin) => {
  return async (dispatch) => {
    try {
      await axios.patch(`${API}/admin/adminstrator/blockuser/${id}/${admin}`);
      const adminAccount = await axios.get(
        `${API}/admin/adminstrator/accounts/${admin}`
      );
      dispatch(adminEmployees(adminAccount.data));
      dispatch(
        notify.notify_success({
          msg: "Successfull",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(notify.notify_error({ msg: "Failed" }));
    }
  };
};

export const TerminateAdminAccount = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API}/admin/adminstrator/deluser/${id}`);

      dispatch(
        notify.notify_success({
          msg: "Successfull",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(notify.notify_error({ msg: "Failed" }));
    }
  };
};
export const TerminateUserAccount = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API}/user/deluser/${id}`);

      const content = await axios.get(`${API}/user/getallusers`);
      dispatch(get_users(content.data));

      dispatch(
        notify.notify_success({
          msg: "Successfull",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(notify.notify_error({ msg: "Failed" }));
    }
  };
};

export const Blockuser = (id) => {
  return async (dispatch) => {
    try {
      await axios.patch(`${API}/user/suspenduser/${id}`);
      const content = await axios.get(`${API}/user/getallusers`);
      dispatch(get_users(content.data));
      dispatch(
        notify.notify_success({
          msg: "Successfull",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(notify.notify_error({ msg: "Failed" }));
    }
  };
};

export const UnBlockEmployee = (id, admin) => {
  return async (dispatch) => {
    try {
      await axios.patch(`${API}/admin/adminstrator/unblockuser/${id}/${admin}`);

      const adminAccount = await axios.get(
        `${API}/admin/adminstrator/accounts/${admin}`
      );
      dispatch(adminEmployees(adminAccount.data));

      dispatch(
        notify.notify_success({
          msg: "Successfull",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(notify.notify_error({ msg: "Failed" }));
    }
  };
};
export const UnBlockuser = (id) => {
  return async (dispatch) => {
    try {
      await axios.patch(`${API}/user/unblockuser/${id}`);
      const content = await axios.get(`${API}/user/getallusers`);
      dispatch(get_users(content.data));
      dispatch(
        notify.notify_success({
          msg: "Successfull",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(notify.notify_error({ msg: "Failed" }));
    }
  };
};

export const preRegister = (userdata) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(`${API}/user/preregister`, userdata);

      dispatch(pre_register(newd.data));
      dispatch(
        notify.notify_success({
          msg: "Please check your mail to verify account",
        })
      );
    } catch (error) {
      dispatch(notify.notify_error({ msg: error.response.data.msg }));
    }
  };
};

export const ComfirmUserS = (userdata) => {
  return async (dispatch) => {
    try {
      const newd = await axios.post(`${API}/user/authenticateme`, userdata);
      dispatch(notify.notify_success({ msg: "Account verified" }));
    } catch (error) {
      dispatch(notify.notify_success({ msg: error.response.data.msg }));
    }
  };
};

export const updateAccount = (data, id) => {
  return async (dispatch) => {
    try {
      const profiledetail = await axios.patch(
        `${API}/user/modifyuser/${id}`,
        data
      );
      dispatch(userDetail({ account: profiledetail.data, auth: true }));

      dispatch(notify.notify_success({ msg: "Account Updated" }));
    } catch (error) {
      dispatch(notify.notify_error({ msg: error.response.data }));
    }
  };
};

export const AddAdminAccount = (data, id) => {
  return async (dispatch) => {
    try {
      await axios.post(`${API}/admin/adminstrator/newaccount/${id}`, data);

      const adminAccount = await axios.get(
        `${API}/admin/adminstrator/accounts/${id}`
      );
      dispatch(adminEmployees(adminAccount.data));

      dispatch(notify.notify_success({ msg: "Account added" }));
    } catch (error) {
      dispatch(notify.notify_error({ msg: error.response.data.msg }));
    }
  };
};
export const AllAdminAccount = (id) => {
  return async (dispatch) => {
    try {
      const adminAccount = await axios.get(
        `${API}/admin/adminstrator/accounts/${id}`
      );
      dispatch(adminEmployees(adminAccount.data));
    } catch (error) {}
  };
};
export const UpdatePass = (data, id) => {
  return async (dispatch) => {
    try {
      const profiledetail = await axios.patch(
        `${API}/user/userresetpass/${id}`,
        data
      );
      dispatch(userDetail({ account: profiledetail.data, auth: true }));
      dispatch(notify.notify_success({ msg: "Account Password Updated" }));
    } catch (error) {
      dispatch(notify.notify_error({ msg: error.response.data.msg }));
    }
  };
};
export const SignIn = (data) => {
  return async (dispatch) => {
    try {
      console.log(data);
      const profiledetail = await axios.post(`${API}/user/signin`, data);
      dispatch(userDetail({ account: profiledetail.data, auth: true }));
      dispatch(
        notify.notify_success({
          msg: `${profiledetail.data.fullname} Welcome back!!`,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(notify.notify_error({ msg: error.response.data.msg }));
      dispatch(userDetail({ loading: false }));
    }
  };
};
export const AdminSignIn = (data) => {
  return async (dispatch) => {
    try {
      const profiledetail = await axios.post(`${API}/admin/auth/signin`, data);
      dispatch(adminDetail({ account: profiledetail.data, auth: true }));
      dispatch(
        notify.notify_success({
          msg: `${profiledetail.data.fullname} Welcome back!!`,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(notify.notify_error({ msg: error.response.data.msg }));
      dispatch(userDetail({ loading: false }));
    }
  };
};

export const Signout = () => {
  return async (dispatch) => {
    try{

      await axios.post(`${API}/admin/auth/signout`)
      dispatch(userDetail({ account: {}, auth: false, loading: false }));
      dispatch(adminDetail({ account: {}, auth: false, loading: false }));
      dispatch(
        notify.notify_success({
          msg: ` Hope to see you back !!`,
        })
      );
    }


    catch(error){
      console.log(error)
    }
 
  };
};

let token = Getusercookie();
const config = {
  headers: {
    authuser: token,
    // other headers can be added here
  },
};

export const CheckLogin = () => {
  return async (dispatch) => {
    try {
      await axios.post(`${API}/user/userprofile`, null, config);
    } catch (error) {}
  };
};

export const AutoLogin = () => {
  return async (dispatch) => {
    try {
      const profiledetail = await axios.get(`${API}/user/getprofile`);

      dispatch(
        userDetail({ account: profiledetail.data, auth: true, loading: false })
      );
    } catch (error) {
      dispatch(userDetail({ auth: false, loading: false }));
    }
  };
};
export const AdminLogin = () => {
  return async (dispatch) => {
    try {
      const profiledetail = await axios.get(`${API}/user/admin_auth
      `);

      dispatch(
        adminDetail({ account: profiledetail.data, auth: true, loading: false })
      );
    } catch (error) {
      dispatch(adminDetail({ auth: false, loading: false }));
    }
  };
};

export const SendresetLink = (data) => {
  return async (dispatch) => {
    try {
      const profiledetail = await axios.post(
        `${API}/user/userforgotpass`,
        data
      );
      dispatch(notify.notify_success({ msg: "Check your mails" }));
    } catch (error) {
      dispatch(notify.notify_error({ msg: error.response.data }));
    }
  };
};

export const Passwordreset = (data) => {
  return async (dispatch) => {
    try {
      const profiledetail = await axios.patch(
        "/user/passwordforgotreset",
        data
      );
      dispatch(notify.notify_success({ msg: "Welcome back" }));
    } catch (error) {
      dispatch(notify.notify_error({ msg: error.response.data }));
    }
  };
};
