import { VERIFIEDCARD } from "../type";



export default function validcard(state=null,action){

    switch(action.type){
        case VERIFIEDCARD:
            return {...state, data:action.payload}
        default:
            return state
    }



}