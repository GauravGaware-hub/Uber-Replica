import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [userData, setUserData] = useState('')

    const navigate = useNavigate()

    const { user, setUser } = React.useContext(UserDataContext)


    const SubmitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password
        }

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/users/register`,
            newUser
        )


        if (response.status === 201) {
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/home')
        }

        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/960px-Uber_logo_2018.svg.png" alt="" />
                <form onSubmit={(e) => {
                    SubmitHandler(e)
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's your name</h3>

                    <div className='flex gap-4 mb-6'>
                        <input
                            required
                            value={firstname}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base'
                            type="text"
                            placeholder='First name' />

                        <input
                            required
                            value={lastname}
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base'
                            type="text"
                            placeholder='Last name' />
                    </div>

                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com' />


                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        className='bg-[#eeeeee] mb-6 font-base rounded px-4 py-2 w-full text-lg placeholder:text-base'
                        type="password"
                        placeholder='password' />

                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>Create Account</button>

                </form>
                <p className='text-center'>Already have an Accout ? <Link to='/login' className='text-blue-600'>Login here</Link></p>
            </div>
            <div>
                <p className='text-[10px] leading-tight'>
                    This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.
                </p>
            </div>
        </div>
    )
}

export default UserSignup