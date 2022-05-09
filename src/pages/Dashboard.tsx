import { Link } from "react-router-dom"
import { PageWrapper } from "../components"
import { useAuthStore } from "../store"

export const Dashboard: React.FC<{}> = () => {

  const { authenticated, user, logout } = useAuthStore()

  return (
    <div>
      <PageWrapper>
        <>
          <h1>Welcome to Bike Rentals Dashboard</h1>

          {
            authenticated ?
              <>
                <p>Hi {user?.firstname} - {user?.role}</p>
                <button onClick={logout} className='btn btn-dark btn-sm'>Logout</button>
              </>
              : <>
                <Link to={'/login'}>Login</Link> <br />
                <Link to={'/register'}>Register</Link>
              </>
          }
        </>
      </PageWrapper>
    </div>
  )
}