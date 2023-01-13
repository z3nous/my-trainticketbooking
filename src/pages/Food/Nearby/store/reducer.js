import * as actionTypes from "./constants"

const defaultState = {
    mapShow: true,
    shopList:[],
}

export default (state = defaultState,action) =>{
    switch(action.type){
        case actionTypes.CHANGE_SHOP_LIST:
            return {
                ...state,
                shopList:action.data,
            }
        case actionTypes.CHANGE_MAP_SHOW:
            return {
                ...state,
                mapShow:action.data,
            }
        default:
            return state;
    }
}