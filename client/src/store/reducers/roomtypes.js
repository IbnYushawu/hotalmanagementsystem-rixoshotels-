import {  ROOMTYPES } from "../type";




export default function roomtypes(state=null,action){
    switch(action.type){
        case  ROOMTYPES:
            return {...state,data:action.payload};
        
        default:
            return state;
 
        }
}
