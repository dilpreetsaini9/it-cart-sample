import React, { useContext, useEffect } from 'react'
import { Data } from '../../../App'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'




const Checkout = () => {

  let { cartProducts , address, setAddress } = useContext(Data)
  let navigation = useNavigate()
  
  const notifyError = (body) => toast.error(body);
  
  useEffect(()=>{
    if ( cartProducts.length <= 0) {
      navigation("/mycart")
    }
    let token = localStorage.getItem('token')
    
    if ( !token ) {
      navigation("/login")
    }
  })

  
  function handlechange(e) {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
}

  function handleSubmit(e){
  e.preventDefault()
    
        if ( address.add1 && address.add2 && address.city && address.landmark && address.phoneno && address.pincode ) {
              
              let token = localStorage.getItem('token')
                  
                if ( token ) {
                  navigation("/review")
                } else {
                  navigation("/login")
                }
          
          
        } else {
          notifyError("fill details")
        }
  }

  return (
    <div className='pt-20 '>
      <h3 className='text-white text-xl font-bold text-center py-2  bg-blue-800'>CHECKOUT</h3>
    <div className=' flex flex-col w-full sm:flex-row gap-2 p-1'>
    
      <div className="overflow-x-auto text-center w-full">
        <table className="w-full m-auto bg-slate-800 border-2 border-slate-700 text-blue-500 italic">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b font-bold">Sr No</th>
              <th className="py-2 px-4 border-b font-bold">Name</th>
              <th className="py-2 px-4 border-b font-bold">Price</th>
            </tr>
          </thead>
          <tbody className='text-white '>
            {
              cartProducts && cartProducts.map((product, index) => (
                <tr key={product.name}>
                  <td className="py-2 px-4 ">{index + 1}</td>
                  <td className="py-2 px-4  ">{product.name}</td>
                  <td className="py-2 px-4 ">₹{product.price}</td>
                </tr>
              ))
            }



          </tbody>
        </table>
      </div>
      
      
      <form className='  w-full m-auto p-3 pb-10  border-2 border-slate-700 bg-slate-800 flex flex-col gap-3' onSubmit={handleSubmit}>
      <h3 className='text-white text-xl font-bold text-center py-2  bg-blue-800'>ADD ADDRESS</h3>
      <label htmlFor='add1' className='text-white '>Address 1</label>
        <input type='text' placeholder='address 1' id="add1" name="add1" className='p-2 text-base font-medium  rounded-sm' onChange={handlechange} value={address.add1}/>
        <label htmlFor='add1' className='text-white '>Address 2</label>
        <input type='text' placeholder='address 2' name="add2" className='p-2 text-base font-medium  rounded-sm' onChange={handlechange} value={address.add2}/>
        <label htmlFor='add1' className='text-white '>Landmark</label>
        <input type='text' placeholder='landmark' name="landmark" className='p-2 text-base font-medium  rounded-sm' onChange={handlechange} value={address.landmark}/>
        <label htmlFor='add1' className='text-white '>City</label>
        <input type='text' placeholder='city' name="city" className='p-2 text-base font-medium  rounded-sm' onChange={handlechange} value={address.city}/>
        <label htmlFor='add1' className='text-white '>Contact No</label>
        <input type='text' placeholder='phoneno' name="phoneno" className='p-2 text-base font-medium  rounded-sm' onChange={handlechange} value={address.phoneno}/>
        <label htmlFor='add1' className='text-white '>Pincode</label>
        <input type='text' placeholder='pincode' name="pincode" className='p-2 text-base font-medium  rounded-sm' onChange={handlechange} value={address.pincode}/>
        <button className='bg-blue-600 py-2  text-xl mt-3  font-bold' type='submit'>NEXT <i className="ri-arrow-right-circle-line font-bold"></i></button>

      </form>
    </div>


    </div>
  )
}

export default Checkout