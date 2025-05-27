'use client'
import React from 'react'
import useAuthUser from '../../hooks/useAuth'
import Link from 'next/link'
import Style from '../Styles/Dashboard.module.css'
const Dashboard = () => {
    const { user } = useAuthUser();
    return (
        <div className={`${Style.Container}`}>
            <div>
                <h1>Welcome - {user?.name}</h1>
            </div>
           <div>
             <Link href='/dashboard/createnotes' className={`${Style.Button}`}>Create Notes</Link>
           </div>
        </div>
    )
}

export default Dashboard