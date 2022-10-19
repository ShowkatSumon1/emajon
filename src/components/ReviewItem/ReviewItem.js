import React from 'react';

const ReviewItem = (props) => {
    const {name, img, quantity, key, price} = props.item;
    return (
        <div style={{margin: '10px', padding: '5px 100px', border: '1px solid lightgrey'}}>
            <img src={img} alt="" />
            <h2 className='product-name'>{name}</h2>
            <p>Quantity: {quantity}</p>
            <p><small>Price: {price}</small></p>
            <br></br>
            <button onClick={() => props.removeProduct(key)} className='add-cart'>Remove item</button>
        </div>
    );
};

export default ReviewItem;