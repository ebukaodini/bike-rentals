import { useEffect, useState } from "react"
import { ArrowLeft, Pocket } from "react-feather"
import { useHistory, useParams } from "react-router-dom"
import styled from "styled-components"
import { DashboardWrapper } from "../../components"
import { Reservation, useBikeStore, useReservationStore } from "../../store"

const Row = styled.tr`
  cursor: pointer;
`
const Action = styled.button`
  margin: 0px;
  padding: 0px;
`

export const AdminUserReservations: React.FC<{}> = () => {

  const { reservations } = useReservationStore()
  const [userReservations, setUserReservations] = useState<Reservation[]>([])
  const { bikes } = useBikeStore()
  const { push, goBack } = useHistory()
  const param = useParams<{ id: string }>()

  useEffect(() => {
    setUserReservations(
      reservations.filter(r => r.user === param?.id)
    )
  }, [param?.id, reservations])

  return (
    <DashboardWrapper>
      <>
        <div className="w-100 d-flex justify-content-start align-items-center mb-4 gap-2">
          <button onClick={goBack} className="btn btn-sm m-0 p-0">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-dark fw-bolder m-0">User Reservations</h2>
        </div>

        <div className="w-100 bg-white shadow-sm p-3 overflow-auto">
          <table className="w-100 table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Bike</th>
                <th>Period</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                userReservations.length > 0 ?
                  userReservations.map((reservation, index) => {

                    const bike = bikes.find(b => b.id === reservation.bike)!

                    return (
                      <Row key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            {bike.description}
                            <Action
                              onClick={() => push(`/dashboard/bikes/${bike.id}/reservations`)}
                              title='See bike reservations' className="btn">
                              <Pocket size={14} className='text-primary mb-1' />
                            </Action>
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
                    <td colSpan={4} className='text-center'>No Reservations.</td>
                  </Row>
              }
            </tbody>
          </table>
        </div>
      </>
    </DashboardWrapper>
  )
}