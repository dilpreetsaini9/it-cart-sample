import React , { useContext, useEffect , useState } from 'react'
import { Data } from '../../../App'
import { fetchprofile } from '../../../hooks/fetchProfile'

import Login from '../Login/Login'
import { Link } from 'react-router-dom'


const Profile = () => {
    
 
    
      
       
       let [ userInfo , setUserInfo ] = useState(undefined)
     
    

    useEffect(() => {
        let hasToken = localStorage.getItem('token');
        if (!hasToken) {
            return
        }
        fetchprofile(hasToken)
            .then(data => setUserInfo(data))
            .catch(err => console.log(err));
    }, []);
    
    function handleLogout(){
        localStorage.removeItem('token')
        setUserInfo(undefined)
    }
   

  return (
    <div className='pt-20'>
        <h3 className='text-white text-xl font-bold text-center py-2 border-b-slate-800 border-b-2 '>MY ACCOUNT</h3>
        
       {userInfo ? ( <div className=' text-white flex flex-col sm:flex-row gap-5 mt-5'>
            
                <div className='border-2 border-slate-700 flex-1  flex flex-col gap-5 p-1'>
                <h3 className='text-white text-xl font-bold text-center py-2 border-b-slate-800 border-b-2 '>DETAILS</h3>
                    <p className='text-lg font-bold text-center'>User : {userInfo.firstName} {userInfo.lastName}</p>
                    
                    <button className='button-nav' onClick={handleLogout}>Logout</button>
                </div>
                <div className='border-2 border-slate-700 flex-1  flex flex-col gap-5 p-1'>
                <h3 className='text-white text-xl font-bold text-center py-2 border-b-slate-800 border-b-2 '>ORDERS</h3>
                
                <p className='my-6 text-center' >EMPTY</p>
              

                    
                </div>
        </div> ) : (
            <div className='flex text-white flex-col gap-5 text-center mt-10'>
                <h1 className='text-2xl font-bold'>Create Account Or Login</h1>
                
                <Link to="/login"> <button className='button-nav min-w-60' >Login</button></Link>
               <Link to="/signup"> <button className='button-nav min-w-60' >Signup</button></Link>
            
            </div>
            
        )}
    </div>
  )
}

export default Profile