import React, { Component ,useCallback , useMemo } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Header  from '../components/header/header';
import Detail from '../components/detail/Detail';
import Ticket from './components/ticket/Ticket';
import Passengers from './components/passengers/Passengers.jsx';
import Menu from './components/menu/Menu';
import Choose from './components/choose/Choose.jsx';
import Account from './components/account/Account.jsx';
import URI from 'urijs';
import dayjs from 'dayjs';
import './App.css';
import {
    setArriveStation,
    setDepartDate,
    setDepartStation,
    setSearchParsed,
    setSeatType,
    setTrainNumber,
    fetchInitial,
    createAdult,
    createChild,
    removePassenger,
    updatePassenger,
    showGenderMenu,
    showTicketTypeMenu,
    hideMenu,
    showFollowAdultMenu,
} from './store/actions'
import { bindActionCreators } from 'redux';

function App(props)  {

    const{
        trainNumber,
        dispatch,
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        departStation,
        arriveStation,
        durationStr,
        searchParsed,
        seatType,
        price,
        passengers,
        menu,
        isMenuVisible,
    } = props;

    useEffect(() =>{
        const queries = URI.parseQuery(window.location.search);

        const { trainNumber, dStation, aStation, type, date } = queries;

        dispatch(setDepartStation(dStation));
        dispatch(setArriveStation(aStation));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setSeatType(type));
        dispatch(setDepartDate(dayjs(date).valueOf()));
        dispatch(setSearchParsed(true));
    },[])

    useEffect(()=>{
        if (!searchParsed) {
            return;
        }

        dispatch(fetchInitial('order.json'));
    },[searchParsed,departStation,arriveStation,seatType,departDate])

    const onBack = useCallback(()=>{
        window.history.back();
    },[]);

    const passengersCbs = useMemo(() =>{
        return bindActionCreators(
            {
                createAdult,
                createChild,
                removePassenger,
                updatePassenger,
                showGenderMenu,
                showTicketTypeMenu,
                showFollowAdultMenu,
            },
            dispatch
        );
    },[]);

    const menuCbs = useMemo(()=>{
        return bindActionCreators(
            {
                hideMenu,
            },
            dispatch
        );
    },[]);

    const chooseCbs = useMemo(()=>{
        return bindActionCreators(
            {
                updatePassenger,
            },
            dispatch
        );
    },[]);

    return (
        <div className="app">
            <div className="header-wrapper">
                <Header title="订单填写" onBack={onBack}/>
            </div>
            <div className="detail-warpper">
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
                    <span
                        style={{ display: 'block' }}
                        className="train-icon"
                    ></span>
                </Detail>
            </div>
            <Ticket price={price} type={seatType}/>
            <Passengers passengers={passengers} {...passengersCbs}/>
            {passengers.length >0 && (
                <Choose passengers={passengers} {...chooseCbs}/>
            )}
            <div className="fixed-wrap">
                <Account length={passengers.length} price={price}/>
            </div>
            <Menu show={isMenuVisible} {...menu} {...menuCbs} />
        </div>
    );

}

export default connect(
    function mapStateToProps(state){
        return state;
    },
    function mapDispatchToProps(dispatch){
        return { dispatch };
    }
)(App);