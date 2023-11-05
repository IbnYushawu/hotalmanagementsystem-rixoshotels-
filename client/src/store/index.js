
import  {configureStore} from "@reduxjs/toolkit";
import appReducers from "./reducers";


const ReduxStore=configureStore({
    reducer:appReducers,
    //devTools: false
    
})


export default ReduxStore;