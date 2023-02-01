import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import URI from 'urijs';
import dayjs from 'dayjs';
import classnames from 'classnames';
import leftPad from 'left-pad';
import './Schedule.css';

const Schedule = memo(function Schedule(props){
    const{ date, trainNumber , departStation , arriveStation } = props;
    const [scheduleList, setScheduleList] = useState([]);

    useEffect(()=>{
        fetch('schdule.json')
            .then(response => response.json)
            .then(data => {
                
                let departRow;
                let arriveRow;

                for(let i =0; i<data.length ; i++){
                    if(!departRow){
                        if(data[i].station === departStation){
                            departRow = Object.assign(data[i],{
                                beforeDepartStation: false,
                                isDepartStation: true,
                                afterArriveStation: false,
                                isArriveStation: false,
                            });
                        } else {
                            Object.assign(data[i], {
                                beforeDepartStation: true,
                                isDepartStation: false,
                                afterArriveStation: false,
                                isArriveStation: false,
                            });
                        }
                    }else if(!arriveRow){
                        if (data[i].station === arriveStation) {
                            arriveRow = Object.assign(data[i], {
                                beforeDepartStation: false,
                                isDepartStation: false,
                                afterArriveStation: false,
                                isArriveStation: true,
                            });
                        } else {
                            Object.assign(data[i], {
                                beforeDepartStation: false,
                                isDepartStation: false,
                                afterArriveStation: false,
                                isArriveStation: false,
                            });
                        }
                    }else {
                        Object.assign(data[i], {
                            beforeDepartStation: false,
                            isDepartStation: false,
                            afterArriveStation: true,
                            isArriveStation: false,
                        });
                    }
                    Object.assign(data[i], {
                        isStartStation: i === 0,
                        isEndStation: i === data.length - 1,
                    });
                }
                setScheduleList(data);
            })

    },[date, trainNumber, departStation, arriveStation])

    return(
        <div className="schedule">
            <div className="dialog">
                <h1>列车时刻表</h1>
            </div>
        </div>
    );
})

export default Schedule;