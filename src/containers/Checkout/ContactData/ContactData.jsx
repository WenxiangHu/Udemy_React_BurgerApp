import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log("Order Handler click")
        this.setState({
            loading: true
        })
        const order = { //dummy order data
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Winson Hu',
                address: {
                    street: '665 Test Dr.',
                    zipCode: '41351',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order) //firebase endpoint .json
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (
            <form>
                <input className='Input' type="text" name="name" placeholder="Your name" />
                <input className='Input' type="email" name="email" placeholder="Your email" />
                <input className='Input' type="text" name="street" placeholder="Street" />
                <input className='Input' type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}> ORDER </Button>
            </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className='ContactData'>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData