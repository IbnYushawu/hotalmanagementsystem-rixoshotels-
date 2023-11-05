import {USERS} from "./../type";



export default function clients(state=null,action){
    switch(action.type){
        case USERS:
            return {...state,data:action.payload};
        default:
            return state;
    }
}


