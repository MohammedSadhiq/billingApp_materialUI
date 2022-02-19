import { createStore } from "redux";
import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import billsReducer from "../Reducers/billsReducer";
import customerReducer from "../Reducers/customerReducer";
import productReducer from "../Reducers/productReducer";
import userReducer from "../Reducers/userReducer";
import loginReducer from "../Reducers/loginReducer";


const configureStore = ()=>{
    const store = createStore(combineReducers({
        bills: billsReducer,
        customer: customerReducer,
        user: userReducer,
        login : loginReducer,
        product:productReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore