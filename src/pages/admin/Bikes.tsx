import { CheckCircle, Edit2, Pocket, Star, Trash2 } from "react-feather"
import { useHistory } from "react-router-dom"
import styled, { useTheme } from "styled-components"
import { CreateBikeModal, DashboardWrapper } from "../../components"
import { Bike, useBikeStore, useModalStore } from "../../store"

const Row = styled.tr`
  cursor: pointer;
`
const Action = styled.button`
  margin: 0px;
  padding: 0px;
`

const Bikes: React.FC<{}> = () => {

  const { confirm, modal, toast } = useModalStore()
  const { bikes, deleteBike } = useBikeStore()
  const { grey, primary } = useTheme()
  const { push } = useHistory()

  const handleDeleteUser = (bike: Bike) => {
    confirm(`Delete Bike '${bike.model}' ?`, 'danger', async () => {
      deleteBike(bike)
        .then(_ => {
          toast('Bike deleted successfully.')
        })
        .catch(error => {
          toast(error.message, 'danger')
        })

    }, undefined, 'Delete')
  }
  const handleCreateBike = () => {
    modal(
      <CreateBikeModal />, undefined, true
    )
  }
  const handleEditBike = (bike: Bike) => {
    modal(
      <CreateBikeModal isEditing={true} bike={bike} />, undefined, true
    )
  }

  return (
    <DashboardWrapper>
      <>
        <div className="w-100 d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark fw-bolder m-0">Bikes</h2>

          <button aria-label='Add bike' onClick={handleCreateBike} className="btn btn-sm btn-primary">Add Bike</button>
        </div>

        <div className="w-100 bg-white shadow-sm p-3 overflow-auto">
          <table className="w-100 table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Bike</th>
                <th>Model</th>
                <th>Color</th>
                <th>Location</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                bikes.length > 0 ?
                  bikes.map((bike, index) => {
                    const rating = bike.ratingCount > 0 ? Math.round(bike.rating / bike.ratingCount) : 0
                    return (
                      <Row key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center gap-1">
                            {bike.description}
                            {
                              bike.isAvailable &&
                              <CheckCircle className="text-primary" size={14} />
                            }
                          </div>
                        </td>
                        <td>{bike.model}</td>
                        <td>{bike.color}</td>
                        <td>{bike.location}</td>
                        <td>
                          {
                            [0, 1, 2, 3, 4].map((rate, index) => (
                              <Star key={index} size={16} className='mb-1'
                                fill={rating > rate ? primary : grey}
                                color={rating > rate ? primary : grey} />
                            ))
                          }
                          <span className="ms-1">({bike.ratingCount})</span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <Action title='See bike reservations' onClick={() => push(`/dashboard/bikes/${bike.id}/reservations`)} className="btn btn-sm">
                              <Pocket size={16} />
                            </Action>
                            <Action title='Edit bike' onClick={() => handleEditBike(bike)} className="btn btn-sm">
                              <Edit2 size={16} />
                            </Action>
                            <Action title='Delete bike' onClick={() => handleDeleteUser(bike)} className="btn btn-sm text-danger">
                              <Trash2 size={16} />
                            </Action>
                          </div>
                        </td>
                      </Row>
                    )
                  })
                  :
                  <Row>
                    <td colSpan={7} className='text-center'>No Bikes.</td>
                  </Row>
              }
            </tbody>
          </table>
        </div>
      </>
    </DashboardWrapper>
  )
}

export default Bikes