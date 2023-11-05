import {GETROOMS} from "../type";



export default function rooms(state=null,action){
    switch(action.type){
        case  GETROOMS:
            return {...state,data:action.payload};
       
        default:
            return state;
    }
}


