export const ACTION_SET_TRAIN_NUMBER = 'SET_TRAIN_NUMBER';
export const ACTION_SET_DEPART_STATION = 'SET_DEPART_STATION';
export const ACTION_SET_ARRIVE_STATION = 'SET_ARRIVE_STATION';
export const ACTION_SET_SEAT_TYPE = 'SET_SEAT_TYPE';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';
export const ACTION_SET_ARRIVE_DATE = 'SET_ARRIVE_DATE';
export const ACTION_SET_DEPART_TIME_STR = 'SET_DEPART_TIME_STR';
export const ACTION_SET_ARRIVE_TIME_STR = 'SET_ARRIVE_TIME_STR';
export const ACTION_SET_DURATION_STR = 'SET_DURATION_STR';
export const ACTION_SET_PRICE = 'SET_PRICE';
export const ACTION_SET_PASSENGERS = 'SET_PASSENGERS';
export const ACTION_SET_MENU = 'SET_MENU';
export const ACTION_SET_IS_MENU_VISIBLE = 'SET_IS_MENU_VISIBLE';
export const ACTION_SET_SEARCH_PARSED = 'SET_SEARCH_PARSED';

let child_pasgr = [];
let adult_pasgr = [];

export function setDepartStation(departStation){
    return {
        type:ACTION_SET_DEPART_STATION,
        payload:departStation,
    };
}

export function setArriveStation(arriveStation){
    return {
        type: ACTION_SET_ARRIVE_STATION,
        payload: arriveStation,
    };
}

export function setTrainNumber(trainNumber){
    return {
        type: ACTION_SET_TRAIN_NUMBER,
        payload: trainNumber,
    };
}

export function setSeatType(seatType){
    return {
        type: ACTION_SET_SEAT_TYPE,
        payload: seatType,
    };
}

export function setDepartDate(departDate){
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}

export function setSearchParsed(searchParsed){
    return {
        type: ACTION_SET_SEARCH_PARSED,
        payload: searchParsed,
    };
}

export function fetchInitial(url) {
    return (dispatch, getState) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const {
                    departTimeStr,
                    arriveTimeStr,
                    arriveDate,
                    durationStr,
                    price,
                } = data;

                dispatch(setDepartTimeStr(departTimeStr));
                dispatch(setArriveTimeStr(arriveTimeStr));
                dispatch(setArriveDate(arriveDate));
                dispatch(setDurationStr(durationStr));
                dispatch(setPrice(price));
            });
    };
}

export function setDepartTimeStr(departTimeStr){
    return {
        type: ACTION_SET_DEPART_TIME_STR,
        payload: departTimeStr,
    };
}

export function setArriveTimeStr(arriveTimeStr){
    return {
        type: ACTION_SET_ARRIVE_TIME_STR,
        payload: arriveTimeStr,
    };
}

export function setArriveDate(arriveDate){
    return {
        type: ACTION_SET_ARRIVE_DATE,
        payload: arriveDate,
    };
}

export function setDurationStr(durationStr){
    return {
        type: ACTION_SET_DURATION_STR,
        payload: durationStr,
    };
}

export function setPrice(price) {
    return {
        type: ACTION_SET_PRICE,
        payload: price,
    };
}

let passengerIdSeed = 0;


export function createAdult(){
    return (dispatch, getState) => {
        const { passengers } = getState();
        
        //实时更改所以需要知道当前的所有售票乘客状态
        for (let passenger of passengers){
            //如果乘客有信息没有填写那么就不新增加乘客列表
            const keys = Object.keys(passenger);
            for (let key of keys) {
                if(!passenger[key]){
                    return;
                }
            }
        }

        adult_pasgr = 
        [...adult_pasgr,               
            {
            id: ++passengerIdSeed,
            name: '',
            ticketType: 'adult',
            licenceNo: '',
            seat: 'Z',
        }]

        dispatch(
            setPassengers([
                //添加新的乘客
                ...passengers,
                {
                    id: ++passengerIdSeed,
                    name: '',
                    ticketType: 'adult',
                    licenceNo: '',
                    seat: 'Z',
                },
            ])
        );
    };

}

export function setPassengers(passengers) {
    return {
        type: ACTION_SET_PASSENGERS,
        payload: passengers,
    };
}

export function createChild() {
    return (dispatch,getState) => {
        const { passengers } = getState();

        let adultFound = null;

        for(let passenger of passengers){
            const keys = Object.keys(passenger);
            for (let key of keys){
                if (!passenger[key]) {
                    return;
                }
            }

            if (passenger.ticketType === 'adult') {
                adultFound = passenger.id;
            }
        }

        //可以直接使用alert对页面进行提醒
        if (!adultFound) {
            alert('请至少正确添加一个同行成人');
            return;
        }
        
        child_pasgr = 
        [...child_pasgr,               
            {
            id: ++passengerIdSeed,
            name: '',
            ticketType: 'child',
            licenceNo: '',
            seat: 'Z',
        }]

        dispatch(
            setPassengers([
                ...passengers,
                {
                    id: ++passengerIdSeed,
                    name: '',
                    gender: 'none',
                    birthday: '',
                    followAdult: adultFound,
                    ticketType: 'child',
                    seat: 'Z',
                },
            ])
        );
    };
}

export function removePassenger(id){
    return (dispatch,getState) => {
        const { passengers } = getState();
        //filter是选择数组中满足条件的内容
        const newPassengers = passengers.filter(passenger => {
            return passenger.id !== id && passenger.followAdult !== id;
        });
        //每次更新操作就是更新数组，对数组整体更新
        dispatch(setPassengers(newPassengers));
    };
}

export function updatePassenger(id, data, keysToBeRemoved = []) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        for (let i = 0; i < passengers.length; ++i) {
            if (passengers[i].id === id) {
                const newPassengers = [...passengers];
                newPassengers[i] = Object.assign({}, passengers[i], data);

                for (let key of keysToBeRemoved) {
                    delete newPassengers[i][key];
                }

                dispatch(setPassengers(newPassengers));

                break;
            }
        }
    };
}

export function showGenderMenu(id) {
    return (dispatch, getState) => {

        const { passengers } = getState();

        const passenger = passengers.find(passenger => passenger.id === id);

        if(!passenger) {
            return;
        }

        dispatch(
            showMenu({
                onPress(gender) {
                    dispatch(updatePassenger(id,{gender}));
                    dispatch(hideMenu())
                },
                options: [
                    {
                        title: '男',
                        value: 'male',
                        active: 'male' === passenger.gender,
                    },
                    {
                        title: '女',
                        value: 'female',
                        active: 'female' === passenger.gender,
                    },
                ],
            })
        );
    }
}

export function showMenu(menu){
    return dispatch => {
        dispatch(setMenu(menu));
        dispatch(setIsMenuVisible(true));
    }
}

export function setMenu(menu){
    return {
        type:ACTION_SET_MENU,
        payload:menu,
    }
}

export function setIsMenuVisible(isMenuVisible){
    return {
        type:ACTION_SET_IS_MENU_VISIBLE,
        payload:isMenuVisible,
    }
}

export function hideMenu(){
    return setIsMenuVisible(false);
}

export function showTicketTypeMenu(id){
    return (dispatch,getState) => {
        const { passengers } =getState();

        const passenger = passengers.find( passenger => passenger.id === id );

        if(!passenger) {
            return;
        }

        dispatch(
            showMenu({
                onPress(ticketType) {
                    if ('adult' === ticketType) {
                        dispatch(
                            updatePassenger(
                                id,
                                {
                                    ticketType,
                                    licenceNo: '',
                                },
                                ['gender', 'followAdult', 'birthday']
                            )
                        );
                    } else {

                        const adults = passengers.filter(
                            passenger =>
                                passenger.ticketType === 'adult'
                                && passenger.id !== id
                        );

                        const length = adults.length;

                        if (length > 0 ) {
                            dispatch(
                                updatePassenger(
                                    id,
                                    {
                                        ticketType,
                                        gender: '',
                                        followAdult: adults[0].name,
                                        birthday: '',
                                    },
                                    ['licenceNo']
                                )
                            );
                        } else {
                            alert('没有其他成人乘客');
                        }
                    }

                    dispatch(hideMenu());
                },
                options: [
                    {
                        title: '成人票',
                        value: 'adult',
                        active: 'adult' === passenger.ticketType,
                    },
                    {
                        title: '儿童票',
                        value: 'child',
                        active: 'child' === passenger.ticketType,
                    },
                ]
            })
        );
    };
}

export function showFollowAdultMenu(id){
    return(dispatch,getState) => {
        const { passengers } = getState();

        const passenger = passengers.find(passenger => passenger.id === id);

        if(!passenger) {
            return;
        }

        dispatch(
            showMenu({
                onPress(followAdult) {
                    dispatch(updatePassenger(id, { followAdult }));
                    dispatch(hideMenu());
                },
                options: passengers
                    .filter(passenger => passenger.ticketType === 'adult')
                    .map(adult => {
                        return {
                            title: adult.name,
                            value: adult.id,
                            active: adult.id === passenger.followAdult,
                        };
                    }),
            })
        );
    };
}