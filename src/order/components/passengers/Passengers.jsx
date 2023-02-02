import React, {memo,useMemo} from 'react';
import './Passenger.css';

const Passenger = memo(function Passenger(props){
    const {
        id,
        name,
        followAdultName,
        ticketType,
        licenceNo,
        gender,
        birthday,
        onRemove,
        onUpdate,
        showGenderMenu,
        showFollowAdultMenu,
        showTicketTypeMenu,
    } = props;

    const isAdult = ticketType === 'adult';

    return(
        <li className="passenger">
            <i className="delete" onClick={() => onRemove(id)}>
                -
            </i>
            <ol>
                <li className="item">
                    <label className="label name">姓名</label>    
                    <input
                        type="text"
                        className="input name"
                        placeholder="乘客姓名"
                        value={name}
                        onChange={e => onUpdate(id, {name:e.target.value})}
                    />
                    <label></label>
                </li>     
            </ol>
        </li>    
    );
})

const Passengers = memo(function Passenger(props){
    const {
        passengers,
    } = props;

    const nameMap = useMemo(()=>{
        const ret = {};

        for(const passenger of passengers){
            ret[passenger.id] = passenger.name;
        }

        return ret;
    },[Passengers])


    return(
        <div className="passengers">
            <ul>
                {Passengers.map(passenger => {
                    <Passenger
                        {...passenger}
                        followAdultName={nameMap[passenger.followAdult]}
                        showGenderMenu={showGenderMenu}
                        showFollowAdultMenu={showFollowAdultMenu}
                        onRemove={removePassenger}
                        onUpdate={updatePassenger}
                        key={passenger.id}
                    />
                })}
            </ul>
        </div>
    );

})

export default Passengers;