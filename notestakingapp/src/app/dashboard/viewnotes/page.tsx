'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Style from '../../Styles/View.module.css'
import Link from 'next/link'
interface NotesProps {
    _id: string,
    title: string,
    description: string,
    createdAt: Date,
}
const ViewNotes = () => {
    const [getData, setGetData] = useState<NotesProps[]>([])
    const [editId, setEditId] = useState<string | null>(null)
    const [editData, setEditData] = useState({ title: '', description: '' })
    // Fetch the Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/notes')
                setGetData(res.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [])

    // Delete the Notes
    const deletEvent = async (id: string) => {
        try {
            const res = await axios.delete('/api/notes', { params: { id } })

            if (res.status === 200) {
                alert('Item was Deleted')
                setGetData(getData.filter((val) => val._id !== id))
            }
        } catch (error) {
            alert("Item was not deletd")
            console.log(error);

        }
    }
    // Edit Id
    const HandleId = (notes: NotesProps) => {
        setEditId(notes._id);
        setEditData({ title: notes.title, description: notes.description })
    }
    // Camcel Editing
    const CancelEdit = () => {
        setEditId(null);
        setEditData({ title: '', description: '' })
    }
    // HandleChange
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditData({ ...editData, [e.target.name]: e.target.value })
    }

    // Update Notes
    const updateText = async (id: string) => {
        try {
            const response = await axios.put('/api/notes', { id, ...editData });
            if (response.status === 200) {
                setGetData(getData.map((item) => (item._id === id ? { ...item, ...editData } : item)));
                alert("Updated Success")
                setEditId(null)
            } else {
                alert("Something wrong")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={`${Style.Container}`}>
            <h1 style={{ marginBottom: '30px' }}>View Data</h1>
            <Link href='/dashboard/createnotes' className={`${Style.CreateNotes}`}>Create Notes</Link>
            <table className={`${Style.Table}`}>
                <thead>
                    <tr className={`${Style.TR}`}>
                        <th className={`${Style.TH}`}>Id</th>
                        <th className={`${Style.TH}`}>Title</th>
                        <th className={`${Style.TH}`}>Descroption</th>
                        <th className={`${Style.TH}`}>Created Tile</th>
                        <th className={`${Style.TH}`}>Update</th>
                        <th className={`${Style.TH}`}>Delete</th>
                    </tr>
                </thead>

                {getData.map((items, index) => (
                    <tbody key={items._id}>
                        <tr>
                            <td className={`${Style.TD}`}>{index + 1}</td>
                            <td className={`${Style.TD}`}>
                                {editId === items._id ? (
                                    <input type="text" name='title' value={editData.title} onChange={handleChange}/>
                                ) : (items.title)}
                            </td>
                            <td className={`${Style.TD}`}>
                                {editId === items._id ? (
                                    <input type="text" name='description' value={editData.description} onChange={handleChange}/>
                                ) : (items.description)}
                            </td>
                            <td className={`${Style.TD}`}>{items.createdAt}</td>
                            <td className={`${Style.TD}`}>
                                {editId === items._id ? (
                                    <>
                                        <button className={`${Style.Button}`} onClick={() => updateText(items._id,)}>Save</button>
                                        <button className={`${Style.Button}`} onClick={CancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    <button className={`${Style.Button}`} onClick={() => HandleId(items)}>Update</button>
                                )}
                            </td>
                            <td className={`${Style.TD}`}>
                                <button className={`${Style.Button2}`} onClick={() => deletEvent(items._id)}>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>

        </div>
    )
}

export default ViewNotes