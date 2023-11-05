import {ORDERDETAIL} from "../type";
export default function orderdetail(state=null,action){
    switch(action.type){
        case ORDERDETAIL:
            return {...state,data:action.payload};
        default:
            return state;
    }
}


