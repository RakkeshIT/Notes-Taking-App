import React from 'react'
import Styles from './Styles/Navbar.module.css'
import Link from 'next/link'
const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <nav className={`${Styles.N_Container}`}>
            <div className={`${Styles.Title}`}>
                Notes Taking
            </div>

            <ul className={`${Styles.Menus}`}>
                <li><Link href='/'>Home</Link></li>
                <li><Link href=''>About</Link></li>
                <li><Link href='/client/login'>Login</Link></li>
                <li><Link href='/client/register'>Register</Link></li>
            </ul>
        </nav>

        <main>
            {children}
        </main>
    </>
  )
}

export default Navbar