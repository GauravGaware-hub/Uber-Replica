import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [userData, setUserData] = useState({})
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const navigate = useNavigate()

    const { captain, setCaptain } = React.useContext(CaptainDataContext);

    const SubmitHandler = async (e) => {
        e.preventDefault();
        const captainData = {
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        }

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/captains/register`,
            captainData
        )

        if(response.status === 201) {
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
        }

        

        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
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

                <h3 className='text-lg w-full font-medium mb-2'>Vehicle Details</h3>

                <div className='flex gap-4 mb-6'>
                    <input 
                    required
                    value= {vehicleColor}
                    onChange={(e) => {
                        setVehicleColor(e.target.value)
                    }}
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' 
                    type="text" 
                    placeholder='Vehicle Color' />

                    <input 
                    required
                    value= {vehiclePlate}
                    onChange={(e) => {
                        setVehiclePlate(e.target.value)
                    }}
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' 
                    type="text" 
                    placeholder='Vehicle Plate' />

                </div>
                <div className='flex gap-4 mb-6'>
                    <input 
                    required
                    value= {vehicleCapacity}
                    onChange={(e) => {
                        setVehicleCapacity(e.target.value)
                    }}
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' 
                    type="number" 
                    placeholder='Vehicle Capacity' />

                    <select 
                    required
                    value= {vehicleType}
                    onChange={(e) => {
                        setVehicleType(e.target.value)
                    }}
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' >
                    
                    <option value="" disabled>Select Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="auto">Auto</option>
                    <option value="moto">Moto</option>
                    </select>

                </div>

                
                <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>Create Captain Account</button>

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