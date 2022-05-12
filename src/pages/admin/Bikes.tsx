import { CheckCircle, Edit2, Trash2 } from "react-feather"
import styled from "styled-components"
import { CreateBikeModal, DashboardWrapper } from "../../components"
import { Bike, useBikeStore, useModalStore } from "../../store"

const Row = styled.tr`
  cursor: pointer;
`
const Action = styled.button`
  margin: 0px;
  padding: 0px;
`

export const Bikes: React.FC<{}> = () => {

  const { confirm, modal, toast } = useModalStore()
  const { bikes, deleteBike } = useBikeStore()

  const handleDeleteUser = (bike: Bike) => {
    confirm(`Delete Bike '${bike.model}' ?`, 'danger', async () => {
      deleteBike(bike)
        .then(_ => {
          toast('Bike deleted successfully.')
        })

    }, undefined, 'Delete')
  }
  const handleCreateBike = () => {
    modal(
      <CreateBikeModal />
    )
  }
  const handleEditBike = (bike: Bike) => {
    modal(
      <CreateBikeModal isEditing={true} bike={bike} />
    )
  }

  return (
    <DashboardWrapper>
      <>
        <div className="w-100 d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark fw-bolder m-0">Bikes</h2>

          <button onClick={handleCreateBike} className="btn btn-sm btn-primary">Add Bike</button>
        </div>

        <div className="w-100 bg-white shadow-sm p-3">
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
                  bikes.map((bike, index) => (
                    <Row key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          {bike.description}
                          {
                            bike.isAvailable &&
                            <CheckCircle className="text-primary" size={12} />
                          }
                        </div>
                      </td>
                      <td>{bike.model}</td>
                      <td>{bike.color}</td>
                      <td>{bike.location}</td>
                      <td>{bike.ratingCount > 0 ? Math.round(bike.rating / bike.ratingCount) : 0}</td>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <Action onClick={() => handleEditBike(bike)} className="btn btn-sm">
                            <Edit2 size={16} />
                          </Action>
                          <Action onClick={() => handleDeleteUser(bike)} className="btn btn-sm text-danger">
                            <Trash2 size={16} />
                          </Action>
                        </div>
                      </td>
                    </Row>
                  ))
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