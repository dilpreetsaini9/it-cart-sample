import React , { useState , useContext, useEffect} from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../../hooks/login';
import { Data } from '../../../App';





const Login = () => {
    let { setUserMain , cartProducts } = useContext(Data)
    
    let navigation = useNavigate()

    useEffect(()=>{
        let token = localStorage.getItem('token')
            if ( token ){
                navigation("/")
            }
    })

    let [user, setUser] = useState({
        username: "",
        password: "",
    });
    
    const notify = (body) => toast.success(body);
    const notifyError = (body) => toast.error(body);
        
    function handlechange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault()
        
            if ( user.username && user.password ) {
                login(user).then((data)=> {
                    
                            
                            
                            localStorage.setItem('token', data.token);
                            
                            setUserMain(data.firstName)
                                
                                if ( cartProducts.length <= 0 ) {
                                    navigation("/")
                                } else {
                                    navigation("/mycart")
                                }
                    
                    
                }).catch(()=> {
                    notifyError("invalid username or password")
                })
            } else {
                notifyError("invalid username or password")
            }
            
    }


  return (
    <div className='pt-20 '>
        
        <h3 className='text-white text-xl font-bold text-center py-2  bg-blue-800'>Welcome , Login to your account</h3>
        <form className='mt-10 border-2 border-slate-800  min-w-56 max-w-96 m-auto p-3 pb-40 flex flex-col gap-3  rounded-sm' onSubmit={handleSubmit}>
              <div className='flex justify-between items-center cursor-pointer'>
                  <label htmlFor='username' className='font-bold text-base text-white'>USERNAME</label>
                  <input type='text' placeholder='username' name="username" id="username" autoComplete='off' className='p-2 text-base font-medium rounded-sm bg-transparent  text-white border-b-2  focus:border-b-blue-500 ' onChange={handlechange} />

              </div>

            <div className='flex justify-between items-center cursor-pointer'>
            <label htmlFor='password' className='font-bold text-base text-white'>PASSWORD</label>  
            <input type='password' placeholder='password' name="password" id="password" autoComplete='off' className='p-2 text-base font-medium rounded-sm bg-transparent  text-white border-b-2  focus:border-b-blue-500 ' onChange={handlechange}/>
            </div>
            <button className='button-nav font-bold tracking-wide' type='submit'>LOGIN</button>
             <Link to="/signup">
            <p className=' text-sm text-white hover:text-blue-500 active:text-blue-800 font-normal text-center '>CREATE NEW ACCOUNT</p>
             </Link>
        </form>
    </div>
  )
}

export default Login