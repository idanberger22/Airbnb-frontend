import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { stayReducer } from "./reducers/stayReducer";
import { userReducer } from "./reducers/userReducer";
import { headerReducer } from "./reducers/headerReducer";
import { reservationReducer } from "./reducers/reservationReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const rootReducer = combineReducers({
    stayModule : stayReducer,
    userModule: userReducer,
    headerModule: headerReducer,
    reservationModule: reservationReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

window.myStore = store