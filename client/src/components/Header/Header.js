import React, { useContext , useState } from 'react'
import { Link } from 'react-router-dom'
import { Data } from '../../App'

const Header = () => {


    let { cartProducts ,  setUserMain , userMain } = useContext(Data)
    
    const handleLogout = () => {
        setUserMain(undefined)
        localStorage.removeItem('token')
        localStorage.removeItem('name')
      };
      
      
 

    return (
        <header className=' bg-slate-950 w-full flex  justify-around items-center min-h-16 fixed m-0 z-30'>
            <Link to="/"><div className='main-logo  text-white font-extrabold text-2xl'>
                <h3>I-MART</h3>
            </div>
            </Link>
            <div className='header-navigation  gap-4 flex'>
                <Link to="/mycart">
                    <button type="button" className="button-nav relative" >
                        Cart
                        <span className="inline-flex items-center justify-center w-4 h-4 ms-2  text-xs font-semibold text-blue-800 bg-blue-200 rounded-full absolute -top-1  -right-1">
                            {cartProducts.length}
                        </span>
                    </button></Link>
                   
  <Link to="/profile">
    <button type="button" className="button-nav">
      ACCOUNT
    </button>
  </Link>


            </div>
            <div className='header-navigation  gap-4 hidden'>
                <i className="ri-menu-line font-bold text-slate-100 text-2xl"></i>
            </div>
        </header>
    )
}

export default Header