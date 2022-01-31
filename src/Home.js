import React, { useEffect, useState } from 'react'
import './Home.css'
import Product from './Product'

function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        // console.log(items);
    }

    // console.log(items);

    return (
        <div className='home'>
            <div className='home__container'>
                <img
                    className='home__image'
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt=''
                />

                <div className='home__row'>
                    {items.slice(0, 2).map(({ id, title, price, image }) => (
                        <Product
                            id={id}
                            title={title}
                            price={price}
                            image={image}
                        />
                    ))}
                </div>

                <div className='home__row'>
                    {items.slice(3, 6).map(({ id, title, price, image }) => (
                        <Product
                            id={id}
                            title={title}
                            price={price}
                            image={image}
                        />
                    ))}
                </div>

                <div className='home__row'>
                    {items.slice(7, 8).map(({ id, title, price, image }) => (
                        <Product
                            id={id}
                            title={title}
                            price={price}
                            image={image}
                        />
                    ))}
                </div>

            </div>

        </div >
    )
}

export default Home
