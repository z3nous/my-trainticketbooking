import React,{memo} from 'react';
import classnames from 'classnames';
import './Menu.css'

const MenuItem = memo(function MenuItem(props){
    const {title , active , onPress,value} = props;
    return (
        <li
            className={classnames({ active })}
            onClick={() => {
                onPress(value);
            }}
        >
            {title}
        </li>
    );
})


const Menu = memo(function Menu(props) {
    const {show,options,hideMenu,onPress} = props;
    return(
        <div>
            {show && (
                <div className="menu-mask" onClick={() => hideMenu()}></div>
            )}
            <div className={classnames('menu',{show})}>
                <div className="menu-title"></div>
                <ul>
                    {options &&
                        options.map(option => {
                            return (
                                <MenuItem
                                    key={option.value}
                                    {...option}
                                    onPress={onPress}
                                ></MenuItem>
                            );
                    })}
                </ul>
            </div>
        </div>
    );
})

export default Menu;