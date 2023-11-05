import { GETROOM } from "../type";



export default function room(state=null,action){

    switch(action.type){
        case GETROOM:
            return {...state, data:action.payload}
        default:
            return state
    }



}