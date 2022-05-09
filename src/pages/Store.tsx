import { Link } from "react-router-dom"
import { PageWrapper } from "../components"
import { useAuthStore } from "../store"

export const Store: React.FC<{}> = () => {

  const { authenticated, user } = useAuthStore()

  return (
    <div>
      <PageWrapper>
        <>
          <h1>Welcome to Bike Rentals</h1>

          {
            authenticated ?
              <p>Hi {user?.firstname}</p>
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