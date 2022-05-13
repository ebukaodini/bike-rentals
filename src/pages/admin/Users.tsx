import { Edit2, Pocket, Trash2 } from "react-feather"
import { useHistory } from "react-router-dom"
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

const Users: React.FC<{}> = () => {

  const { users, deleteUser } = useUserStore()
  const { confirm, modal, toast } = useModalStore()
  const { push } = useHistory()

  const handleDeleteUser = (user: User) => {
    confirm(`Delete ${user.firstname} ${user.lastname}?`, 'danger', async () => {
      if (user.role === 'user') {
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
      <CreateUserModal role="user" />, undefined, true
    )
  }
  const handleEditUser = (user: User) => {
    modal(
      <EditUserModal role="user" user={user} />, undefined, true
    )
  }

  return (
    <DashboardWrapper>
      <>
        <div className="w-100 d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark fw-bolder m-0">Users</h2>

          <button aria-label='Add bike' onClick={handleCreateUser} className="btn btn-sm btn-primary">Add User</button>
        </div>

        <div className="w-100 bg-white shadow-sm p-3 overflow-auto">
          <table className="w-100 table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.length > 0 ?
                  users.map((user, index) => (
                    <Row key={index}>
                      <td>{index + 1}</td>
                      <td>{user.firstname} {user.lastname}</td>
                      <td>{user.email}</td>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <Action title='See user reservations' onClick={() => push(`/dashboard/users/${user.id}/reservations`)} className="btn btn-sm">
                            <Pocket size={16} />
                          </Action>
                          <Action title='Edit user' onClick={() => handleEditUser(user)} className="btn btn-sm">
                            <Edit2 size={16} />
                          </Action>
                          <Action title='Delete user' onClick={() => handleDeleteUser(user)} className="btn btn-sm text-danger">
                            <Trash2 size={16} />
                          </Action>
                        </div>
                      </td>
                    </Row>
                  ))
                  :
                  <Row>
                    <td colSpan={4} className='text-center'>No Users.</td>
                  </Row>
              }
            </tbody>
          </table>
        </div>
      </>
    </DashboardWrapper>
  )
}

export default Users