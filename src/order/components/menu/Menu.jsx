import React,{memo} from 'react';
import classnames from 'classnames';
import './Menu.css'

const MenuItem = memo(function MenuItem(props){
    const {title , active} = props;
    return (
        <li
            className={classnames({ active })}
        >
            {title}
        </li>
    );
})


const Menu = memo(function Menu(props) {
    const {show,options,hideMenu} = props;
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
                                ></MenuItem>
                            );
                    })}
                </ul>
            </div>
        </div>
    );
})

export default Menu;