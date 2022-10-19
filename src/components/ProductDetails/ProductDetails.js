import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Products from '../Products/Products';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <h2>Your product details: </h2>
            <Products addToCartButton={false} product={product}></Products>
        </div>
    );
};

export default ProductDetails;