import classNames from "classnames";
import Header from "../header/header";



export default function DateSelector(props){
    const {
        show,
        onSelect,
        onBack,
    } = props;

    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(1);

    const monthSequence = [now.getTime()];

    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());
    
    now.setMonth(now.getMonth() +1);
    monthSequence.push(now.getTime());

    return (
        <div className={classNames('date-selector',{hidden:!show })}>
            <Header title="日期选择" onBack={onBack}/>
        </div>
    )
}