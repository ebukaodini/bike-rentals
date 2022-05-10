import { Link } from "react-router-dom"
import { DashboardWrapper } from "../../components"
import { useBikeStore, useReservationStore, useUserStore } from "../../store"

export const Dashboard: React.FC<{}> = () => {

  const { users, managers } = useUserStore()
  const { bikes } = useBikeStore()
  const { reservations } = useReservationStore()

  const stats = [
    {
      title: 'Users',
      route: '/dashboard/users',
      stats:
        <>
          Total users: {users?.length}
        </>
    },
    {
      title: 'Managers',
      route: '/dashboard/managers',
      stats:
        <>
          Total Managers: {managers?.length}
        </>
    },
    {
      title: 'Bikes',
      route: '/dashboard/bikes',
      stats:
        <>
          Total Bikes: {bikes.length} <br />
          Available Bikes: {bikes.filter(b => b.isAvailable).length}
        </>
    },
    {
      title: 'Reservations',
      route: '/dashboard/reservations',
      stats:
        <>
          Total Reservations: {reservations.length} <br />
          Active Reservations: {reservations.filter(r => r.isActive).length}
        </>
    }
  ]

  return (
    <div>
      <DashboardWrapper>
        <>
          <h2 className="text-dark fw-bolder mb-5">Dashboard</h2>

          <div className="w-100 d-flex flex-wrap gap-lg-3 gap-2">
            {
              stats.map((stat, index) => (
                <div key={index} className="col-lg-5 col-md-5 col-10 shadow-sm bg-white rounded h-100 p-3">
                  <Link to={stat.route} className="text-decoration-none text-dark h-100">
                    <h4 className="m-0 pb-2">{stat.title}</h4>
                    <p className="m-0 pb-2">{stat.stats}</p>
                  </Link>
                </div>
              ))
            }
          </div>
        </>
      </DashboardWrapper>
    </div>
  )
}