import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux'

class Checkout extends Component {
    state = {
        // ingredients: {
        //     salad: 1,
        //     meat: 1,
        //     cheese: 1,
        //     bacon: 1
        // },
        // // ingredients: null,
        // totalPrice: 0
    }
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

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        console.log(this.props.ings)
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCanclled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinueHandler} />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    component={ContactData}
                //No need after redux
                // render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
                />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        // price: state.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout)