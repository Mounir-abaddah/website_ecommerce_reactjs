import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivry_fee = 10;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false)
    const value = {
        products,
        currency,
        delivry_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

// Define prop types
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
