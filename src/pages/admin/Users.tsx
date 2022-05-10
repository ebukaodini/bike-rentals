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

export const Users: React.FC<{}> = () => {

  const { users, deleteUser, getUsers } = useUserStore()
  const { confirm, modal, toast } = useModalStore()

  const handleDeleteUser = (user: User) => {
    confirm(`Delete ${user.firstname} ${user.lastname}?`, 'danger', async () => {
      if (user.role === 'user') {
        deleteUser(user.id)
          .then(async _ => {
            await getUsers()
            toast('Account deleted successfully.')
          })
      }
    }, undefined, 'Delete')
  }
  const handleCreateUser = () => {
    modal(
      <CreateUserModal role="user" />
    )
  }
  const handleEditUser = (user: User) => {
    modal(
      <EditUserModal role="user" user={user} />
    )
  }

  return (
    <DashboardWrapper>
      <>
        <div className="w-100 d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark fw-bolder m-0">Users</h2>

          <button onClick={handleCreateUser} className="btn btn-sm btn-primary">Add User</button>
        </div>

        <div className="w-100 bg-white shadow-sm p-3">
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
                users.map((user, index) => (
                  <Row key={index}>
                    <td>{index + 1}</td>
                    <td>{user.firstname} {user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <Action onClick={() => handleEditUser(user)} className="btn btn-sm">
                          <Edit2 size={16} />
                        </Action>
                        <Action onClick={() => handleDeleteUser(user)} className="btn btn-sm text-danger">
                          <Trash2 size={16} />
                        </Action>
                      </div>
                    </td>
                  </Row>
                ))
              }
            </tbody>
          </table>
        </div>
      </>
    </DashboardWrapper>
  )
}