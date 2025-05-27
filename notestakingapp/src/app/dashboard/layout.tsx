'use client'
import UserDashboard from '../components/UserDashboard'

const layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <UserDashboard children={children} />
    </>
  )
}

export default layout