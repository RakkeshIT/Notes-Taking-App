'use client'
import React, { ChangeEvent, useState } from 'react'
import Styles from '../../Styles/Notes.module.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const CreateNotes = () => {
    const [formData, setFormData] = useState({
        title:'',
        description:''
    })

    // Push Page
    const router = useRouter()

    // HandleChange
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

        const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/notes', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.status === 200) {
                router.push('/dashboard/viewnotes')
            }
        } catch (error) {
            console.log("Something Error", error);
        }
    }
    return (
        <>
            <div className={`${Styles.Container}`}>
                <form onSubmit={handleSubmit}>
                    <div className={`${Styles.Title}`}>
                        💥 Create Your Notes
                    </div>

                    <div className={`${Styles.FormGroup}`}>
                        <label htmlFor="">Notes Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className={`${Styles.FormGroup}`}>
                        <label htmlFor="">Notes Title</label>
                        <textarea name="description" value={formData.description} rows='4' cols='50' onChange={handleChange}></textarea>
                    </div>

                    <div className={`${Styles.Button}`}>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateNotes