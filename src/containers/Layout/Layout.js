import React, { useState } from 'react'
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

function Layout(props) {
    // state = {
    //     showSideDrawer: false
    // }
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

    const sideDrawerClosedHandler = () => {
        // this.setState({
        //     showSideDrawer: false
        // });
        setSideDrawerIsVisible(false)
    }

    const sideDrawerToggleHandler = () => {
        // this.setState((prevState) => {
        //     return { showSideDrawer: !prevState.showSideDrawer }
        // });
        sideDrawerIsVisible(!sideDrawerIsVisible)
    }

    // render() {
    return (
        <Aux>
            {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
            <Toolbar
                drawerToggleClicked={sideDrawerToggleHandler}
                isAuth={props.isAuthenticated}
            />
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler} />
            <main className='LayoutContent'>
                {props.children}
            </main>
        </Aux>
    )
    // }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
