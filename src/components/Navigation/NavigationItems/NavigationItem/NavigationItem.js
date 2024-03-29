import React from 'react';
import { NavLink } from 'react-router-dom'
import './NavigationItem.css'

function NavigationItem(props) {
    return (
        <li className='NavigationItem'>
            <NavLink to={props.link} activeClassName='active' exact={props.exact}>
                {props.children}
            </NavLink>
        </li>
    )
}

export default NavigationItem
