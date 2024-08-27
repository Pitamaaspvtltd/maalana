// import React, { useEffect, useState } from 'react';
// import Pagination from '@mui/material/Pagination';

// import CartItem from '../../components/CartItem/CartItem.jsx';
// import OrderSummary from '../../components/OrderSummary/index.jsx';
// import CouponSection from '../../components/CouponSection/index.jsx';
// import AddressSection from '../../components/AddressSection1/index.jsx';

// // import Cart1 from '../../assets/product-cate/img-1.png';

// import { useAuth } from '../../context/AuthContext.js';

// import './Cart.scss';

// // const cartItems = [
// //     { id: 1, img: Cart1, name: 'Orange Fruit Katli', weight: 250, price: 150 },
// //     { id: 2, img: Cart1, name: 'Orange Fruit Katli', weight: 250, price: 150 },
// //     { id: 3, img: Cart1, name: 'Orange Fruit Katli', weight: 250, price: 150 },
// // ];

// // const orderSummary = {
// //     subTotal: 398,
// //     discount: 302,
// //     tax: 0,
// //     shipping: 'FREE',
// //     total: 398,
// //     deliveryDate: 'DD/MM/YY',
// // };

// // const addresses = [
// //     { id: 1, details: '7297, STREET NO 6, 22FT ROAD, DURGA PURI, HADDONKALAN, NEAR BEAM FASHION POINT, LUDHIANA, PUNJAB, 141001', phone: '9501987577' },
// //     { id: 2, details: '7297, STREET NO 6, 22FT ROAD, DURGA PURI, HADDONKALAN, NEAR BEAM FASHION POINT, LUDHIANA, PUNJAB, 141001', phone: '9501987577sss' },
// // ];

// const Cart = () => {
//     const [page, setPage] = useState(1);
//     const itemsPerPage = 4; // Number of items per page
//     const { userId,  updateAddresses,addresses } = useAuth();

//     const [cartItems, setCartItems] = useState([]);
//     // const [addresses, setAddresses] = useState([]);
//     const [orderSummary, setOrderSummary] = useState({
//         subTotal: 0,
//         discount: 0,
//         tax: 0,
//         shipping: 'FREE',
//         total: 0,
//         deliveryDate: 'DD/MM/YY',
//     });

//     useEffect(() => {
//         const fetchCartData = async () => {
//             try {
//                 const response = await fetch(`https://maalana-backend.onrender.com/api/get-all-cart-by-user/${userId}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const data = await response.json();
//                 // console.log('Response data:', data);

//                 // Extract items from all carts
//                 const items = data.cart.reduce((acc, cart) => acc.concat(cart.items), []);
//                 setCartItems(items);
//             } catch (error) {
//                 console.error('Error fetching cart data:', error);
//                 setCartItems([]);
//             }
//         };

//         fetchCartData();
//     }, [userId]);

//     useEffect(() => {
//         const fetchCartData = async () => {
//             try {
//                 const response = await fetch(`https://maalana-backend.onrender.com/api/get-all-cart-by-user/${userId}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const data = await response.json();
//                 const items = data.cart.reduce((acc, cart) => acc.concat(cart.items), []);
//                 setCartItems(items);

//                 // Calculate order summary
//                 const subTotal = items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
//                 const total = subTotal; // Adjust as needed for discounts, taxes, etc.

//                 setOrderSummary({
//                     subTotal,
//                     discount: 0, // Replace with actual discount if available
//                     tax: 0, // Replace with actual tax if applicable
//                     shipping: 'FREE',
//                     total,
//                     deliveryDate: 'DD/MM/YY',
//                 });

//             } catch (error) {
//                 console.error('Error fetching cart data:', error);
//                 setCartItems([]);
//             }
//         };

//         fetchCartData();
//     }, [userId]);

//     useEffect(() => {
//         const fetchAddresses = async () => {
//             try {
//                 const response = await fetch(`https://maalana-backend.onrender.com/api/get-my-shiped-address/${userId}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const data = await response.json();
//                 if (data.success) {
//                     // setAddresses(data.shipedaddress);
//                     updateAddresses(data.shipedaddress);
//                 } else {
//                     console.error('Failed to fetch addresses');
//                 }
//             } catch (error) {
//                 console.error('Error fetching addresses:', error);
//             }
//         };

//         fetchAddresses();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const handleAddressUpdate = async () => {
//         try {
//             const response = await fetch(`https://maalana-backend.onrender.com/api/get-my-shiped-address/${userId}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             const data = await response.json();
//             if (data.success) {
//                 updateAddresses(data.shipedaddress);
//             } else {
//                 console.error('Failed to fetch addresses');
//             }
//         } catch (error) {
//             console.error('Error fetching addresses:', error);
//         }
//     };


//     const handlePageChange = (event, value) => {
//         setPage(value);
//     };

//     const paginatedItems = Array.isArray(cartItems) 
//     ? cartItems.slice((page - 1) * itemsPerPage, page * itemsPerPage)
//     : [];



//     return (
//         <div classNameName="cart-container">
//             <div classNameName="cart-items">
//                 <h1>Cart</h1>
//                 <div classNameName="steps">
//                     <span>1. Cart</span>
//                     <span>2. Checkout</span>
//                     <span>3. Payment</span>
//                 </div>
//                 {cartItems.length === 0 ? (
//                     <p>Your cart is empty.</p>
//                 ) : (
//                     <>
//                         {paginatedItems.map(item => (
//                             <CartItem key={item.id} item={item} />
//                         ))}
//                         <Pagination
//                             count={Math.ceil(cartItems.length / itemsPerPage)}
//                             page={page}
//                             onChange={handlePageChange}
//                             variant="outlined"
//                             color="primary"
//                         />
//                     </>
//                 )}
//             </div>
//             <div classNameName="summary-and-coupon">
//                 {Object.keys(orderSummary).length === 0 ? (
//                     <p>Order summary is not available.</p>
//                 ) : (
//                     <OrderSummary summary={orderSummary} />
//                 )}
//                 <CouponSection />
//                 {addresses.length === 0 ? (
//                     <p>
//                         No addresses available. go to profile and click on "MY Address"
//                     </p>
//                 ) : (
//                     <AddressSection addresses={addresses} onAddressUpdate={handleAddressUpdate} />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Cart;


import React from 'react';
import './Cart.css'; // Import your CSS file here

const Cart = () => {
    return (
        <>
            <div style={{ padding: '20px' }}>
                <div className="cart-container">
                    <div className="cart-header">
                        <h1>Your Shopping Cart</h1>
                    </div>
                    <div className="cart-steps">
                        <span className="cart-step">1. Review Cart</span>
                        <span className="cart-step">2. Shipping Details</span>
                        <span className="cart-step">3. Payment</span>
                    </div>
                    <div className="cart-content">
                        <div className="cart-items">
                            <div className="cart-item">
                                <img src="https://res.cloudinary.com/dtivafy25/image/upload/v1723530547/image/img-2_nj1zsm.png" alt="Orange Fruit Keto" />
                                <div className="item-details">
                                    <h3>Orange Fruit Keto - 250g</h3>
                                    <p>₹150</p>
                                    <div className="item-quantity">
                                        <button aria-label="Decrease quantity">-</button>
                                        <input type="number" value="1" min="1" aria-label="Quantity" />
                                        <button aria-label="Increase quantity">+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="cart-item">
                                <img src="https://res.cloudinary.com/dtivafy25/image/upload/v1723530547/image/img-2_nj1zsm.png" alt="Orange Fruit Keto" />
                                <div className="item-details">
                                    <h3>Orange Fruit Keto - 250g</h3>
                                    <p>₹150</p>
                                    <div className="item-quantity">
                                        <button aria-label="Decrease quantity">-</button>
                                        <input type="number" value="1" min="1" aria-label="Quantity" />
                                        <button aria-label="Increase quantity">+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="cart-item">
                                <img src="https://res.cloudinary.com/dtivafy25/image/upload/v1723530547/image/img-2_nj1zsm.png" alt="Orange Fruit Keto" />
                                <div className="item-details">
                                    <h3>Orange Fruit Keto - 250g</h3>
                                    <p>₹150</p>
                                    <div className="item-quantity">
                                        <button aria-label="Decrease quantity">-</button>
                                        <input type="number" value="1" min="1" aria-label="Quantity" />
                                        <button aria-label="Increase quantity">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cart-summary">
                            <h2>Order Summary</h2>
                            <div className="summary-item">
                                <span>Subtotal</span>
                                <span>₹398.00</span>
                            </div>
                            <div className="summary-item">
                                <span>Discount</span>
                                <span>-₹232.00</span>
                            </div>
                            <div className="summary-item">
                                <span>Tax</span>
                                <span>₹0.00</span>
                            </div>
                            <div className="summary-item">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>
                            <div className="summary-item summary-total">
                                <span>Total</span>
                                <span>₹398.00</span>
                            </div>
                            <a href="shopping-cart" className="checkout-button">Proceed to Checkout</a>
                            <div className="coupon-input">
                                <input type="text" placeholder="Enter coupon code" aria-label="Coupon code" />
                                <button>Apply</button>
                            </div>
                            <div className="shipping-address">
                                <h3>Shipping Addresses</h3>
                                <div className="address-box">
                                    <input type="radio" id="address1" name="shipping_address" value="address1" checked />
                                    <div className="address-content">
                                        <label for="address1">
                                            <div className="address-details">
                                                <p>John Doe</p>
                                                <p>123 Main St, Apartment 4B</p>
                                                <p>Cityville, State 12345, Country</p>
                                            </div>
                                        </label>
                                        <div className="address-actions">
                                            <button className="btn" aria-label="Edit address">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="btn-icon">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </button>
                                            <button className="btn" aria-label="Delete address">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="btn-icon">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="address-box">
                                    <input type="radio" id="address2" name="shipping_address" value="address2" />
                                    <div className="address-content">
                                        <label for="address2">
                                            <div className="address-details">
                                                <p>John Doe</p>
                                                <p>456 Elm St, Suite 7C</p>
                                                <p>Townsburg, State 67890, Country</p>
                                            </div>
                                        </label>
                                        <div className="address-actions">
                                            <button className="btn" aria-label="Edit address">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="btn-icon">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </button>
                                            <button className="btn" aria-label="Delete address">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="btn-icon">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
