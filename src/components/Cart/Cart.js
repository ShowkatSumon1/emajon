import React from 'react';

const Cart = (props) => {
    console.log(props);
    const cart = props.cart;

    ///// system 1
    const total = cart.reduce((total, pd) => total + pd.price * pd.quantity, 0);

    ///// system 2:
    // let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const pd = cart[i];
    //     total = total + pd.price * product.quantity;
    // }

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
            <br/>
            {props.children}
        </div>
    );
};

export default Cart;