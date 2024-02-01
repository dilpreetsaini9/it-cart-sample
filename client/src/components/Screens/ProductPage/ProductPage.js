import React, { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { Data } from '../../../App';




const ProductPage = () => {
  let { cartProducts, setCartProducts } = useContext(Data);
  let [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const BASE_URL_PHOTOS = process.env.REACT_APP_PHOTOS_URL;


  const notifyError = () => toast.error('ALREADY IN CART');

  useEffect(() => {
    async function fetchTrending() {
      setLoading(true);

      try {
        const response = await fetch(BASE_URL + '/product/' + productId);

        const data = await response.json();
        

        if (data) {
          setItem(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching trending products');
        setLoading(false);
      }
    }

    fetchTrending();
    // eslint-disable-next-line
  }, []);

  function AddToCart() {
    let checkingForDub = cartProducts.find((p) => p.name === item.productName);

    if (!checkingForDub) {
      let newProduct = {
        name: item.productName,
        price: item.price,
        img: item.image,
        _id: item._id,
      };

      let products = [...cartProducts, newProduct];

      const handleChangeCart = (products) => {
        setCartProducts(products);
        localStorage.setItem('CART', JSON.stringify(products));
      };

      handleChangeCart(products);


    } else {
      notifyError();
    }
  }

  return (
    <div className='pt-20 text-white'>
      {loading && (
        <div className='w-full flex justify-center items-center h-80'>
          <div className='loader'></div>
        </div>
      )}

      {!loading && (
        <div className='flex flex-col sm:flex-row sm:items-center items-center justify-center sm:justify-center gap-10 border-t-2 border-t-slate-800 '>
          <div className='inner-main  w-52  grid place-items-center rounded-sm'>
            <img src={`${BASE_URL_PHOTOS}${item.image}`} alt={item._id} loading='lazy' />
          </div>
          <div className='inner-text max-w-80 my-3 flex flex-col sm:justify-center  overflow-hidden w-96'>
            <h2 className='text-2xl my-2 font-semibold text-center'>{item.productName}</h2>
            <h2 className='text-2xl my-2 text-slate-300 font-base text-center'>₹ {item.price} /-</h2>
            <div className='flex gap-2 justify-center'>
              {!cartProducts.find((p) => p.name === item.productName) ? (

                <button className='border-2 w-96 disabled border-blue-700 rounded-sm text-blue-800 px-5 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-900  ' onClick={AddToCart}><i className="ri-shopping-cart-line"></i> ADD TO CART </button>
              ) : (
                <div className='flex flex-col gap-5 '>


                  <button className=' disabled  rounded-sm text-blue-800 px-5 py-2 ' disabled>ADDED IN CART</button>
                  <Link to="/"><button className='border-2  border-blue-700 rounded-sm text-slate-100 px-5 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-900' >BROWSE MORE PRODUCTS<i className="ri-arrow-right-s-line"></i></button></Link>
                </div>

              )}
            </div>
          </div>
        </div>
      )}

      {item && (
        <div className='description-box text-center m-auto max-w-3xl mt-5 '>
          <h2 className=' text-2xl my-2 font-bold text-blue-400 border-b-2 border-b-slate-800 py-2 '>Description</h2>
          <h3 className=' text-lg my-2 p-2 italic text-slate-400'>{item.description}</h3>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
