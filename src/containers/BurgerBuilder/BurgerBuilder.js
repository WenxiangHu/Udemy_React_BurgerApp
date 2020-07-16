import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/auxComponent';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import * as actionType from '../../store/actions/actionsType'
import * as actions from '../../store/actions/index';

export const BurgerBuilder = (props) => {
    // state = {
    //     // ingredients: {
    //     //     salad: 0,
    //     //     bacon: 0,
    //     //     cheese: 0,
    //     //     meat: 0
    //     // },
    //     // ingredients: null,
    //     // totalPrice: 4,//default price
    //     // purchaseable: false,
    //     purchasing: false, //control orderSummary display
    //     loading: false,
    //     error: false
    // }

    const [purchasing, setPurchasing] = useState(false)
    const [loading] = useState(false)
    // const [error, setError] = useState(false)

    // componentDidMount() {
    // console.log(props);
    // axios.get('https://udemy-burger-app-c9f28.firebaseio.com/ingredients.json')
    //     .then(response => {
    //         setState({
    //             ingredients: response.data
    //         })
    //     })
    //     .catch(error => {
    //         setState({
    //             error: true
    //         })
    //     })
    //     props.onInitIngredients();
    // }

    const { onInitIngredients } = props
    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    const purchaseHandler = () => { // 如果用到this 需要用 arrow  function 
        if (props.isAuthenticated) {
            // setState({
            //     purchasing: true
            // });
            setPurchasing(true)
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        // setState({
        //     purchasing: false
        // });
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        // alert('continue')
        //  //No Need after add Redux ************ New way =>  go to checkout page ********************
        // const queryParams = [];
        // for (let i in state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(state.ingredients[i]))
        // }
        // console.log(queryParams)
        // queryParams.push('price=' + state.totalPrice)
        // const queryString = queryParams.join('&');
        // console.log(queryString)
        props.onInitPurchase();
        props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString,
        })
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    //No Need as we create redux
    // addIngredientHandler = (type) => {
    //     const oldCount = state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddiction = INGREDIENT_PRICES[type];
    //     const oldPrice = state.totalPrice;
    //     const newPrice = oldPrice + priceAddiction;
    //     setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })
    //     updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })
    //     updatePurchaseState(updatedIngredients);
    // }

    // render() {
    // console.log(state.totalPrice)
    const disableInfo = {
        ...props.ings
    }
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0
    }
    // console.log(props.ings)
    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disableInfo}
                    price={props.price}
                    purchaseable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    iaAuth={props.isAuthenticated} />
            </Aux>);
        orderSummary = <OrderSummary
            price={props.price}
            ingredients={props.ings}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />
    }

    if (loading) {
        orderSummary = <Spinner />
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
}
// }
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
// export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);