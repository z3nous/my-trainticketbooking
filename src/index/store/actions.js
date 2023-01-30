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

export function hideCitySelector(){

    return {
        type:ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
        payload: false,
    };
}

export function fetchCityData(){
    return (dispatch,getState) =>{
        const { isLoadingCityData} = getState();
        if(isLoadingCityData){
            return;
        }

        const cache = JSON.parse(
            localStorage.getItem('city_data_cache') || '{}'
        );
        
        if(Date.now() < cache.expires){
            dispatch(setCityData(cache.setCityData));
            return;
        }

        dispatch(setIsLoadingCityData(true));


        fetch('cities.json')
            .then(res =>res.json())
            .then(cityData => {
                dispatch(setCityData(cityData));
                window.console.log("here is the data",cityData);
                localStorage.setItem(
                    'city_data_cache',
                    JSON.stringify({
                        expires:Date.now(),
                        data:cityData,
                    })
                );
                
                dispatch(setIsLoadingCityData(false));   
            })
            .catch(()=>{
                dispatch(setIsLoadingCityData(false));
            });
    };
}

export function setCityData(cityData){
    return {
        type:ACTION_SET_CITY_DATA,
        payload: cityData,
    };
}

export function setSelectedCity(city){
    return (dispatch,getState) =>{
        const {currentSelectingLeftCity} = getState();
        if(currentSelectingLeftCity){
            dispatch(setFrom(city));
        } else {
            dispatch(setTo(city));
        }

        dispatch(hideCitySelector());
    }
}

export function setIsLoadingCityData(isLoadingCityData){
    return {
        type:ACTION_SET_IS_LOADING_CITY_DATA,
        payload: isLoadingCityData,  
    };

}

export function showCitySelector(currentSelectingLeftCity) {
    return dispatch => {
        dispatch({
            type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload: true,
        });

        dispatch({
            type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload: currentSelectingLeftCity,
        });
    };
}

export function hideDateSelector(){  
    return {
        type:ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload:false,
    }
}

export function setDepartDate(departDate){
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}

export function showDateSelector(){
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: true,
    };
}