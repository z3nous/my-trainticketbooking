import React, {memo,useMemo} from 'react';
import './Passenger.css';

const Passenger = memo(function Passenger(props){
    const {
        id,
        name,
        ticketType,
        licenceNo,
        onRemove,
        onUpdate,
        gender,
        birthday,
        followAdult,
        showGenderMenu,
        showTicketTypeMenu,
        showFollowAdultMenu,
    } = props;
    
    const isAdult = ticketType === 'adult';

    return(
        <li className="passenger">
            <i className="delete" onClick={()=>{onRemove()}}>
                —
            </i>

            <ol className="items">
                <li className="item">
                    <label className="label name">姓名</label>
                    <input
                        type="text"
                        className="input name"
                        value={name}
                        placeholder="乘客姓名"
                        onChange={e =>
                            onUpdate(id,{name:e.target.value })
                        }
                    />
                    <label 
                        className="ticket-type"
                        onClick={() => showTicketTypeMenu(id)}
                    >
                        {isAdult ? '成人票' : '儿童票'}
                    </label>
                </li>
                {isAdult && (
                    <li className='item'>
                        <label className="label licenceNo">身份证</label>
                        <input 
                            type="text" 
                            className="input licenceNo"
                            placeholder="证件号码"
                            value={licenceNo}
                            onChange={e =>
                                onUpdate(id,{licenceNo:e.target.value })
                            }
                        />
                    </li>
                )}
                {!isAdult && (
                    <li className="item arrow">
                        <label className="label gender">性别</label>
                        <input 
                            type="text" 
                            className="input gender"
                            placeholder="请选择"
                            onClick={()=> showGenderMenu(id)}
                            value={
                                gender === 'male'
                                    ? '男'
                                    : gender === 'female'
                                    ? '女'
                                    : ''
                            }
                            readOnly
                        />
                    </li>
                )}
                {!isAdult && (
                    <li className="item">
                        <label className="label birthday">出生日期</label>
                        <input
                            type="text"
                            className="input birthday"
                            placeholder="如 19951015"
                            value={birthday}
                            onChange={e =>
                                onUpdate(id,{birthday:e.target.value})
                            }
                        />
                    </li>
                )}
                {!isAdult && (
                    <li className="item arrow">
                        <label className="label followAdult">同行成人</label>
                        <input
                            type="text"
                            className="input followAdult"
                            placeholder="请选择"
                            value={followAdult}
                            onClick={() => showFollowAdultMenu(id)}
                            readOnly
                        />
                    </li>
                )}
            </ol>

        </li>    
    );
})

const Passengers = memo(function Passengers(props){
    const {
        passengers,
        createAdult,
        createChild,
        removePassenger,
        updatePassenger,
        showGenderMenu,
        showTicketTypeMenu,
        showFollowAdultMenu,
    } = props;
    

    //key应该在使用map的地方调用
    return(
        <div className="passengers">
            <ul>
                {passengers.map( passenger =>{
                    return(
                        <Passenger
                            {...passenger}
                            onRemove={removePassenger}
                            key={passenger.id}
                            onUpdate={updatePassenger}
                            showGenderMenu={showGenderMenu}
                            showTicketTypeMenu={showTicketTypeMenu}
                            showFollowAdultMenu={showFollowAdultMenu}
                        />
                    );
                })}
            </ul>
            <section className="add">
                <div className="adult" onClick={() => createAdult()}>
                    添加成人
                </div>
                <div className="child" onClick={() => createChild()}>
                    添加儿童
                </div>
            </section>
        </div>
    );

})

export default Passengers;