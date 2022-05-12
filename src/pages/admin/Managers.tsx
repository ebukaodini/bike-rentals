import { Edit2, Trash2 } from "react-feather"
import styled from "styled-components"
import { CreateUserModal, DashboardWrapper, EditUserModal } from "../../components"
import { useModalStore, User, useUserStore } from "../../store"

const Row = styled.tr`
  cursor: pointer;
`
const Action = styled.button`
  margin: 0px;
  padding: 0px;
`

export const Managers: React.FC<{}> = () => {

  const { managers, deleteUser } = useUserStore()
  const { confirm, modal, toast } = useModalStore()

  const handleDeleteUser = (user: User) => {
    confirm(`Delete ${user.firstname} ${user.lastname}?`, 'danger', async () => {
      if (user.role === 'super-admin')
        toast('Super Admin cannot deleted.', 'danger')
      else {
        deleteUser(user.id)
          .then(_ => {
            toast('Account deleted successfully.')
          })
          .catch(error => {
            toast(error.message, 'danger')
          })
      }
    }, undefined, 'Delete')
  }
  const handleCreateUser = () => {
    modal(
      <CreateUserModal role="manager" />, undefined, true
    )
  }
  const handleEditUser = (user: User) => {
    modal(
      <EditUserModal role="manager" user={user} />, undefined, true
    )
  }

  return (
    <DashboardWrapper>
      <>
        <div className="w-100 d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark fw-bolder m-0">Managers</h2>

          <button onClick={handleCreateUser} className="btn btn-sm btn-primary">Add Manager</button>
        </div>

        <div className="w-100 bg-white shadow-sm p-3 overflow-auto">
          <table className="w-100 table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Manager</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                managers.length > 0 ?
                  managers.map((user, index) => (
                    <Row key={index}>
                      <td>{index + 1}</td>
                      <td>{user.firstname} {user.lastname}</td>
                      <td>{user.email}</td>
                      <td><span className="badge bg-dark">{user.role}</span></td>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <Action title='Edit manager' onClick={() => handleEditUser(user)} className="btn btn-sm">
                            <Edit2 size={16} />
                          </Action>
                          <Action title='Delete manager' onClick={() => handleDeleteUser(user)} className="btn btn-sm text-danger">
                            <Trash2 size={16} />
                          </Action>
                        </div>
                      </td>
                    </Row>
                  ))
                  :
                  <Row>
                    <td colSpan={5} className='text-center'>No Managers.</td>
                  </Row>
              }
            </tbody>
          </table>
        </div>
      </>
    </DashboardWrapper>
  )
}