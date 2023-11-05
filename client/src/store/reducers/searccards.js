import { SEARCRESULTS } from "../type";



export default function searchRooms(state=null,action){

    switch(action.type){
        case SEARCRESULTS:
            return {...state, data:action.payload}
        default:
            return state
    }



}