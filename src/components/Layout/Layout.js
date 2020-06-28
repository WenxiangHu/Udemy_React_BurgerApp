import React from 'react'
import Aux from '../../hoc/Aux';
import './Layout.css'

function Layout(props) {
    return (
        <Aux>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className='LayoutContent'>
                {props.children}
            </main>
        </Aux>
    )
}

export default Layout
