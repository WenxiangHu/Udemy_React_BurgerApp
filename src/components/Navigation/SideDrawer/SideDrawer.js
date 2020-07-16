import React from 'react'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/auxComponent';

function SideDrawer(props) {
    let attachedClasses = 'SideDrawer '
    if (props.open) {
        attachedClasses += 'Open'
    } else {
        attachedClasses += 'Close'
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses} onClick={props.closed}>
                <Logo height='11%' marginBottom='32px' />
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer
