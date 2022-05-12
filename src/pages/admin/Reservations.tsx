import { Link } from "react-feather"
import styled from "styled-components"
import { DashboardWrapper } from "../../components"
import { useBikeStore, useReservationStore, useUserStore } from "../../store"

const Row = styled.tr`
  cursor: pointer;
`
const Action = styled.button`
  margin: 0px;
  padding: 0px;
`

export const Reservations: React.FC<{}> = () => {

  const { users } = useUserStore()
  const { reservations } = useReservationStore()
  const { bikes } = useBikeStore()

  return (
    <DashboardWrapper>
      <>
        <div className="w-100 d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark fw-bolder m-0">Reservations</h2>
        </div>

        <div className="w-100 bg-white shadow-sm p-3">
          <table className="w-100 table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Bike</th>
                <th>Period</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                reservations.length > 0 ?
                  reservations.map((reservation, index) => {

                    const user = users.find(u => u.id === reservation.user)!
                    const bike = bikes.find(b => b.id === reservation.bike)!

                    return (
                      <Row key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            {user.firstname} {user.lastname}
                            <Action className="btn"><Link size={14} className='text-primary mb-1' /></Action>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            {bike.model}
                            <Action className="btn"><Link size={14} className='text-primary mb-1' /></Action>
                          </div>
                        </td>
                        <td>
                          <small>
                            <b>{(new Date(reservation.reservedFrom)).toLocaleDateString()}</b>
                            &nbsp;to&nbsp;
                            <b>{(new Date(reservation.reservedTo)).toLocaleDateString()}</b>
                          </small>
                        </td>
                        <td>
                          <span className={`badge bg-${reservation.isActive ? 'success' : 'danger'}`}>
                            {reservation.isActive ? 'active' : 'cancelled'}
                          </span>
                        </td>
                      </Row>
                    )
                  })
                  :
                  <Row>
                    <td colSpan={5} className='text-center'>No Reservations.</td>
                  </Row>
              }
            </tbody>
          </table>
        </div>
      </>
    </DashboardWrapper>
  )
}