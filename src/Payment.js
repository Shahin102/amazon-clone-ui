import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider'
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import { useState } from 'react';
import FlipMove from 'react-flip-move'
import { forwardRef } from 'react'

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const handleSubmit = e => {
        // do all the fancy stripe stuff...
    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display andy errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const AnimatedCheckOut = forwardRef(({ item, index }, ref) => (
        <div ref={ref}>
            <CheckoutProduct className="pay__item"
                key={`anim ${index} ${item.id}`}
                title={item.title}
                id={item.id}
                rating={item.rating}
                price={item.price}
                image={item.image}
            />
        </div>
    ));

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
                </h1>

                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 REact Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        <FlipMove
                            staggerDelayBy={150}
                            enterAnimation="accordionVertical"
                            leaveAnimation="accordionVertical"
                        >
                            {basket.map((item, i) => (
                                <AnimatedCheckOut
                                    key={`an ${i} ${item.id}`}
                                    item={item}
                                    index={i}
                                />
                            ))}
                        </FlipMove>
                    </div>
                </div>

                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* Stripe magic will go */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span className='buy__button'>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>

                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Payment
