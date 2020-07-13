import React, { Fragment } from 'react'
import './Modal.css'
// import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

function Modal(props) {

    // shouldComponentUpdate(nextProps, nextState) {
    //     // if (nextProps.show !== props.show) {
    //     //     return true
    //     // } return false
    //     return nextProps.show !== props.show || nextProps.children !== props.children
    // }

    // render() {
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className='Modal'
                style={{
                    transform: props.show ? 'translateY(0)' : 'tanslateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Fragment>
    )
}
// }

export default React.memo(
    Modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
)
