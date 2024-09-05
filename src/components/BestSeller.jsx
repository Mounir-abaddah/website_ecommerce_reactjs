import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProdutsItem from './ProdutsItem';

const BestSeller = () => {
    const {products}=useContext(ShopContext);
    const [bestSeller,setbestSeller]=useState([])
    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller))
        setbestSeller(bestProduct.slice(0,5))
    },[])
return (
    <div className='my-10'>
    <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem molestiae fugiat recusandae, dolorem assumenda suscipit earum hic accusantium deserunt eius beatae ipsam maiores eos sunt repellat aperiam magnam quasi dicta.
        </p>
    </div>
    <div className="grid  gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
    {
        bestSeller.map((item,index)=>(
            <ProdutsItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
        ))
    }
    </div>
    </div>
)
}

export default BestSeller
