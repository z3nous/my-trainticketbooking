import './App.css';
import React,{useCallback,useMemo} from 'react';
import {connect} from 'react-redux';
import Header from "../components/header/header.jsx";
import Jounery from "./components/journey/Journey.jsx";
import Submit from './components/Submit/Submit.jsx';
import HighSpeed from "./components/high-speed/HighSpeed.jsx"
import DepartDate from "./components/depart-date/DepartDate.jsx";
import { bindActionCreators } from 'redux';
import { 
    exchangeFromTo,
    toggleHighSpeed,
  } from './store/actions'


function App(props) {
  const {
    from,
    to,
    departDate,
    dispatch,highSpeed
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

  const cbs = useMemo(()=>{
    return bindActionCreators(
      {
        exchangeFromTo
      },
      dispatch
    );
  },[]);

  return (
    <div>
      <div className='header-wrapper'>
        <Header title="火车票" onBack={onBack}></Header>
      </div>
      <form action="./query.html" className="form">
        <Jounery from={from} to={to} {...cbs}></Jounery>
        <DepartDate time={departDate}></DepartDate>
        <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
        <Submit />      
      </form>
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

