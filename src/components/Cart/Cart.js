import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, pd) => total + pd.price, 0);

    let shipping = 0;
    if(total > 150){
        shipping = 0;
    }
    else if(total > 0){
        shipping = 12.75;
    }
    else if(total > 85) {
        shipping = 4.75;
    }

    let tax = total / 10;

    const fixed = (fixed) => fixed.toFixed(2);

    const grandTotal = total + shipping + tax;
    return (
        <div>
            <h3>Order Summary</h3>
            <h5>Items ordered: {cart.length}</h5>
            <p>Total price: {fixed(total)}</p>
            <p>Shipping Price: {fixed(shipping)}</p>
            <p>Tax: {fixed(tax)}</p>
            <p>Grand total: {fixed(grandTotal)}</p>
        </div>
    );
};

export default Cart;