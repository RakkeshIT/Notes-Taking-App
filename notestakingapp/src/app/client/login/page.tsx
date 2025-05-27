'use client'
import React, { ChangeEvent, useState } from 'react'
import Style from '../../Styles/Login.module.css'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const page = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    const router = useRouter()
    // HandleChange
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.status === 200) {
                 router.push('/dashboard')
            }
        } catch (error) {
            console.log("Something Error", error);
        }
    }
    return (
       <div className={`${Style.Container}`}>
         <div className={`${Style.login_container}`}>
            <h1>🤵 Login Your Account</h1>
            <form className={`${Style.login_form}`} onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" name='email' value={formData.email} required onChange={handleChange} />
                <input type="password" placeholder="Password" name='password' value={formData.password} required onChange={handleChange} />
                <button type="submit">Login</button>
                <p className={`${Style.signup_link}`}>Don&apos;t have an account? <Link href="/client/register">Sign up</Link></p>
            </form>
        </div>
       </div>

    )
}

export default page