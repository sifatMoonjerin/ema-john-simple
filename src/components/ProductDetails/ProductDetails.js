import React from 'react';
import fakeData from '../../fakeData';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    const{ productKey } = useParams();
    const product = fakeData.find(pd => pd.key === productKey)
    //console.log(product)
    return (
        <div>
            <h1>Product Detail</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;