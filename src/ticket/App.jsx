import React ,{ useEffect,useCallback,useMemo } from "react";
import { bindActionCreators } from "redux";
import { connect, Connect } from "react-redux";
import URI from 'urijs';
import dayjs from 'dayjs';
import { h0 } from '../common/fp';
import './App.css';
import Header from '../components/header/header';
import Nav from '../components/Nav/Nav';
import useNav from '../custom-hooks/useNav';
import Detail from '../components/detail/Detail';


import {
    setArriveStation,
    setDepartDate,
    setDepartStation,
    setSearchParsed,
    setTrainNumber,
    setArriveDate,
    setArriveTimeStr,
    setDepartTimeStr,
    setDurationStr,
    setTickets,
} from './store/actions'


function App(props){
    const {
        trainNumber,
        prevDate,
        nextDate,
        departDate,
        arriveDate,
        departStation,
        arriveStation,
        durationStr,
        dispatch,
        searchParsed,
        departTimeStr,
        arriveTimeStr,
    } = props;

    const onBack  = useCallback(()=>{
        window.history.back();
    },[])
    
    useEffect(()=>{
        const queries = URI.parseQuery(window.location.search);
        const { aStation, dStation, date, trainNumber } = queries;
       
        dispatch(setDepartStation(dStation));
        dispatch(setArriveStation(aStation));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setDepartDate(h0(dayjs(date).valueOf())));

        dispatch(setSearchParsed(true));
    }
    ,[])

    useEffect(() => {
        document.title = trainNumber;
    }, [trainNumber]);

    useEffect(()=>{

        if(!searchParsed){
            return;
        }

        fetch('ticket.json')
            .then(response => response.json())
            .then(result => {
                window.console.log(result);
                const { detail, candidates } = result;
                const {
                    departTimeStr,
                    arriveTimeStr,
                    arriveDate,
                    durationStr,
                } = detail;
                
                dispatch(setDepartTimeStr(departTimeStr));
                dispatch(setArriveTimeStr(arriveTimeStr));
                dispatch(setArriveDate(arriveDate));
                dispatch(setDurationStr(durationStr));
                dispatch(setTickets(candidates));
            })
    },[searchParsed, departDate, trainNumber])

    const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
        departDate,
        dispatch,
        prevDate,
        nextDate
    );

    return (
        <div className="app">
            <div className="head-wrapper">
                <Header title={trainNumber} onBack={onBack} />
            </div>
            <div className="nav-wrapper">
                <Nav
                    date={departDate}
                    isPrevDisabled={isPrevDisabled}
                    isNextDisabled={isNextDisabled}
                    prev={prev}
                    next={next}
                />
            </div>
            <div className="detail-wrapper">
                <Detail
                    departDate={departDate}
                    arriveDate={arriveDate}
                    departTimeStr={departTimeStr}
                    arriveTimeStr={arriveTimeStr}
                    trainNumber={trainNumber}
                    departStation={departStation}
                    arriveStation={arriveStation}
                    durationStr={durationStr}
                >
                    <span className="left"></span>
                    <span className="schedule">
                        时刻表
                    </span>
                    <span className="right"></span>
                </Detail>
            </div>
        </div>
    )
}

export default connect(
    function mapStateToProps(state){
        return state;
    },
    function mapDispatchToProps(dispatch){
        return { dispatch };
    }
)(App);