'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
const useAuthUser = () => {
    const [user, setUser] = useState<{name:string, email:string, role:string}| null>(null);
    useEffect(() => {
      const getUser = async () => {
        try {
            const res = await axios.get('/api/checkauth',{withCredentials:true});
            setUser(res.data.user)
        } catch (error) {
            console.log("User Not Get");
            setUser(null)
        }
      }
      getUser()
    }, [])
    
  return {user};
}

export default useAuthUser