import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';

import FilterListIcon from '@mui/icons-material/FilterList';

import ProductDrawer from "../ProductDrawer/index";

import { useAuth } from '../../context/AuthContext';

import './style.css';

const ProductGridCard = ({ products }) => {
    const navigate = useNavigate();
    const { userId } = useAuth();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartId, setCartId] = useState(null);

    const handleDetails = (productId, product) => {
        navigate(`/products-details/${productId}`, { state: { product } });
    }

    const handleOpenDrawer = async (product) => {
      
        try{
            const response = await fetch('http://localhost:8000/api/add-to-cart', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  productId: product._id,
                  quantity: 1,
                  shippingPrice: 50,
                  CoupanCode: 'DISCOUNT10',
                  id: userId || '',
                }),
              });
          
              const data = await response.json();
          console.log(data);
              if (data.success) {
                setSelectedProduct(product);
                setDrawerOpen(true);
                setCartId(data.cart._id);
                console.log('Product added to cart successfully');
            } else {
                console.error('Failed to add product to cart:', data.message);
            }

        } catch(error){
            console.error(error);
        }
    };
console.log('cartId', cartId);
    return (
        <>
            <div className="container-product-grid">
                <div className="header-product-grid">
                    <button className="filter-button-card-grid"><FilterListIcon /> Show Filter</button>
                    <span className="product-count-product-number">{products.length} Products</span>
                </div>
                {products.length > 0 ? (
                    <div className="product-grid-card-container">
                        {products.map((product, index) => (
                            <div className="product-card-content-card" key={index} >
                                <img src={product.images.mainImage || "http://res.cloudinary.com/dtivafy25/image/upload/v1724736713/image/f-1_fskvqz.png"}
                                    alt="Strawberry Fruit Kotti" className="product-image-card-grid"
                                    onClick={() => handleDetails(product._id, product)}
                                />
                                <div className="product-info">
                                    <h2 className="product-name">{product.name || "N/A"}</h2>
                                    <div className="product-price-cart">
                                        <span className="product-price">₹{product.price || "N/A"}</span>
                                        <button className="add-to-cart-card" onClick={() => handleOpenDrawer(product)}>ADD TO CART</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-products-message">
                        No products available at the moment.
                    </div>
                )}
            </div>
            {selectedProduct && (
                <ProductDrawer 
                    drawerOpen={drawerOpen} 
                    setDrawerOpen={setDrawerOpen} 
                    product={selectedProduct} 
                    cartId={cartId}
                />
            )}
        </>
    )
};
export default ProductGridCard;


