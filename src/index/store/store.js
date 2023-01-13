import { combineReducers, applyMiddleware,createStore  } from "redux";
import reducers from "./reducer";
import thunk from "redux-thunk";

export default createStore(
    combineReducers(reducers),
    {
        from: '北京',
        to: '上海',
        isCitySelectorVisible: false,
        currentSelectingLeftCity: false,
        cityData: null,
        isLoadingCityData: false,
        isDateSelectorVisible: false,
        departDate: Date.now(),
        highSpeed: false,
    },
    applyMiddleware(thunk)
);