export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE =
    'SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY =
    'SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE =
    'SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';

export function setFrom(from){
    return{
        type:ACTION_SET_FROM,
        payload:from,
    };
}

export function setTo(to){
    return{
        type:ACTION_SET_TO,
        payload:to,
    };
}

export function exchangeFromTo(){
    return (dispatch,getState) =>{
        const {from,to} = getState();
        dispatch(setFrom(to));
        dispatch(setTo(from));
    }
}

export function toggleHighSpeed(){
    return (dispatch, getState) => {
        const { highSpeed } = getState();
        window.console.log("isHighspeed:",highSpeed);
        dispatch({
            type: ACTION_SET_HIGH_SPEED,
            payload: !highSpeed,
        });
    };
}