import React, { useContext } from 'react'
import { Data } from '../../../App';





const ShopingCart = ({ img, heading, price, id }) => {


    const BASE_URL = process.env.REACT_APP_PHOTOS_URL;

    let { cartProducts, setCartProducts } = useContext(Data)




    const handleChangeCart = () => {
    
        const filteredProducts = cartProducts.filter(product => product._id !== id);
        setCartProducts(filteredProducts);

        localStorage.setItem('CART', JSON.stringify(filteredProducts));
        
    };



    return (

        <div className='w-full   border-slate-800 border-2 flex my-10 flex-col  justify-center gap-3 sm:flex-row p-2 rounded-sm text-slate-300'>

            <div className='cart-first flex-1  flex   justify-between sm:justify-start  items-center gap-10 px-2'>
                <img src={`${BASE_URL}${img}`} className='  w-12 ' alt={"image" + heading}></img>
                <p className='  text-base  font-base'>{heading}</p>
            </div>

            <div className='cart-second flex-1  flex justify-around items-center'>
                <p className=' text-base  font-base'>₹ {price}/-</p>
                <button type="button" className=" font-normal bg-red-900 hover:bg-red-700 active:bg-red-600 active:text-white p-2 rounded-sm text-sm" onClick={handleChangeCart}>REMOVE ITEM</button>
            </div>

        </div>
    )
}

export default ShopingCart