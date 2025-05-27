'use client'
import React from 'react'
import Styles from './Styles/Navbar.module.css'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const UserDashboard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            await axios.post('/api/logout')
            router.push('/client')
        } catch (error) {

        }
    }
    return (
        <>
            <nav className={`${Styles.N_Container}`}>
                <div className={`${Styles.Title}`}>
                    Notes Taking
                </div>

                <ul className={`${Styles.Menus}`}>
                    <li><Link href=''>Home</Link></li>
                    <li><Link href=''>About</Link></li>
                    <li><Link href='' onClick={handleLogout}>Logout</Link></li>
                </ul>
            </nav>

            <div>
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}

export default UserDashboard