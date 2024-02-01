
import './App.css';
import Header from './components/Header/Header';
import Mainpage from './components/Screens/Main/Mainpage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from './components/Screens/Cart/Cart';
import ProductPage from './components/Screens/ProductPage/ProductPage';
import { createContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Login from './components/Screens/Login/Login';
import Signup from './components/Screens/Signup/Signup';
import Checkout from './components/Screens/Checkout/Checkout';
import Review from './components/Screens/Review/Review';
import Profile from './components/Screens/Profile/Profile';





export let Data = createContext([])


function App() {
  
  
  
    function new1(){
      let data = localStorage.getItem('CART')
      
      
      let data1 = JSON.parse(data)
      if ( data1 ) {
        return data1
      } else {
        return []
      }
      
    } 
    new1()
    

  const [cartProducts, setCartProducts] = useState(new1());
  const [userMain, setUserMain] = useState(localStorage.getItem('token') || null); 
  const [address, setAddress] = useState({
    add1: "",
    add2: "",
    landmark: "",
    city: "",
    phoneno: "",
    pincode:"",
  });
    
    
  return (

    <>

      <Data.Provider value={{ cartProducts, setCartProducts, userMain, setUserMain , address , setAddress}}>
        <BrowserRouter>
          <Header />
          <div className='main  '>
            <Toaster />
            <Routes>
              <Route path="/" element={<Mainpage />} />
              <Route path='/mycart' element={<Cart />}></Route>
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/review" element={<Review />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Data.Provider>

    </>

  );
}


export default App;
