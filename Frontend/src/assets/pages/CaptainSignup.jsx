import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
    const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [firstname, setFirstName] = useState('')
        const [lastname, setLastName] = useState('')
        const [userDate, setUserData] = useState('')
    
        const SubmitHandler = (e) => {
            e.preventDefault();
            setUserData({
                fullName: {
                    firstName: firstname,
                    lastName: lastname
                },
                email: email,
                password: password
            })
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
        }

    return (
        <div  className='px-5 py-5 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20 mb-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="" />
            <form onSubmit={(e) => {
                SubmitHandler(e)
            }}>
                <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>

                <div className='flex gap-4 mb-6'>
                    <input 
                    required
                    value= {firstname}
                    onChange={(e) => {
                        setFirstName(e.target.value)
                    }}
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' 
                    type="text" 
                    placeholder='First name' />

                    <input 
                    required
                    value= {lastname}
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }}
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' 
                    type="text" 
                    placeholder='Last name' />
                </div>

                <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's email</h3>
                <input 
                required
                value= {email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base' 
                type="email" 
                placeholder='email@example.com' />
                

                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                <input 
                required
                value= {password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                className='bg-[#eeeeee] mb-6 font-base rounded px-4 py-2 w-full text-lg placeholder:text-base' 
                type="password" 
                placeholder='password' />

                <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>Login</button>

            </form>
                <p className='text-center'>Already have an Accout ? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
            </div>
            <div>
                <p className='text-[10px] leading-tight'>
                    This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.
                </p>
            </div>
        </div>
    )
}

export default CaptainSignup