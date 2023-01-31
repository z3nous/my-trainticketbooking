import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import URI from 'urijs';
import { h0 } from '../common/fp';
import dayjs from 'dayjs';
import { bindActionCreators } from 'redux';

import Header from '../components/header/header';
import './App.css'
import useNav from '../custom-hooks/useNav';
import  Nav from '../components/Nav/Nav'
import List from './component/List/List';
import Bottom from './component/bottom/bottom';
import { 
        prevDate,
        nextDate, 
        setDepartDate,
        setTo,
        setFrom,
        setSearchParsed,
        setTicketTypes,
        setTrainList,
        setTrainTypes,
        setArriveStations,
        setDepartStations,
        setHighSpeed,
        toggleOrderType,
        toggleHighSpeed,
        toggleOnlyTickets,
        toggleIsFiltersVisible,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
    } from './store/actions';


function App(props){
    const{
        from,
        to,
        departDate,
        dispatch,
        trainList,
        searchParsed,
        highSpeed,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,   
    } = props;

    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);

        const {from,to,date,highSpeed} = queries;

        dispatch(setFrom(from));
        dispatch(setTo(to));
        dispatch(setDepartDate(h0(dayjs(date).valueOf())));
        dispatch(setSearchParsed(true));
        dispatch(setHighSpeed(highSpeed === 'true'));
    },[])

    useEffect(()=>{
        if(!searchParsed){
            return;
        }

        fetch('query.json')
            .then(response => response.json())
            .then(result => {
                const {
                    dataMap:{
                        directTrainInfo:{
                            trains,
                            filter:{
                                ticketType,
                                trainType,
                                depStation,
                                arrStation,
                            }
                        },
                    },
                } = result;

                dispatch(setTrainList(trains));
                dispatch(setTicketTypes(ticketType));
                dispatch(setTrainTypes(trainType));
                dispatch(setDepartStations(depStation));
                dispatch(setArriveStations(arrStation));
            });
    },[ 
        from,
        to,
        departDate,
        highSpeed,
        searchParsed,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
    ])

    const onBack = useCallback(()=>{
        window.history.back();
    },[]);

    const {isPrevDisabled, isNextDisabled, prev, next } = useNav(
        departDate,
        dispatch,
        prevDate,
        nextDate,
    );

    const bottomCbs = useMemo(() => {
        return bindActionCreators(
            {
                toggleOrderType,
                toggleHighSpeed,
                toggleOnlyTickets,
                toggleIsFiltersVisible,
                setCheckedTicketTypes,
                setCheckedTrainTypes,
                setCheckedDepartStations,
                setCheckedArriveStations,
                setDepartTimeStart,
                setDepartTimeEnd,
                setArriveTimeStart,
                setArriveTimeEnd,
            },
            dispatch
        );
    }, []);

    return(
        <div>
            <div className="head-wrapper">
                <Header title={`${from} ⇀ ${to}`} onBack={onBack}/>
            </div>
            <Nav 
                date={departDate}
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
                prev={prev}
                next={next}            
            />
            <List list={trainList}/>
            <Bottom
                highSpeed={highSpeed}
                orderType={orderType}
                onlyTickets={onlyTickets}
                {...bottomCbs}
            />
        </div>
    )  
}


export default connect(
    function mapStateToProps(state){
        return state;
    },
    function mapDispatchToProps(dispatch){
        return {dispatch};
    }
)(App);

