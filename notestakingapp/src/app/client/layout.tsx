'use client'
import Navbar from '../components/Navbar'

const layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Navbar children={children} />
    </>
  )
}

export default layout