import { CONFERENCEREVENUE } from "../type";

export default function conferenceIncome(state = null, action) {
  switch (action.type) {
    case CONFERENCEREVENUE:
      return {...state,data:action.payload};
    default:
      return state;
  }
}
