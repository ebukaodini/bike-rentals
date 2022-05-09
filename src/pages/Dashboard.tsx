import { Link } from "react-router-dom"
import { DashboardWrapper } from "../components"
import { useAuthStore } from "../store"

export const Dashboard: React.FC<{}> = () => {

  return (
    <div>
      <DashboardWrapper>
        <>
          <h1>Dashboard</h1>
        </>
      </DashboardWrapper>
    </div>
  )
}