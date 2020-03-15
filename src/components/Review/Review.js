import React,{ useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import thumbsUp from '../../images/giphy.gif';



const Review = () => {
    const [cart,setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)

    const handlePlaceOrder = () => {
        setCart([])
        setOrderPlaced(true)
        processOrder()
    }

    const removeProduct = productKey => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key]
            return product
        })

        setCart(cartProducts) 

    }, [])

    const thanks = orderPlaced? <img src={thumbsUp} alt=""/>: null

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key} 
                        product={pd}
                        removeProduct = {removeProduct}
                    ></ReviewItem>)
                }
                { thanks }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-btn">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;