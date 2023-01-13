import React,{useMemo} from 'react';
import PropTypes from 'prop-types';
import {h0} from '../../../common/fp'
import dayjs from 'dayjs';
import './DepartDate.css';

export default function DepartDate(props){
    const {time} = props;

    const h0ofDepart = h0(time);
    const departDate = new Date(h0ofDepart);

    const DepartDateString = useMemo(()=>{
        return dayjs(h0ofDepart).format('YYYY-MM-DD');
    },[h0ofDepart])

    const isToday = h0ofDepart ===h0();
    const WeekString =
        '周'+
        ['日','一','二','三','四','五','六'][departDate.getDay()] +
        (isToday? '(今天)' : '');

        return (
            <div className="depart-date">
                <input type="hidden" name="date" value={DepartDateString}/>
                {DepartDateString}<span className="depart-week">{WeekString}</span>
            </div>
        )

}