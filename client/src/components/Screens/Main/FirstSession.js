import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProduct } from '../../../hooks/fetch';
import Card1 from '../../Cards/Card1/Card1';

const FirstSession = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchProducts() {
    setLoading(true);
    fetchAllProduct()
      .then((data) => {
        if (data) {
          setProducts(data);
        } else {
          console.error("No data received from fetchAllProduct");
        }
      })
      .catch((error) => {
        console.error("Error in fetchProducts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  function zeroToTwo() {
    setLoading(true);
    fetchAllProduct()
      .then((data) => {
        if (data) {
          const filteredProducts = data.filter((product) => product.price <= 2000);
          setProducts(filteredProducts);
        } else {
          console.error("No data received from fetchAllProduct");
        }
      })
      .catch((error) => {
        console.error("Error in fetchProducts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function twoToFive() {
    setLoading(true);
    fetchAllProduct()
      .then((data) => {
        if (data) {
          const filteredProducts = data.filter((product) => product.price >= 2000 && product.price <= 5000);
          setProducts(filteredProducts);
        } else {
          console.error("No data received from fetchAllProduct");
        }
      })
      .catch((error) => {
        console.error("Error in fetchProducts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function aboveFive() {
    setLoading(true);
    fetchAllProduct()
      .then((data) => {
        if (data) {
          const filteredProducts = data.filter((product) => product.price > 5000);
          setProducts(filteredProducts);
        } else {
          console.error("No data received from fetchAllProduct");
        }
      })
      .catch((error) => {
        console.error("Error in fetchProducts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function lowToHigh() {
    const sortedProductsAsc = products.slice().sort((a, b) => a.price - b.price);
    setProducts(sortedProductsAsc);
  }

  function highToLow() {
    const sortedProductsDesc = products.slice().sort((a, b) => b.price - a.price);
    setProducts(sortedProductsDesc);
  }

  return (
    <div className='pt-20 w-full '>
      <h3 className='text-white text-xl font-bold text-center py-2 border-b-slate-800 border-b-2 '> OUR LATEST PRODUCTS</h3>

      {loading && (
        <div className='w-full flex justify-center items-center h-80'>
          <div className='loader'></div>
        </div>
      )}

      {!loading && (
        <>
          <div className='filters w-full flex gap-4 m-auto my-3 flex-wrap  justify-center p-1'>
            <button type='button' className='border-2 border-slate-700  w-40 rounded-sm text-slate-100 px-5 py-2 hover:bg-blue-500 hover:text:white active:bg-blue-900 ' onClick={fetchProducts}>
              All Products
            </button>
            <button type='button' className='border-2 border-slate-700 w-40 rounded-sm text-slate-100 px-5 py-2 hover:bg-blue-500 hover:text:white active:bg-blue-900' onClick={lowToHigh}>
              Low To High
            </button>
            <button type='button' className='border-2 border-slate-700 w-40 rounded-sm text-slate-100 px-5 py-2 hover:bg-blue-500 hover:text:white active:bg-blue-900' onClick={highToLow}>
              High To Low
            </button>
            <button type='button' className='border-2 border-slate-700 w-40 rounded-sm text-slate-100 px-5 py-2 hover:bg-blue-500 hover:text:white active:bg-blue-900' onClick={zeroToTwo}>
              0 - 2000
            </button>
            <button type='button' className='border-2 border-slate-700 w-40 rounded-sm text-slate-100 px-5 py-2 hover:bg-blue-500 hover:text:white active:bg-blue-900' onClick={twoToFive}>
              2000 - 5000
            </button>
            <button type='button' className='border-2 border-slate-700 w-40 rounded-sm text-slate-100 px-5 py-2 hover:bg-blue-500 hover:text:white active:bg-blue-900' onClick={aboveFive}>
              Above 5000
            </button>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-3 w-full place-items-center py-3 '>
            {products &&
              products.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <Card1 name={product.productName} price={product.price} image={product.image} />
                </Link>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FirstSession;
