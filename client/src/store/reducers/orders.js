import { ALLORDERSD } from "../type";

export default function orders(state = null, action) {
  switch (action.type) {
    case ALLORDERSD:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
