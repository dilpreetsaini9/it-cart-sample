import React, { useContext, useEffect, useState } from 'react'
import { Data } from '../../../App'
import { useNavigate } from 'react-router-dom'
import { createGateway } from '../../../hooks/Payment'
import { fetchprofile } from '../../../hooks/fetchProfile'


const Review = () => {
    let reviewUrl = process.env.REACT_APP_VERIFY

    let [name, setName] = useState(undefined)


    let { cartProducts, address } = useContext(Data)
    let navigation = useNavigate()

    useEffect(() => {

        if (cartProducts.length <= 0) {
            navigation("/mycart")
        } else {
            if (!address.add1 && !address.add2 && !address.city && !address.landmark && !address.phoneno && !address.pincode) {
                navigation("/checkout")
            }
        }
    })

    useEffect(() => {

        let token = localStorage.getItem('token')

        if (token) {
            fetch(reviewUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                method: 'POST'
            }).then((d) => {
                d.json()
                    .then((data) => {

                        setName(data.firstName)

                    }).catch(() => console.log("error in verify"))
            })
        } else {
            localStorage.removeItem('token')

            navigation('/login')
        }
    })
    async function handlePayment() {

        let hasToken = localStorage.getItem('token')

        if (hasToken) {
            let verifyJWT = await fetchprofile(hasToken)
         
            
                if ( !verifyJWT ) {
                    localStorage.removeItem('token')
                    navigation("/login")
                    return
                }
            if (verifyJWT.firstName === name) {
                createGateway()
            }
        }
        else {
            localStorage.removeItem('token')
            navigation("/login")
        }
    }



    const total = cartProducts.reduce((total, product) => total + product.price, 0);

    return (
        <div className='pt-20'>
            <h3 className='text-white text-xl font-bold text-center py-2  bg-blue-800'>REVIEW ITEMS</h3>

            <div className='p-2  w-full flex flex-col md:flex-row gap-3'>
                <div className='p-1  w-full bg-slate-100'>
                    <h3 className='text-white text-base font-bold text-center py-2  bg-blue-800'>BILLING</h3>
                    <div className='p-1 '>

                        <p className='font-bold font-mono'>NAME : {name ? name : "---"}</p>
                        <p className='font-bold font-mono'>ADDRESS : {address.add1} {address.add2}</p>
                        <p className='font-bold font-mono'>LANDMARK : {address.landmark}</p>
                        <p className='font-bold font-mono'>CITY : {address.city} - {address.pincode}</p>
                        <p className='font-bold font-mono'>CONTACT NO : {address.phoneno}</p>

                    </div>
                </div>
                <div className='p-1 bg-slate-100 w-full'>
                    <h3 className='text-white text-base font-bold text-center py-2  bg-blue-800'>ORDERS</h3>
                    <div className='p-1 '>
                        {cartProducts.map((p, index) => (
                            <div className='flex justify-between' key={p.name}>
                                <p className='font-mono font-bold'>{index + 1} - {p.name}    </p>
                                <p>{p.price}/-</p>
                            </div>
                        ))}

                    </div>
                    <div>

                    </div>
                    <div className='flex justify-between'>
                        <h3 className=' text-base font-bold  p-2   text-slate-800 text-right'>GRAND TOTAL  -</h3>
                        <h3 className=' text-base font-bold  p-2  text-slate-900 text-right'> {total} /- INR </h3>

                    </div>
                </div>

            </div>
            <button className='bg-green-400 hover:bg-green-600 active:bg-green-900 active:text-white w-full text-lg font-bold py-2' onClick={handlePayment}>PAY NOW</button>
        </div>
    )
}

export default Review