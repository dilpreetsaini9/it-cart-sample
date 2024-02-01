import React, { useContext } from 'react'
import ShopingCart from '../../Cards/Shopingcart/ShopingCart'
import { Data } from '../../../App'
import { Link, useNavigate } from 'react-router-dom'




const Cart = () => {

  let navigation = useNavigate()

  function Checkout() {
    
    let hasToken = localStorage.getItem('token')
    
    if ( hasToken ) { 
      navigation("/checkout") 
    } else {
      navigation("/login") 
    }
    
  }


  let { cartProducts } = useContext(Data)


  const total = cartProducts.reduce((total, product) => total + product.price, 0);
  return (
    <div className='pt-20 pb-10'>

      <h3 className='text-white text-xl font-bold text-center py-2  border-b-slate-800 border-b-2 '>SHOPPING CART <i className="ri-shopping-cart-line"></i></h3>
      {/* <h3 className='text-white text-lg font-base text-center  py-2  bg-slate-900 italic'>Free delivery above 1000 /-</h3> */}

      {cartProducts.length >= 1 ? (

        <div className='cart  p-1 w-3/4  m-auto mt-3'>
          <div className='cart-listing   w-full p-1'>

            {cartProducts.map((product) => (
              <ShopingCart img={product.img} heading={product.name} price={product.price} id={product._id} key={product._id} />
            ))}
          </div>


          <div className='grand-total border-slate-800  border-2  h-32  w-full p-3 flex items-end justify-end'>
            <div className=' w-72 h-auto flex flex-col items-center  justify-end gap-4 py-3'>
              <h2 className=' text-2xl font-semibold text-white'> <span className=' text-xl  font-normal  '> TOTAL -  </span>  ₹ {total} </h2>

              <button className='bg-blue-600 py-2 px-6 text-white' onClick={Checkout}>Processed To Checkout</button>

            </div>
          </div>
        </div>
      ) :

        (
          <div className=' w-64 text-center m-auto'>
            <p className='text-blue-300 text-3xl font-bold  text-center  py-2   my-3'><i className="ri-shopping-cart-line text-3xl"></i></p>
            <p className='text-blue-300 text-xl font-base text-center  py-2   my-3'> NO ITEMS IN CART</p>

            <Link to="/"> <p className='text-slate-800 text-lg font-bold  text-center bg-green-400  py-2   my-1'>GO HOME </p></Link>
          </div>
        )
      }


    </div>
  )
}

export default Cart