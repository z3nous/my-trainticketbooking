import { h0 } from '../../common/fp';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';
export const ACTION_SET_ARRIVE_DATE = 'SET_ARRIVE_DATE';
export const ACTION_SET_DEPART_TIME_STR = 'SET_DEPART_TIME_STR';
export const ACTION_SET_ARRIVE_TIME_STR = 'SET_ARRIVE_TIME_STR';
export const ACTION_SET_DEPART_STATION = 'SET_DEPART_STATION';
export const ACTION_SET_ARRIVE_STATION = 'SET_ARRIVE_STATION';
export const ACTION_SET_TRAIN_NUMBER = 'SET_TRAIN_NUMBER';
export const ACTION_SET_DURATION_STR = 'SET_DURATION_STR';
export const ACTION_SET_TICKETS = 'SET_TICKETS';
export const ACTION_SET_IS_SCHEDULE_VISIBLE = 'SET_IS_SCHEDULE_VISIBLE';
export const ACTION_SET_SEARCH_PARSED = 'SET_SEARCH_PARSED';

export function setDepartStation(departStation){
    return {
        type:ACTION_SET_DEPART_STATION,
        payload: departStation,
    };
}

export function setArriveStation(arriveStation){
    return {
        type:ACTION_SET_ARRIVE_STATION,
        payload:arriveStation,
    }
}

export function setTrainNumber(trainNumber){
    return {
        type: ACTION_SET_TRAIN_NUMBER,
        payload: trainNumber,
    };
}

export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}

export function setSearchParsed(searchParsed) {
    return {
        type: ACTION_SET_SEARCH_PARSED,
        payload: searchParsed,
    };
}

export function setDepartTimeStr(departTime){
    return{
        type: ACTION_SET_DEPART_TIME_STR,
        payload:departTime,
    }
}

export function setArriveTimeStr(arriveTime){
    return {
        type: ACTION_SET_ARRIVE_TIME_STR,
        payload:arriveTime,
    }
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

export function setTickets(tickets){
    return {
        type: ACTION_SET_TICKETS,
        payload: tickets,
    };
}