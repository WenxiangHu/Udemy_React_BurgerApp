import React, { } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux'

function Checkout(props) {
    // state = {
    // ingredients: {
    //     salad: 1,
    //     meat: 1,
    //     cheese: 1,
    //     bacon: 1
    // },
    // // ingredients: null,
    // totalPrice: 0
    // }
    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     // console.log(query.entries())
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         //['salad, '1']
    //         console.log(param)
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1]; // +param[1] change to number, since it is a string
    //         }

    //     }
    //     console.log(ingredients)
    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice: price
    //     })
    // }
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    // render() {
    let summary = <Redirect to='/' />
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCanclled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinueHandler} />
                <Route
                    path={props.match.url + '/contact-data'}
                    component={ContactData} />
            </div>
        )
    }
    console.log(props.ings)
    // return (
    //     <div>
    //         {summary}

    //         {/* //No need after redux
    //         // render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} */}
    //     </div>
    // )
    return summary
}
// }
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
        // price: state.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout)