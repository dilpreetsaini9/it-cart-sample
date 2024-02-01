import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { signup } from '../../../hooks/signup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {



    const notify = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    let navigation = useNavigate()

    useEffect(()=>{
        let token = localStorage.getItem('token')
            if ( token ){
                navigation("/")
            }
    })

    const navigate = useNavigate();

    let [user, setUser] = useState({
        name: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    function handlechange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        

        if (user.username.length < 8) {
            notifyError("username must be at least 8 characters long");
        } else {
            if (user.password.length < 8 || user.confirmPassword.length < 8) {
                notifyError("password must be at least 8 characters long");
            } else {
                if (user.password === user.confirmPassword) {

                    signup(user)
                        .then((data) => {
                            if (data === "DONE") {
                                notify("Account Created")
                                navigate("/")
                            } else if ( data === "ERROR") {
                                notifyError("Something went wrong")
                            }
                        })
                        .catch((err) => {
                            notifyError("Something went wrong")
                        })


                } else {
                    notifyError("please make sure your passwords match");
                }
            }
        }
    }


    return (
        <div className='pt-20 '>
            <h3 className='text-white text-xl font-bold text-center py-2  bg-blue-800'>CREATE NEW ACCOUNT</h3>
            <form className='mt-10   min-w-80 max-w-96 m-auto p-3 pb-40 flex flex-col gap-3  border-2 border-slate-800 rounded-sm' onSubmit={handleSubmit}>
            
            
            < div className='flex justify-between items-center cursor-pointer'>
                  <label htmlFor='name' className='font-bold text-base text-white'>FIRST NAME</label>
                <input type='text' placeholder='First Name' name="name" className='p-2 text-base font-medium rounded-sm border-b-slate-800 bg-transparent  text-white border-b-2  focus:border-b-blue-500 ' onChange={handlechange} />
                 
              </div>
              < div className='flex justify-between items-center cursor-pointer'>
                  <label htmlFor='lastName' className='font-bold text-base text-white'>LAST NAME</label>
                <input type='text' placeholder='Last Name' name="lastName" className='p-2 text-base font-medium border-b-slate-800 rounded-sm bg-transparent  text-white border-b-2  focus:border-b-blue-500 ' onChange={handlechange} />
                  
              </div>
              < div className='flex justify-between items-center cursor-pointer'>
                  <label htmlFor='username' className='font-bold text-base text-white'>USERNAME</label>
                <input type='text' placeholder='Username' name="username" className='p-2 text-base font-medium border-b-slate-800 rounded-sm bg-transparent  text-white border-b-2  focus:border-b-blue-500 ' onChange={handlechange} />
                 
              </div>
              < div className='flex justify-between items-center cursor-pointer'>
                  <label htmlFor='PASSWORD' className='font-bold text-base text-white'>PASSWORD</label>
                <input type='password' placeholder='Create Strong Password' name="password" className='p-2 border-b-slate-800 text-base font-medium rounded-sm bg-transparent  text-white border-b-2  focus:border-b-blue-500 ' onChange={handlechange} />
                
              </div>
              < div className='flex justify-between items-center cursor-pointer'>
                  <label htmlFor='confirmPassword' className='font-bold text-base text-white'>CONFIRM PASSWORD</label>
                <input type='password' placeholder='Confirm Password ' name="confirmPassword" className='p-2 text-base border-b-slate-800 font-medium rounded-sm bg-transparent  text-white border-b-2  focus:border-b-blue-500 ' onChange={handlechange} />
                  
              </div>
                <button className='button-nav font-bold tracking-wide' type='submit'>Signup</button>
            </form>
        </div>
    );
};

export default Signup;
