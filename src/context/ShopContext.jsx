import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10; 
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate()

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems); 

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; 
            } else {
                cartData[itemId][size] = 1; 
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1; 
        }

        setCartItems(cartData);
    };

    const getCartCount = () => {
        let totalCount = 0;

        for (const itemId in cartItems) {
            const sizes = cartItems[itemId];
            for (const size in sizes) {
                if (sizes[size] > 0) {
                    totalCount += sizes[size]; // Add the quantity of each size
                }
            }
        }

        return totalCount;
    };

const updateQuantity = async (itemId,size,quantity)=>{
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity
    setCartItems(cartData)
} 
const getCartAmount  =  ()=>{
    let totalAmount = 0;
    for(const items in cartItems){
        let itemInfo = products.find((product)=>product._id === items);
        for(const item in cartItems[items]){
            try{
                if(cartItems[items][item]>0){
                    totalAmount += itemInfo.price * cartItems[items][item]
                }
            }catch(error){

            }
        }
    }
    return totalAmount
}

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const value = {
        products,
        currency,
        delivery_fee, // Fixed typo
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

// Define prop types
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
