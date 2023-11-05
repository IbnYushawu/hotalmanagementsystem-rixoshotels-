import {MATCHCARDS} from "../type";



export default function matchcards(state=null,action){
    switch(action.type){
        case MATCHCARDS:
            return {...state,data:action.payload};
        default:
            return state;
    }
}
