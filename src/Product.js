import React, { useState } from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, image }) {
    const [{ basket }, dispatch] = useStateValue();
    // console.log('this is the basket >>>')

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );


    const addToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                price: price,
                rating: rating,
                image: image,
            },
        });
    };

    return (
        <div className='product'>
            <div className='product__info'>
                <p>{title}</p>
                <p className='product__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='product__rating'>
                    {Array(rating).fill().map((_, i) => (
                        <p>⭐</p>
                    ))}
                </div>
            </div>
            <img src={image} alt='' />
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
