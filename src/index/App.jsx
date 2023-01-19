import './App.css';
import React,{useCallback,useMemo} from 'react';
import {connect} from 'react-redux';
import Header from "../components/header/header.jsx";
import Jounery from "./components/journey/Journey.jsx";
import Submit from './components/Submit/Submit.jsx';
import HighSpeed from "./components/high-speed/HighSpeed.jsx"
import DepartDate from "./components/depart-date/DepartDate.jsx";
import { bindActionCreators } from 'redux';
import DateSelector from '../components/date-selector/DateSelector';
import CitySelector from '../components/city-selector/CitySelector';
import { h0 } from '../common/fp';
import { 
    exchangeFromTo,
    toggleHighSpeed,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showCitySelector,
    hideDateSelector,
    setDepartDate,
    showDateSelector,
  } from './store/actions'



function App(props) {
  const {
    from,
    to,
    departDate,
    dispatch,
    highSpeed,
    cityData,
    isCitySelectorVisible,
    isLoadingCityData,
    isDateSelectorVisible,
  } = props;

  const onBack = useCallback(()=>{
    window.history.back();
  },[])

  const highSpeedCbs= useMemo(()=>{
    return bindActionCreators(
      {
        toggle:toggleHighSpeed,
      },
      dispatch
    );
  },[])

  const DateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack:hideDateSelector,
      },
      dispatch
    );
  },[])

  const cbs = useMemo(()=>{
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector,
      },
      dispatch
    );
  },[]);

  const citySelectorCbs = useMemo(()=>{
    return bindActionCreators(
      {
        onBack:hideCitySelector,
        fetchCityData,
        onSelect:setSelectedCity,
      },
      dispatch
    );  
  },[])

  const departDateCbs = useMemo(() => {
    return bindActionCreators(
        {
            onClick: showDateSelector,
        },
        dispatch
    );
  }, []);

  const onSelectDate = useCallback(day => {
    if (!day) {
        return;
    }

    if (day < h0()) {
        return;
    }

    dispatch(setDepartDate(day));
    dispatch(hideDateSelector());
  }, []);

  return (
    <div>
      <div className='header-wrapper'>
        <Header title="火车票" onBack={onBack}></Header>
      </div>
      <form action="./query.html" className="form">
        <Jounery from={from} to={to} {...cbs} ></Jounery>
        <DepartDate time={departDate} {...departDateCbs}></DepartDate>
        <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
        <Submit />      
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector
        show={isDateSelectorVisible}
        {...DateSelectorCbs}
        onSelect={onSelectDate}
      />
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
      return state;
  },
  function mapDispatchToProps(dispatch) {
      return { dispatch };
  }
)(App);

