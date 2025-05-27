'use client'
import React, { useState } from 'react'
import Style from '../../Styles/Register.module.css'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const page = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', formData)
            router.push('/client/login');
            console.log("Login Success", response.data);

        } catch (error) {

            console.log("Not Logine", error.response?.data || error);


        }
    }
    return (
        <div className={`${Style.Container}`}>
            <div className={`${Style.login_container}`}>
                <h1>✨ Create Account</h1>
                <form className={`${Style.login_form}`} onSubmit={handleSubmit}>
                    <input type="text" placeholder="User Name" name='name' value={formData.name} required onChange={handleChange} />
                    <input type="email" placeholder="Email" name='email' value={formData.email} required onChange={handleChange} />
                    <input type="password" placeholder="Password" name='password' value={formData.password} required onChange={handleChange} />
                    <button type="submit">Login</button>
                    <p className={`${Style.signup_link}`}>You have an account? <Link href="/client/login">Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default page