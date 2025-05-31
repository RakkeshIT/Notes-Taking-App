'use client'
import React from 'react'
import useAuthUser from '../../hooks/useAuth'
import Link from 'next/link'
import Style from '../Styles/Dashboard.module.css'
import { useRouter } from 'next/navigation'
const Dashboard = () => {
    const { user } = useAuthUser();
    const router = useRouter()
    if(!user?.name){
        router.push('/client/login')
    }
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