import React from 'react'
import burgerLogo from '../../assets/images/logo.png'
import './Logo.css'

function Logo(props) {
    return (
        <div className='Logo' style={{ height: props.height, marginBottom: props.marginBottom }}>
            <img src={burgerLogo} alt="MyBurgerLogo" />
        </div>
    )
}

export default Logo
