import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import confirmImg from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState([]);

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProducts = productKeys.map(exitkey => {
            const product = fakeData.find(pd => pd.key === exitkey);
            product.quantity = saveCart[exitkey];
            return product;
        });
        setCart(cartProducts);
    }, []);

    const placeOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    let thankYouImg;
    if(orderPlaced === true) {
        thankYouImg = <img src={confirmImg} alt="Thank you for purchase"/>
    }

    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} item={pd}></ReviewItem>)
                }

                { thankYouImg }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={placeOrder} className='add-cart'>Place order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;